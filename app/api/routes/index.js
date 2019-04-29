var express = require('express');
var router = express.Router();
const mongo = require('mongodb-curd');
const db = '1701Bbweek3';
const list = 'list';
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});
router.post('/api/find', function(req, res, next) {
	
	let page = req.body.page;
	let pageSize = req.body.pagesize;
	let style = req.body.style;
	console.log(style)
	mongo.find(db,list,{style:style},function(reulst){
		if(!reulst){
			res.json({
				code:0,
				msg:'查询错误'
			})
		}else{
			res.json({
				code:1,
				mag:'查询成功',
				data:reulst
			})
		}
	},{
        skip: (page - 1) * pageSize,
        limit: pageSize,
    })
});
module.exports = router;
