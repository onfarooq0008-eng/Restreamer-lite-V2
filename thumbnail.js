const ffmpeg=require("fluent-ffmpeg");


function createThumbnail(video,id){


return new Promise((resolve)=>{


ffmpeg(video)

.screenshots({

timestamps:["5"],

filename:id+".jpg",

folder:"public/thumbnails"

})


.on("end",()=>{

resolve(
"/thumbnails/"+id+".jpg"
);

});


});


}


module.exports={
createThumbnail
};
