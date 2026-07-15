const {spawn}=require('child_process');
let proc=null;
let current=null;

function startStream(video,rtmp){
 if(proc) return {status:'already running'};
 current={video,rtmp};
 run();
 return {status:'started'};
}

function run(){
 proc=spawn('ffmpeg',['-re','-stream_loop','-1','-i',current.video,'-c:v','libx264','-preset','veryfast','-threads','1','-b:v','1200k','-c:a','aac','-f','flv',current.rtmp]);
 proc.on('close',()=>{
  proc=null;
  if(current) setTimeout(run,5000);
 });
}

function stopStream(){
 if(proc) proc.kill();
 proc=null;
 current=null;
 return {status:'stopped'};
}

function status(){return {running:!!proc};}
module.exports={startStream,stopStream,status};
