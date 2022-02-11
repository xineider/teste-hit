'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class LoginModel {
	Login(POST) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id FROM usuario WHERE login = ? AND senha = ?', [POST.login, POST.senha]).then(data => {
				resolve(data);				
			});
		});
	}
}
module.exports = LoginModel;
