const express=require('express');
const multer=require('multer');
const db=require('./database');
const ffmpeg=require('./ffmpeg');
const router=express.Router();
const upload=multer({dest:'videos/'});
const monitor=require("./monitor");

function protect(req,res,next){
 if(req.session.login) next();
 else res.status(401).json({error:'login required'});
}

router.post(
"/channel/add",
protect,
(req,res)=>{


let {
name,
platform,
url,
key
}=req.body;



db.run(

`INSERT INTO channels
(name,platform,url,key)
VALUES(?,?,?,?)`,

[
name,
platform,
url,
key
]

);


res.json({
success:true
});


});

router.post('/upload',protect,upload.single('video'),(req,res)=>{
 db.run('INSERT INTO videos(name,path) VALUES(?,?)',[req.file.originalname,req.file.path]);
 res.json({success:true});
});
router.get(
"/monitor",
protect,
(req,res)=>{


res.json(
monitor.get()
);


});
router.get('/videos',protect,(req,res)=>{
 db.all('SELECT * FROM videos',(e,d)=>res.json(d));
});

router.post('/channel',protect,(req,res)=>{
 db.run('INSERT INTO channels(name,url,key) VALUES(?,?,?)',[req.body.name,req.body.url,req.body.key]);
 res.json({success:true});
});

router.get('/channels',protect,(req,res)=>{
 db.all('SELECT * FROM channels',(e,d)=>res.json(d));
});

router.post('/stream/start',protect,(req,res)=>{
 res.json(ffmpeg.startStream(req.body.video,req.body.rtmp));
});

router.post('/stream/stop',protect,(req,res)=>{
 res.json(ffmpeg.stopStream());
});

router.get('/stream/status',protect,(req,res)=>{
 res.json(ffmpeg.status());
});

module.exports=router;

router.post(
"/quick-start",
protect,
(req,res)=>{


let video=req.body.video;

let channel=req.body.channel;


let rtmp=
channel.url+
"/"+
channel.key;



res.json(

ffmpeg.startStream(
video,
rtmp
)

);


});
const uploader=require("./uploads");


router.post(
"/upload/logo",
protect,
uploader.single("logo"),

(req,res)=>{


res.json({

logo:req.file.path

});


});
router.post(
"/upload/music",
protect,
uploader.single("music"),

(req,res)=>{


res.json({

music:req.file.path

});


});
router.post(
"/scheduler/add",
protect,
(req,res)=>{


db.run(

`
INSERT INTO schedules
(video,channel,start,stop)
VALUES(?,?,?,?)
`,

[
req.body.video,
req.body.channel,
req.body.start,
req.body.stop
]

);


res.json({
success:true
});


});
