const mysql = require("mysql");
const MySQLObj = {
    host:"localhost",
	// host:"127.0.0.1",
    user:"root",
    password:"",
    database:"wangyi"
}

const client = mysql.createConnection(MySQLObj);

function SQLConnect(sql,arr,callback){
    client.query(sql,arr,(error,result) =>{
        if(error){
            console.log(error);
            return;
        }
        callback(result);
    })
}

module.exports = SQLConnect