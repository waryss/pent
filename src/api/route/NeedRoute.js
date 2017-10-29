'use strict'

import { Router } from 'express'

import ResponseHelper from '../helper/ResponseHelper'
import NeedService from '../service/NeedService'

export default class NeedRoute extends Router{

	constructor( {db, index, config} ) {
		super();
		this.needService = new NeedService( {db, index, config} );
		this.response = new ResponseHelper();

		this.post('/', (req, res, next) => {
			if(req && req.body && req.body.email){
				this.needService.register(res, req.body);
			} else{
				let returnCode = ResponseHelper.RETURN_CODE.ERR_TEC_MISSING_REQUEST_PAYLOAD;
				let message = 'Informations obligatoires manquantes';
				this.response.onError(res)({ message, returnCode });
			}
		});

	}

}
