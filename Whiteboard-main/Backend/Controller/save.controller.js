import User from "../models/user.model.js"
import mongoose from 'mongoose'
const saveImg =  async (req, res,next) => {
    const {id,email,img}=req.body;
    try{
    console.log(img)
    console.log(email)
    
    // const newUser=new User({username:user.username,email:user.email,password:user.password,image:img})
    // console.log(newUser)
    // await newUser.save();
    //  user.image=img;
    //  await User.save(user)
    //  console.log(User.findOne({email:email}))
    User.findByIdAndUpdate(id, { image: img })
    const user=User.findOne({email:email});
  // console.log(user)

    }
    catch(err){
      console.log(err)
    }
    
    
};

// export const sendUser=async(req,res,next)=>{
//   let {email}=req.body;
//   try{
//     let user=User.find({email:email})
    
//   }
//   catch(err){
//     console.log(err)
//   }
  
  
// }

export const sendImg=async(req,res,next)=>{
  let{id}=req.params;
  console.log(" inside send img in server");
  try{
    let user=await User.findById(id);
    img=user.image;
    let data={"img":img};
    res.status(200).json(data);
    

  }
  catch(err){
    console.log(err)
  }
  
  
}


export default saveImg;