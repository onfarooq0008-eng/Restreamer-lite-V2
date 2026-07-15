const bcrypt=require('bcrypt');
const config=require('./config.json');
const hash=bcrypt.hashSync(config.admin_password,10);

function login(u,p){
 return u===config.admin_user && bcrypt.compareSync(p,hash);
}
module.exports={login};
