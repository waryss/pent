angular.module('pentApp')
.service('flashService', function($http, flash){

  return {
    onFromInvalid : onFromInvalid,
    onExistingEmail : onExistingEmail,
    onSendFormNeed : onSendFormNeed,
    onErrorFromApi : onErrorFromApi
  };

  function onSendFormNeed(data){
    var message = '<strong> Well done!</strong>  Votre besoin a été envoyé avec succes.<br/>';
    flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  }

  function onErrorFromApi(error){
    var message = `<strong> ${error.statusText} || ${error.message} </strong> ${error.data}`;
    flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  }

  function onFromInvalid(){
    var message = `<strong> Formulaire Invalid </strong>`;
    flash.create('warning', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  }


  function onExistingEmail(email){
    var message = `<strong> L'adresse email ${email} est déjà utilisée </strong>`;
    flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  }

});
