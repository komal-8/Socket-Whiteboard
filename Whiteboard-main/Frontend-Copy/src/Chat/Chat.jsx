import React, { useEffect, useState } from 'react'

function Chat({socket,name,code}) {

  const [currentMsg,setCurrentMsg]=useState("");
  const [msgList,setMsgList]=useState([])

  const sendMsg =async()=>{
    if(currentMsg !== "")
    {
        const msgDate ={
          code:code,
          author:name,
          msg:currentMsg,
          time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_msg",msgDate)
    }
  }
  
  useEffect(()=>{
    socket.on("receive_msg",(data)=>{
    setMsgList((list)=>[...list,data])
    })
  },[socket])

  return (
    <div>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        {msgList.map((data)=>{
            return <h2>{data.msg}</h2>
        })}
      </div>
      <div className='chat-footer'>
        <input type="text" placeholder='Hey...' onChange={(e)=>setCurrentMsg(e.target.value)}/>
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat