const {spawn}=require("child_process");
const monitor=require("./monitor");


let process=null;
let current=null;


function startStream(video,rtmp){


if(process)
return {
status:"already running"
};


current={
video,
rtmp
};


run();


return {
status:"started"
};

}



function run(){


monitor.start();



process=spawn(

"ffmpeg",

[

"-re",

"-stream_loop",
"-1",

"-i",
current.video,


"-c:v",
"libx264",

"-preset",
"veryfast",

"-threads",
"1",

"-b:v",
"1200k",

"-maxrate",
"1200k",

"-bufsize",
"2400k",


"-c:a",
"aac",

"-f",
"flv",

current.rtmp


]

);



process.stderr.on(
"data",
data=>{


monitor.update(data);


console.log(
data.toString()
);


});




process.on(
"close",
()=>{


process=null;


// automatic recovery


if(current){

setTimeout(()=>{

run();

},5000);


}


});


}



function stopStream(){


if(process)
process.kill();


process=null;
current=null;


return {
status:"stopped"
};


}



function status(){

return{
running:!!process
};

}



module.exports={
startStream,
stopStream,
status
};
