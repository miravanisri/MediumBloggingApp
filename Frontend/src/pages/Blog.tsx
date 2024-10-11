import { useParams } from "react-router-dom";
import { Fullblog } from "../components/Fullblog";
import { useBlog } from "../hooks"

import { Appcomponent } from "../components/Appcomponent";
import { BlogSkeleton2 } from "../components/BlogSkeleton2";

export const Blog=()=>{
    const {id}=useParams()
    const {blog,loading}=useBlog({id:id||""});

    if(loading)
    {
        
        return <div>
            <Appcomponent/>
            <div>
            <BlogSkeleton2/>

            </div>
         

        </div>
    }
return(<div>
    <Fullblog blog={blog}/>








</div>
)



}