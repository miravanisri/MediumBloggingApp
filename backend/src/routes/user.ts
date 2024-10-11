import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign} from 'hono/jwt'
import { signupInput,signinInput} from '@miravanisri/medium-common'
export const UserRouter = new Hono<
{
  Bindings:
  {
    DATABASE_URL:string,
    JWT_PASSWORD:string,


  }


}

>()



UserRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
   const body= await c.req.json()
   const success=signupInput.safeParse(body)

   

   if(success.success==false)
   {
    c.status(411)

    return c.json({message:"invalid inputs"})

   }
   

  try{
    const existingUser = await prisma.user.findUnique({
      where: {
          username: body.username,
      },
  });

  if (existingUser) {
      c.status(409); // Conflict
      return c.json({ message: "User already exists" });
  }
  
   const user=await prisma.user.create(
  {
    data:{
      username:body.username,
  
      password:body.password,
      name:body.name
  
  
    },
  
  
  }
  
   )
   console.log(c.env.JWT_PASSWORD)
   const token = await sign({id:user.id,name:user.name},c.env.JWT_PASSWORD)
   return c.json({
    token:token
   })
  }
  catch(err)
  {
    return c.json({message:"error while creating user"})


  
  
  }
   
})

  
UserRouter.post('/signin',async(c)=>{
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body= await c.req.json()
  const success=signinInput.safeParse(body);
  if(success.success==false)
  {
    c.status(403)
    return c.json({message:"invalid inputs"})

  }

  
  try{
  const user=await prisma.user.findUnique(
    {
      where:{
        username:body.username,
        password:body.password
  
      }
  
    }
  )
  if(!user)
  {
    c.status(403)
    return c.json({error:"invalid user credentials"})
  
  
  }

  const token=await sign({ id: user.id }, c.env.JWT_PASSWORD);
  console.log(token);
  return c.json({ token:token });


}
catch(err)
{
    c.status(403)

    return c.json({error:"error while signing in"})



}

  
  })
  
UserRouter.get('/author',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())


const headers=c.req.header("authorization")|| " ";
const cont=headers.split(" ")[1];

try{

const user_id= decode(cont);
console.log(user_id.payload.id);
const value= user_id.payload.id
const user=await prisma.user.findUnique({
  where:{
    id: value

  },
  select:{
    name:true
  }

})
return c.json({user})





}
catch(e)
{
  c.json({"error":"some network issue"});


}






})