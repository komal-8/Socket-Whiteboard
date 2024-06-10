import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import io from 'socket.io-client';
import "../../public/Css/style.css";
import e from 'cors';
import { useRef } from 'react';
import axios from 'axios'
import { json } from 'react-router-dom';


const socket = io('http://localhost:8080'); // Corrected server URL

function Tryitnow() {

  const [canvas, setCanvas] = useState(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [isProUser, setIsProUser] = useState(false);
  const [isMouseDown,setIsMouseDown]=useState("false");
  const [loading,setLoading]=useState(false);
  const[userImg,setUserImg]=useState("");
  const imgRef=useRef("null");
  const canvasRef=useRef("null");

  useEffect(() => {
    const newCanvas = new fabric.Canvas('c');
    setCanvas(newCanvas);
    canvasRef.current=newCanvas;
    // console.log(newCanvas)
    // const canvas=canvasRef.current;

    // Set initial brush properties
    newCanvas.freeDrawingBrush.color = 'black';
    newCanvas.freeDrawingBrush.width = 2;
    
    

    // Event listener to capture drawing actions
    newCanvas.on('path:created', (event) => {
      const pathData = event.path.toJSON();
      // console.log(pathData)
      // socket.emit('drawing', pathData.path); // Emit drawing data to the server
      
      const canvasImg=canvasRef.current.toDataURL();
      console.log(canvasImg)
    
      
      socket.emit('draw',canvasImg);
    });

  
    socket.on("canvasImage", (data) => {
      imgRef.current.src = data;
    });

    // socket.on('ondraw',(pathData)=>{
    //   console.log('inside on draw')
    //   console.log(pathData.pathData)
    //   let data=pathData.pathData;
    //   let s='';
    //   for(let i=0;i<data.length;i++){
    //     // console.log(data[i][0]+" "+data[i][1]+" "+data[i][2]+" ");
    //     s+=data[i][0]+' '+data[i][1]+' '+data[i][2]+' ';
        
    //   }
    //   // s+='z'
    //   // console.log(s)
    //   var path = new fabric.Path(s);
    //   path.set({ stroke: 'green', opacity: 0.5 });
    //   newCanvas.add(path);
      
    // })

    return () => {
      // Cleanup code to avoid memory leaks
      newCanvas.dispose();
    };
  }, []);

  
  
  // useEffect(()=>{
  //   async function sendDataWithAxios(userInfo,img){
  //     let res= await axios.post('http://localhost:8080/save', {
  //       username:userInfo.username,
  //       email:userInfo.email,
  //       img:img
  //       })
  //   }
  // },[])

  // function handleSave(){
  //   const userId = localStorage.getItem('userId');
  //   console.log(userId)
  //   let img=imgRef.current;
  //   if(img!=null){
  //     sendDataWithAxios(userInfo,img)

  //   }
  // }

  
  // useEffect(()=>{
  //   if(canvas){
  //     const canvasImg=canvasRef.current.toDataURL();
  //     console.log(canvasImg)
    
      
  //     socket.emit('draw',canvasImg);
  //   }

  //     socket.on('ondraw',({data})=>{
  //       console.log(data);
  //       setCanvas(data);
        
  //     })
  //     // handleMouseMove(e);

  //     // socket.emit('draw',{x,y});
  // },[isDrawingMode])


  // function handleMouseMove(e){
    
  //   x=e.clientX;
  //   y=e.clientY;
  //   if(isMouseDown && isDrawingMode){
  //       // setIsMoving("true")
        
  //       // setCordinates({x:e.clientX,y:e.clientY});
  //       // console.log(cordinates)
  //       ctx.lineTo(x,y);
  //       ctx.stroke();
        
  //       // socket.emit('draw',({x,y}));
  //   }
  //   e.preventDefault();
    
  // }
  // function handleMouseDown(e){
    
  //   setIsMouseDown("true");
  // }
  // function handleMouseUp(e){
  //   setIsMouseDown("false");
  // }

  const handleSave=async(e)=>{
    e.preventDefault();  // use for prevent refresh after submit
    const userId = localStorage.getItem('userId');
    const email=localStorage.getItem('userEmail');
    
    // console.log(img)
    console.log(imgRef)
    console.log(imgRef.current)
    console.log(imgRef.current.src)
    console.log(imgRef.current.src.substring(5))
    // console.log(imgRef.current.src.json())
    let data=imgRef.current.src.substring(22);
    let formData={id:userId,email:email,img:data};
    console.log(formData)
    
    try{
    setLoading(true);// before request  
    const res=await fetch('http://localhost:8080/api/save/save',
    {
      method:'post',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
     
    const data=await res.json();
    console.log(data);

    if(data.success===false)
    {
      
      setLoading(false);
      return;
    }
    setLoading(false);
    
  }
  catch(error)
  {
    setLoading(false);
    console.log(error)
  }
  };


  async function handleShowCanvas() {
    
    const id = localStorage.getItem('userId');
    const email=localStorage.getItem('userEmail');
      
    let api=`http://localhost:8080/api/save/${id}/show`;
    const res=await axios.get(api)
    .catch((e)=>{
      console.log(e)
    })
    console.log(res.data);
    setUserImg(res.data);
    
  }

  useEffect(()=>{
    handleShowCanvas();
  },[])

  


  const handleToggleDrawingMode = () => {
    setIsDrawingMode(prevMode => !prevMode);
    setIsEraserMode(false);

    if (canvas) {
      // console.log(canvas)
      canvas.isDrawingMode = !canvas.isDrawingMode;
    }
  };

  const handleClearCanvas = () => {
    if (canvas) {
      canvas.clear();
      // console.log(canvas)
    }
  };

  const handleColorChange = (e) => {
    if (canvas && !isEraserMode) {
      canvas.freeDrawingBrush.color = e.target.value;
    }
  };

  const handleBrushSizeChange = (e) => {
    if (canvas) {
      canvas.freeDrawingBrush.width = parseInt(e.target.value, 10);
    }
  };

  const handleDrawShape = (shapeType) => {
    if (canvas) {
      let shape;
      switch (shapeType) {
        case 'rectangle':
          shape = new fabric.Rect({
            width: 100,
            height: 50,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2,
            left: 50,
            top: 50
          });
          break;
        case 'circle':
          shape = new fabric.Circle({
            radius: 30,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2,
            left: 100,
            top: 100
          });
          break;
        default:
          break;
      }
      canvas.add(shape);
    }
  };

  const handleToggleEraserMode = () => {
    setIsEraserMode(prevMode => !prevMode);
    setIsDrawingMode(false);

    if (canvas) {
      canvas.isDrawingMode = false;

      if (!isEraserMode) {
        canvas.freeDrawingBrush.color = canvas.backgroundColor;
      } else {
        canvas.freeDrawingBrush.color = 'black';
      }
    }
  };

  const handleUpgradeToPro = () => {
    // Here you can implement logic for handling the purchase,
    // such as integrating with a payment gateway and updating user's pro status
    setIsProUser(true); // For demonstration purpose, setting user as pro
  }; 
  return (
    <div className="canvas-container">
      <h1>CANVAS DRAWING</h1>
      <div className="canvas-controls">
        <button onClick={handleToggleDrawingMode}>
          {isDrawingMode ? 'Cancel drawing mode' : 'Enter drawing mode'}
        </button>
        <button onClick={handleToggleEraserMode}>
          {isEraserMode ? 'Exit eraser mode' : 'Enter eraser mode'}
        </button>
        <input type="color" onChange={handleColorChange} />
        <input type="range" min="1" max="50" onChange={handleBrushSizeChange} />
        <button onClick={() => handleDrawShape('rectangle')}>Draw Rectangle</button>
        <button onClick={() => handleDrawShape('circle')}>Draw Circle</button>
        <button id="clear-canvas" className="hidden" onClick={handleClearCanvas}>
          Clear Canvas
        </button>
        <button onClick={handleSave}>Save Canvas</button>
        <button onClick={handleShowCanvas}>show Saved Canvas</button>
        {!isProUser && (
        <div className="pro-upgrade">
          <button onClick={handleUpgradeToPro}>Upgrade to Pro</button>
          {/* Add additional information about pro features */}
          <p>Unlock additional features with the Pro version!</p>
        </div>
      )}
      </div>
      <canvas id="c" style={{height:"900px",width:"500px",border:"2px solid black"}}
    
      onMouseDown={(e)=>handleMouseDown(e)}
      onMouseUp={(e)=>handleMouseUp(e)}
      onMouseMove={(e)=>handleMouseMove(e)}
      ref={canvasRef}
      >
        
      </canvas>
      <div><img style={{height:"500px",width:"500px",border:"2px solid black"}} className="w-100 h-100" ref={imgRef} src="" alt="image" /></div>
    </div>
  );
}

export default Tryitnow;
