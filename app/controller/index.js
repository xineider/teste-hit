// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var indexModel = require('../model/indexModel.js');
var model = new indexModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));



router.get('/', function(req, res, next) {
	model.GetConteudo().then(data_home => {
		data['home'] = data_home;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/index', data: data});
	});
});



module.exports = router;