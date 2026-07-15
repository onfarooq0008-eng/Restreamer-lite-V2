const sqlite3=require('sqlite3').verbose();
const db=new sqlite3.Database('./database/restreamer.db');

db.run(`
CREATE TABLE IF NOT EXISTS channels(
id INTEGER PRIMARY KEY,
name TEXT,
platform TEXT,
url TEXT,
key TEXT
)
`);


db.run(`
CREATE TABLE IF NOT EXISTS videos(
id INTEGER PRIMARY KEY,
name TEXT,
path TEXT,
thumbnail TEXT
)
`);


db.run(`
CREATE TABLE IF NOT EXISTS settings(
id INTEGER PRIMARY KEY,
music TEXT,
logo TEXT,
volume INTEGER
)
`);

db.serialize(()=>{
db.run('CREATE TABLE IF NOT EXISTS videos(id INTEGER PRIMARY KEY,name TEXT,path TEXT)');
db.run('CREATE TABLE IF NOT EXISTS channels(id INTEGER PRIMARY KEY,name TEXT,url TEXT,key TEXT)');
db.run('CREATE TABLE IF NOT EXISTS schedules(id INTEGER PRIMARY KEY,video TEXT,channel TEXT,start TEXT,stop TEXT)');
});
module.exports=db;
