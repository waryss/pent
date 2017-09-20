'use strict'

export default class ResponseService {

	constructor() { };

	defaultResponse(res) {
		return function(error, response) {
			if(error){
				res.send(error);
			} else {
				res.send(response);
			}
		}
	}

}
