let stats={

fps:0,
bitrate:0,
resolution:"-",
uptime:0

};


let startTime=null;


function start(){

startTime=Date.now();

}


function update(data){

let text=data.toString();


let fps=text.match(/(\d+(\.\d+)?) fps/);

let bitrate=text.match(/(\d+) kb\/s/);

let resolution=text.match(/(\d+x\d+)/);



if(fps)
stats.fps=fps[1];


if(bitrate)
stats.bitrate=bitrate[1];


if(resolution)
stats.resolution=resolution[1];


if(startTime){

stats.uptime=
Math.floor(
(Date.now()-startTime)/1000
);

}


}



function get(){

return stats;

}


module.exports={
start,
update,
get
};
