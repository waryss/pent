angular.module('pentApp')
.factory('flashFactory', function($http, Flash){

  return {
    onSendFormNeed : onSendFormNeed,
    onErrorFromApi : onErrorFromApi
  };

  function onSendFormNeed(data){
    var message = '<strong> Well done!</strong>  Votre besoin a été envoyé avec succes.<br/>';
    Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  }

  function onErrorFromApi(error){
    console.log(error);
    var message = `<strong> ${error.statusText} || ${error.message} </strong> ${error.data}`;
    Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  }

});
