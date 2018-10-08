var mysql = require("mysql");
//创建连接对象
var conn = mysql.createConnection({
	"host" : "localhost",
	"port" : "3306",
	"user" : "root",
	"password" : "",
	"database" : "manger system"
});
//连接,mysql需要先启动
conn.connect();

//定义模块
module.exports = conn;