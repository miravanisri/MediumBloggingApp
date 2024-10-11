import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from 'axios'

export  interface Blog
    {
        "content":string,
        "title":string,
        "id":string,
       "publishDate":string,
        "author":{
    "name":string
    
    
        }
    
    }



export const useBlog=({id}:{id:string})=>{
    
    const[loading,setLoading]=useState(true)
    const[blog,setBlog]=useState<Blog>()
    useEffect(()=>{
    
     axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers:{
            authorization:localStorage.getItem('token')
        }
     }).then(respone=>{
        console.log("token:"+localStorage.getItem('token'))
        console.log(respone.data)
        setBlog(respone.data.blog);
        setLoading(false)
        
     })
     .catch(error => {
        console.error("Error fetching blogs:", error.response ? error.response.data : error.message);
        setLoading(false);
      });
    
    
    },[id])
    console.log(blog)
    return{
        loading,blog
    }
    
    
    
    }
    
export const useBlogs=()=>{

const[loading,setLoading]=useState(true)
const[blogs,setBlogs]=useState<Blog[]>([])
useEffect(()=>{

 axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
    headers:{
        authorization:localStorage.getItem('token')
    }
 }).then(respone=>{
    console.log("token:"+localStorage.getItem('token'))
    console.log(respone.data)
    setBlogs(respone.data.blogs);
    setLoading(false)
    
 })
 .catch(error => {
    console.error("Error fetching blogs:", error.response ? error.response.data : error.message);
    setLoading(false);
  });


},[])
console.log(blogs)
return{
    loading,blogs
}



}


