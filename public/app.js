async function update(){


try{


let s=await fetch(
"/api/stream/status"
);


let stream=await s.json();



status.innerHTML =
stream.running
?
"🟢 LIVE"
:
"🔴 OFF";



let h=await fetch(
"/api/health"
);


let health=await h.json();


server.innerHTML="Online";


ram.innerHTML=
Math.round(
health.memory/1024/1024
)
+" MB";



uptime.innerHTML=
Math.floor(
health.uptime/60
)
+" min";


}

catch(e){

status.innerHTML="Error";

}


}



async function stopStream(){

await fetch(
"/api/stream/stop",
{
method:"POST"
}
);


update();

}


setInterval(update,3000);

update();
