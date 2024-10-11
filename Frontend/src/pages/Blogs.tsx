import { Appcomponent } from "../components/Appcomponent"
import { Blogcard } from "../components/Blogcard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    if(loading)
    {
        
    return <div>
    <Appcomponent/>
    <div className=" flex justify-center">
        <div>
        <BlogSkeleton/>
  <BlogSkeleton/>
  <BlogSkeleton/>

        </div>
   


    </div>
  
  </div>


    }
    return(
        <div>

            <div>
                <Appcomponent/>
            </div>
             <div className="flex justify-center">
               <div className="">
                {blogs.map(blog=>(
                    <div key={blog.id}>
                        <Blogcard id={blog.id} authorName={blog.author.name||"Anonymous"} title={blog.title} content={blog.content} publishDate={blog.publishDate}/>




                    </div>






                )




                
)}
            
        </div>

        </div>
     

        </div>
       
    )
}