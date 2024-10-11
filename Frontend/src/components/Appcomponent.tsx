import { Link } from "react-router-dom"
import { Avatar } from "./Blogcard"




export  const Appcomponent=()=>{
   

return(

<div className="flex justify-between border-b px-10 py-4" >
    <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
        medium
    </Link>
    <div>
        <Link to={'/publish'}>
        <button type="button" className=" mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center ">New</button>
        </Link>
  
    <Avatar authorName={"User"} size="big"/> 

    </div>

   







</div>


)



}