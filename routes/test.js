var express=require('express');
var mysql=require('mysql');
var router=express.Router();

var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'news',
	port:3306
})

router.get('/title',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select id,title from news',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});

router.post('/content',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body['id'];
	pool.query(`select content from news where id='${id}'`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});

router.post('/replacetable',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body['id'];
	var title=req.body['title'];
	var content=req.body['content'];
	pool.query(`update news set title='${title}',content='${content}' where id='${id}'`,function(err,rows){
		if(err) throw err;
		console.log(rows)
		res.send('success')
	})
});

router.post('/removetable',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body['id'];
	pool.query(`delete from news where id='${id}'`,function(err,rows){
		if(err) throw err;
		res.send('success')
	})
});



module.exports=router;