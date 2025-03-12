import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import postsimageobj from '../../appwrite/userpostimage.js'
function Bloglinkcard({$id, title, featuredimage}) {
  // const [imgsrc,setimgsrc]=useState(null)
  //   useEffect( ()=>{
  //     async function getdata(){
  //       const data=await postsimageobj.filepreview(featuredImage)
  //     setimgsrc(data)
  //     }
  //     getdata()
  //   },[])
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full  rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={featuredimage}  alt={title}
                className='rounded-xl w-full h-[200px]' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default Bloglinkcard