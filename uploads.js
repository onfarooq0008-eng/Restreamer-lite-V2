const multer=require("multer");

const storage=multer.diskStorage({

destination:(req,file,cb)=>{

if(file.fieldname==="logo")
cb(null,"logos/");

else if(file.fieldname==="music")
cb(null,"music/");

else
cb(null,"videos/");

},

filename:(req,file,cb)=>{

cb(null,Date.now()+"-"+file.originalname);

}

});


module.exports=multer({
storage:storage
});
