import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify} from 'hono/jwt'
import { createBlogInput,updateBlogInput } from '@miravanisri/medium-common'
export const BlogRouter = new Hono<
{
  Bindings:
  {
    DATABASE_URL:string;
    JWT_PASSWORD:string;


  },
  Variables:
  {
    UserId:string;

  }



}

>()

const months=['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
BlogRouter.use('/*',async(c,next)=>{
  const headers=c.req.header("authorization")|| " ";
  console.log(headers)

const cont=headers.split(" ")[1]
console.log(cont)
try{
const user= await verify(cont,c.env.JWT_PASSWORD)

  if(user)
  {
//@ts-ignore
  c.set("UserId",user.id)


   await next()


  }
  else
  {
    c.status(403)
    c.json({message:"you are not logged in"})



  }

}
catch(err)
{
  return c.json({message:"you are not logged in"})
  

}






})
BlogRouter.post('/',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
let objectDate = new Date();


let day = objectDate.getDate();
// 23

let month = objectDate.getMonth();
 // 8

let year = objectDate.getFullYear();
// 2022

const body= await c.req.json()
const success=createBlogInput.safeParse(body)
if(success.success==false)
{
  c.status(403)
  return c.json({message:"invalid input"})
  

}
const publishDate=months[month+1]+" "+day+","+year
console.log(publishDate)

const authorId=c.get("UserId")
const blog=await prisma.post.create({
  data:{
title:body.title,
content:body.content,
publishDate:publishDate,
authorId:authorId



  }
   
})
return c.json({id:blog.id})


  })
  
BlogRouter.put('/',async(c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

const body= await c.req.json()
const success=updateBlogInput.safeParse(body)
if(success.success==false)
{
  c.status(403)
  return c.json({message:"invalid input"})

}
const blog=await prisma.post.update({

  where:{
    id:body.id
  },
  data:{
title:body.title,
content:body.content

}

   
})
return c.json({blog})



 })
 BlogRouter.get('/bulk',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())


const blogs=await prisma.post.findMany({
  select:{
    content:true,
    title:true,
    id:true,
    publishDate:true,
    author:{
      select:{
        name:true
      }
    }
  }
})
console.log(blogs)

return c.json({blogs})

  })


  
  BlogRouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body= c.req.param("id")
  try
  {
  const blog=await prisma.post.findFirst({
    where:{
  id:body
    },
    select:{
      id:true,
      title:true,
      content:true,
      publishDate:true,
      author:{
        select:{
          name:true
        }
      }
    }
     
  })
  return c.json({
    blog
  })
}
catch(e)
{
  c.status(403)
  return c.json({message:"error while fetching blog"})

}

})

    
  
