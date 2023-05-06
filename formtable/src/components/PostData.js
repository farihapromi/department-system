import React, { useState } from 'react'
import axios from "axios";
import { Axios } from 'axios';

function PostData() {
   const [my_title,setTitle]= useState('');
   const [my_coursename,setMycoursename]= useState('');
   const[my_semester,setSemester]=useState('');
   const username = 'fariha';
 const password = '123';

   const handleSubmit=(e) =>{
       e.preventDefault();
       axios
       .post("http://localhost:8000/dropdown/departments/",
       
       
       {
        name:my_title,
        shortcode:my_coursename,
        shortcode_bangla:my_semester,
        

        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
          }
       }) 
       .then((response) => console.log(response))
       .catch((error) => console.log(error));

   }
   return(
    <>
     <label htmlFor="">Enter Title</label>
    <input type="text" name="name" id=""  value={my_title} onChange={(e)=> setTitle(e.target.value)}/>
    <input type="text" name="name" id=""  value={my_coursename} onChange={(e)=> setMycoursename(e.target.value)}/>
    <input type="text" name="name" id=""  value={my_semester} onChange={(e)=> setSemester(e.target.value)}/>
   
    <button type="submit">Submit</button>
    </>
   )
}
   export default PostData;
