import { Blog } from "../hooks"
import { Appcomponent } from "./Appcomponent"
import { Avatar } from "./Blogcard"


export const Fullblog=({blog}:{blog:Blog})=>{
return(
    <div>
        <Appcomponent/>
        <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-2">
                    published on {blog.publishDate}

                </div>
                <div className="pt-4">
                    {blog.content}
                </div>

            </div>
            <div className="col-span-4 ml-16">
                <div className="text-slate-600 text-lg ">
                Author

                </div>
            
                <div className="flex">
                    <div className="pr-4 flex flex-col justify-center">
                    <Avatar authorName={blog.author.name||"Anonymous"}/>

                    </div>
                    
                    <div>
                    <div className="text-xl font-bold">
                {blog.author.name||"Anonymous"}

                </div>
              
              <div className="pt-2 text-slate-500">
                Master of mirth,purveyour of puns and the funniest person in the kingdom
              </div>
                    </div>


                </div>
               

            </div>

        </div>

        </div>
       
    </div>

)




}