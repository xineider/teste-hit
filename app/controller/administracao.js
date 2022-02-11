// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var AdministracaoModel = require('../model/administracaoModel.js');
var model = new AdministracaoModel;


var data = {};
var app = express();
app.use(require('express-is-ajax-request'));




router.get('/', function(req, res, next) {
	model.GetConteudo().then(data_home => {
		data['home'] = data_home;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/administracao', data: data, usuario: req.session.usuario});
	});
});


router.post('/enviar_conteudo', function(req, res, next) {
	POST = req.body;

	//Verifico se existe algum conteúdo
	if(POST.conteudo.length>0){
		model.GetConteudo().then(data_home => {
			data_update_home = {id:data_home[0].id, conteudo:POST.conteudo };
			model.UpdateConteudo(data_update_home).then(data_update => {
				res.json('sucesso');
			});
		});
	}else{
		res.json('erroVazio');
	}


});







module.exports = router;
