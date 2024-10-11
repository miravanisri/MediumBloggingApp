import { Link } from "react-router-dom"

interface Bloginputs{
    authorName: string,
    title: string,
    content: string,
    publishDate: string,
    id:string

}
export const Blogcard=({authorName,title,content,publishDate,id}:Bloginputs)=>{

return(
<Link to={`/blog/${id}`}>
<div className=" p-4 border-b  border-slate-200 pb-6 w-screen max-w-screen-md cursor-pointer">

<div className="flex items-center ">
<Avatar  authorName={authorName} /><span className="text-sm ">{authorName}</span><Circle /><span className=" ml-1 font-light text-sm ">{publishDate}</span>
</div>
<div className="ml-2 pt-2 font-bold text-2xl">
    {title}
</div>
<div className="ml-2 font-normal  text-md mt-2 mb-5 ">
    {content.slice(0,100)+"..."}
</div>
<div className="ml-2 font-light text-sm ">
    {`${Math.ceil(content.length/100)} min read`}

</div>



</div>



</Link>
   



  
)


}
export function Circle()
{
    return(
        <div className="h-1 w-1 ml-2 mt-1  rounded-full bg-slate-400">

        </div>
    )

}
export  function Avatar({authorName,size="small"}:{authorName:string,size?:string})
{
    return(
    <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 
    rounded-full dark:bg-gray-600 mr-3 ml-2`}>
    <span className={`font-medium ${size==="small"?"text-sm":"text-md"} text-gray-600 dark:text-gray-300`}>{authorName[0]}</span>

    
</div>
    )


}