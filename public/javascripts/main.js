
$(document).ready(function () {

	//POST BOTÃO
	$(document).on('click', '.ajax-submit', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back, method);
		}
	});

	//POST BOTÃO COM TEXT AREA WYSIWYG
	$(document).on('click', '.ajax-submit-tiny', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var myContent = tinymce.get("my-expressjs-tinymce-app").getContent();

		var post = [{
			name:'conteudo',value: myContent
		}];

		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';

		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back, method);
		}
	});
});


//Carregar Ícone de Loader
function adicionarLoader() {
	$('body').css('overflow', 'hidden');
	$('.loader').fadeIn('fast');
}

//Remover Ícone de Loader
function removerLoader() {
	$('body').css('overflow', 'auto');
	$('.loader').fadeOut('fast');
}


//FUNÇÃO DO POST
function SubmitAjax(post, link, back) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			adicionarLoader();
		},
		success: function(data) {
			 if(data == 'agradecimentoContato'){
				$('.sucesso').empty();
				$('#f_mensagem').addClass('observe-post').parent().append('<div class="sucesso">Obrigado por enviar a mensagem!</div>');
			}else if(data == 'sucesso'){
				$('.sucesso').empty();
				$('#my-expressjs-tinymce-app').addClass('observe-post').parent().append('<div class="sucesso">Atualizado com sucesso!</div>');
			}else if(data == 'erroVazio'){
				$('.sucesso').empty()
				$('#my-expressjs-tinymce-app').addClass('observe-post').parent().append('<div class="error">Não pode ser vazio!</div>');
			}
			else if(data != undefined){
				if(back != ''){
					GoTo(back, true);
				}
			}

		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			removerLoader();
			
		}
	});
}






function VerificarForm(form) {
	$('.error').remove();
	var qtdErros = 0;
	
	form.find('input:enabled:not([type="hidden"])[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			qtdErros++;
		};
	});

	form.find('input:enabled:not([type="hidden"])[required="true"][type="email"]').each(function(){
		if($(this).val()!= ''){
			if(!validateEmail($(this).val())){
				qtdErros++;
				AddErrorTexto($(this),'Email Incorreto!!');
			}
		}
	});
	
	form.find('textarea:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			qtdErros++;
		};
	});
	
	
	if(qtdErros > 0){
		return false;
	}else if(qtdErros <= 0){
		return true;
	}
}

function VerificaItem(isso) {
	if (isso.val() == '') {
		AddError(isso);
		return true;
	}
}

function AddError(isso) {
	$('.sucesso').empty();
	isso.focus().addClass('observe-post').parent().append('<div class="error">Complete corretamente</div>');
}

function AddErrorTexto(isso,texto) {
	$('.sucesso').empty();
	isso.focus().addClass('observe-post').parent().append('<div class="error text-center">'+texto+'</div>');
}




function validateEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}


function GoTo(link, state) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
		},
		success: function(data) {
			$('main').html(data);
		},
    error: function(xhr) { // if error occured
    },
    complete: function() {
    }
});
	if (state == true) {
		window.history.pushState('Hit', 'Hit', link);
	}
}