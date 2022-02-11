'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class AdminModel {



	GetConteudo() {
		return new Promise(function (resolve, reject) {
			helper.Query('SELECT  * FROM home').then(data => {
					resolve(data);
					
				});
		});
	}


	UpdateConteudo(POST) {
		return new Promise(function (resolve, reject) {
			helper.Update('home', POST).then(data => {
				resolve(data);
			});
		});
	}

}
module.exports = AdminModel;