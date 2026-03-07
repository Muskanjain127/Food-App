const mongoose=require ("mongoose");

 async function connectdb(){
  console.log("userrrrrrrrrrrrrrrrrrrrrrr",process.env.USERURL);
     try{
 await mongoose.connect(process.env.USERURL);
 console.log("mongodb connected")}
 catch(err){
    console.log("error",err)
  }
}
module.exports=connectdb;