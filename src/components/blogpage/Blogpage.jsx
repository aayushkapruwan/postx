import React from 'react'
import { useParams } from 'react-router-dom'
import postsdatabaseobj from '../../appwrite/userpostsdatabase'
function Blogpage() {
    const {postid} = useParams()
    const pst=postsdatabaseobj.getpost(postid)
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
    {pst.featuredimage && (
      <img 
        src={pst.featuredimage} 
        alt={pst.title} 
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
    )}
    <h1 className="text-3xl font-bold text-gray-900 mb-2">{pst.title}</h1>
    <p className="text-gray-700 text-lg">{pst.content}</p>
  </div>
  )
}

export default Blogpage