


const mongoose=require ("mongoose");

 async function connectdb(){
     try{
 await mongoose.connect(process.env.USERURL);
 console.log("mongodb connected")}
 catch(err){
    console.log("error in mongodb connection",err)
  }
}
module.exports=connectdb;