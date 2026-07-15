const express=require('express');
const multer=require('multer');
const db=require('./database');
const ffmpeg=require('./ffmpeg');
const router=express.Router();
const upload=multer({dest:'videos/'});

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
