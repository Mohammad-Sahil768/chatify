const cloudinary=require("cloudinary").v2;
const multer=require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary");

require('dotenv').config()//process.env.PORT

//configure cloudinary
cloudinary.config({
    cloud_name:"ds3btooau",
    api_key:"351674384188218",
    api_secret:"LGchAg1k0m3t2bExUr5Rn4ubRuQ"
})

//configure cloudinary storage
let clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        
        folder:"chatdb",
        public_id:(request,file)=>file.fieldname+"-"+Date.now()
    }

})

//configure multer
let multerObj=multer({storage:clStorage})

//export multerObj
module.exports=multerObj;