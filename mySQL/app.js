var express = require("express");//npm install express
var app=express();
var session=require("express-session");//npm install express-session
app.use(session({"secret":"wy"}));
var cookieParser =require('cookie-parser');//npm install cookie-parser
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var conn =require("./conn.js");//引入自定义模块

//登陆
app.post("/login",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })

//  res.end('6666')
    

    var username=req.body.username;
    var password=req.body.password;   
    
//  var username='timeone';
//  var password='123456';   
//  
    console.log(username,password);
    var sql="select * from login where username='"+username+"' AND password='"+password+"' "
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
        	res.end('success')
//      	console.log(result)
//          res.end(JSON.stringify(result[0]));
            
        }
    })

});

//获取数据列表
app.post("/goodslist",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    

    var sql = "select * from goodslist "
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
//      	console.log(JSON.stringify(result))
        	res.end(JSON.stringify(result));
           }
    })

});



//删除商品(修改)
app.post("/delgoods",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    var id =req.body.id;

    console.log(id[0])
    console.log(typeof (id))

    for(var i=0;i<id.length;i++){
        var n=id[i];
        var sql = "delete from goodslist where id in ('"+n+"') "
        conn.query(sql,function(err,result){
            if(result.length==0){ 
                res.end("error")
                console.log("error")
            }else{
    //      	console.log(JSON.stringify(result))
            	// res.end("success");
               }
        })
    }
//     var sql = "select * from goodslist"
//     conn.query(sql,function(err,result){
//         if(result.length==0){ 
//             res.end("error")
//             console.log("error")
//         }else{
// //          console.log(JSON.stringify(result))
//             res.end(JSON.stringify(result));
//            }
//     })


});


//添加商品     修改，res->req
app.post("/addgoods",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })

	
    var addgoods = req.body.addgoods;
    console.log(addgoods)


    var sql = "insert into goodslist (name,price,search,time,publish) values ('"+addgoods.name+"','"+addgoods.price+"','"+addgoods.search+"','"+ addgoods.nowtime +"','"+addgoods.publish+"') "
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
//      	console.log(JSON.stringify(result))
        	// res.end(JSON.stringify(result));
           }
    })

    //返回全部数据重新渲染到页面
    var sql="select * from goodslist"
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
//          console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
           }
    })
});


//搜寻商品  修改
app.post("/goodsearch",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    // var search = req.body.search; 
    // var name = req.body.name;
    var val=req.body.val;
    console.log(val)
    
    var sql = "select * from goodslist where name like '%"+val.name+"%' AND search = '"+val.search+"' "
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
//      	console.log(JSON.stringify(result))
        	res.end(JSON.stringify(result));
           }
    })
});

//搜寻类别
app.post("/search",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    
    var search=req.body.search;
    
    var sql = "select * from goodslist where search='"+search+"' "
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
//      	console.log(JSON.stringify(result))
        	res.end(JSON.stringify(result));
           }
    })

});


//修改密码
app.post("/changepsd",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    var password = req.body.password;
    var username = req.body.username;

//	update 表 set (字段1=值1, 字段2=值2) where 条件
    var sql = "update login set password = '"+password+"' where username = '"+username+"' "
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
//      	console.log(JSON.stringify(result))
        	res.end(JSON.stringify(result));
           }
    })

});    


//获取类别名
app.post("/goodsclass",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    

    var sql = "select * from goodsclass "
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
//      	console.log(JSON.stringify(result))
        	res.end(JSON.stringify(result));
           }
    })

});

//添加类别名 修改
app.post("/addclass",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    
    var goodsclass = req.body.goodsclass
	console.log(goodsclass)
    var sql = "insert into goodsclass (name) values ('"+goodsclass+"') ";
    conn.query(sql,function(err,result){
    	
    	// console.log(result)
        // res.end('success');
    })

    
    var sql = "select * from goodsclass";
    conn.query(sql,function(err,result){
        
        // console.log(result)
        res.end(JSON.stringify(result));
    })

});

//删除类别名
app.post("/delclass",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    
    var delclass = req.body.delclass
	console.log(delclass)

    var sql = "delete from goodsclass where name ='"+delclass+"' ";

    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
//      	console.log(JSON.stringify(result))
        	res.end(JSON.stringify(result));
        	console.log(JSON.stringify(result));
           }

    })
//     
});

//获取用户的数据
app.post("/getuser",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    
    var sql = "select * from login "
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
        	res.end(JSON.stringify(result));
           }
    })
    
})

//查询用户数据
app.post("/searchuser",bodyParser.json(),function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    
    var searchuser = req.body.searchuser;
    console.log(searchuser.phone)
    var sql = "select * from login where (username='"+searchuser.username+"' OR phone='"+searchuser.phone+"' OR email='"+searchuser.email+"') "
    conn.query(sql,function(err,result){
        if(result.length==0){ 
            res.end("error")
            console.log("error")
        }else{
        	console.log(JSON.stringify(result))
        	res.end(JSON.stringify(result));
           }
    })
    
})

app.listen(8989);


