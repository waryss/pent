'use strict'

import { Router } from 'express'

import ResponseHelper from '../helper/ResponseHelper'
import UserService from '../service/UserService'

export default class UserRoute extends Router{

	constructor( {db, index, config} ) {
		super();
		this.userService = new UserService( {db, index, config} );
		this.response = new ResponseHelper();

		this.post('/login', (req, res, next) => {
			this.userService.login(res,
				{
					'email' : req.body.email,
					'password' : req.body.password
				}
			);
		});

		this.post('/signup', (req, res, next) => {
			if(req && req.body && req.body.name && req.body.email && req.body.password){
				this.userService.register(res,
					{
						'name' : req.body.name,
						'email' : req.body.email,
						'password' : req.body.password
					}
				);
			} else{
				let returnCode = ResponseHelper.RETURN_CODE.ERR_TEC_MISSING_REQUEST_PAYLOAD;
				let message = 'Informations obligatoires manquantes';
				this.response.onError(res)({ message, returnCode });
			}
		});

	}
}
