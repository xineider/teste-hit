'use strict';
var crypto = require('crypto');
var nodemailer = require('nodemailer');

class Control {
	// Retorne o parametro encriptado;
	Encrypt(str) {
		return crypto.createHash('sha256').update('784141dad21381ca'+str+'1084500123123123gvfaadzzq2').digest("hex");
	}
	Unserialize(data) {
		var array = [];
		data = data.split('&');
		for (var i = data.length - 1; i >= 0; i--) {
			var array_pre = [];
			array_pre = data[i].split('=');
			array[array_pre[0]] = array_pre[1];
		}
		return array;
	}
	Isset(data, tipo) {
		if (tipo == false) {
			if (data == undefined || data == 'undefined') {
				return true;
			} else {
				return false;
			}
		} else {
			if (data == undefined || data == 'undefined') {
				return false;
			} else {
				return true;
			}
		}
	}

	DateTime() {

		var date = new Date();

		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;

		var min  = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;

		var sec  = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;

		var year = date.getFullYear();

		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" : "") + month;

		var day  = date.getDate();
		day = (day < 10 ? "0" : "") + day;

		return day + "/" + month + "/" + year + " " +  hour + ":" + min + ":" + sec;

	}
	DateTimeForFile() {

		var date = new Date();

		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;

		var min  = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;

		var sec  = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;

		var year = date.getFullYear();

		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" : "") + month;

		var day  = date.getDate();
		day = (day < 10 ? "0" : "") + day;

		var mili = date.getMilliseconds();

		return day + "_" + month + "_" + year + "_" +  hour + "_" + min + "_" + sec + "_" + mili;

	}


	SendMail(para, assunto,text, html) {
		nodemailer.createTestAccount((err, account) => {

					// create reusable transporter object using the default SMTP transport
					let transporter = nodemailer.createTransport({
						host: 'smtp.ethereal.email',
						secureConnection: false,
						port: 587,						
						auth: {
							user: 'duane.bosco83@ethereal.email',
							pass: 'Md1sKw3Pr7FKf5zY96'
						}
					});

					// setup email data with unicode symbols
					let mailOptions = {
							from: '"Hit - Não Responda" <duane.bosco83@ethereal.email>', // sender address
							to: para, // list of receivers
							subject: assunto, // Subject line
							text: text, 
							html: html // html body
						};


					// send mail with defined transport object
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							return console.log(error);
						}
						console.log('Message sent: %s', info.messageId);
							// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
							// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
						});
				});
	}

}
module.exports = Control;