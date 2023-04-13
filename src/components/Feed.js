import React, { useEffect, useState } from 'react'
import "../css/Feed.css"
import Post from './Post'
import QuoraBox from './QuoraBox'
import db from "../firebase";

const Feed = () => {
  const[posts,setPosts] = useState([]);
  useEffect(() => {
    db.collection("questions")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            question: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className='feed'>
      <QuoraBox/>
      {
        posts.length > 0 ?
     ( posts.map(({id, question})=>(
        <Post
        key={id}
        Id={id}
        image={question.imageUrl}
        question={question.questions}
        timestamp={question.timestamp}
        quoraUser={question.user}
        
        />
      ))):null
    }
    
  
    </div>
  )
}

export default Feed
