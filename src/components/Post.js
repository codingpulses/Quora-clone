import React, { useState,useEffect } from 'react'
import '../css/Post.css'
import { Avatar } from '@mui/material'
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOutlined, ShareOutlined  } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../features/userSlice'
import Modal from 'react-modal'
import { selectQuestionId, selectQuestionName, setQuestionInfo } from '../features/questionSlice'
import db from '../firebase'
import firebase from 'firebase/compat/app';




const Post = ({Id,question,image,timestamp,quoraUser}) => {
  const user = useSelector(selectUser)
  const[openModal,setOpenModal] = useState(false)
  const dispatch = useDispatch()

  const questionId = useSelector(selectQuestionId)
  const questionName = useSelector(selectQuestionName)
  const[answer,setAnswer] = useState("");
  const[getAnswer,setGetAnswers] = useState([]);

  useEffect(() => {
    if(questionId){
      db.collection('questions').doc(questionId).collection('answer')
      .orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
      setGetAnswers(
        snapshot.docs.map((doc) =>({id: doc.id, answers: doc.data()}))
      ))
      
    }
  }, [questionId])
  

  const handleAnswer = (e)=>{
    e.preventDefault()
    if(questionId){
      db.collection('questions').doc(questionId).collection('answer').add({
        questionId:questionId,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        answer:answer,
        user:user
      })
      console.log(questionId,questionName); 
      setAnswer("");
      setOpenModal(false);
    }

  }

  return (
    <div className='post'
     onClick={()=> dispatch(setQuestionInfo({

      questionId:Id,
      questionName:question
     }))}
    >
      <div className='post__info'>
      <Avatar
        src = {quoraUser.photo}/>
      <h5>{quoraUser.displayName ? quoraUser?.displayName : quoraUser?.email }</h5>
      <small>{new Date(timestamp.toDate()).toLocaleString()}</small>
      </div>
      <div className='post__body'>
        <div className='post__question'>
            <p>{question}</p>
            <button className='post__btnAnswer' onClick={()=>setOpenModal(true)}>Answer</button>
        </div>
        <Modal 
        isOpen={openModal} onRequestClose={() => setOpenModal(false)} shouldCloseOnOverlayClick={false}
        style={{
          overlay:
          {width:700,
             height:600,
              backgroundColor: 'rgba(0,0,0,0.8)', 
              zIndex:'1000',
              top:'50%', 
              left:"50%",
            marginTop:'-300px',
          marginLeft: '-350px',
        },
      }}
      ariaHideApp={false}
      >
           <div className="modal__question">
              <h1>{question}</h1>
              <p>
                asked by{" "}
                <span className="name">
                  {quoraUser.displayName?quoraUser.displayName:quoraUser.email}
                </span>{" "}
                {""}
                on{" "}
                <span className="name">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <textarea
                 required
                value={answer}
                onChange = {(e)=>setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        <div className='post__answer'>
        {getAnswer.map(({id, answers}) => (
                    <p key={id} style={{  position: "relative", paddingBottom: "5px" }}>
                    {Id === answers.questionId ? (
                       <div style={{display:"flex"}}>
                      <span>
                        {answers.answer}
                        </span>
                        <span
                          style={{
                            position: "absolute",
                            color: "gray",
                            fontSize: "small",
                            display: "flex",
                            right: "0px",
                          }}
                        >
                          <span style={{ color: "#b92b27" }}>
                            {answers.user.displayName
                              ? answers.user.displayName
                              : answers.user.email}{" "}
                            on{" "}
                            {new Date(answers.timestamp?.toDate()).toLocaleString()}
                          </span>
                        </span>
                    
                      </div>
                    ) : (
                      ""
                    )}
                  </p>
              ))}
        </div>
        <img src={image} alt=""></img>
      </div>
      <div className='post__footer'>
        <div className='post__footerAction'>
        <ArrowDownwardOutlined/>
          <ArrowUpwardOutlined />
        </div>
        <RepeatOutlined />
        <ChatBubbleOutlineOutlined />
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
    </div>
  )
}

export default Post
