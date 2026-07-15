const express=require('express');
const session=require('express-session');
const cors=require('cors');
require('./database');
const auth=require('./auth');
const routes=require('./routes');

const app=express();
app.use(cors());
app.use(express.json());
app.use(session({secret:'restreamer-secret',resave:false,saveUninitialized:false}));
app.use(express.static('public'));

app.get('/health',(req,res)=>res.json({ok:true}));

app.post('/api/login',(req,res)=>{
 if(auth.login(req.body.username,req.body.password)){
  req.session.login=true;
  return res.json({success:true});
 }
 res.json({success:false});
});

app.use('/api',routes);

app.listen(8000,()=>console.log('Lite Restreamer running'));

app.get('/api/health',(req,res)=>{

res.json({

memory:
process.memoryUsage().rss,

uptime:
process.uptime()

});

});
