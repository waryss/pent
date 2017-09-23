'use strict'

import RequestBuilder from '../builder/RequestBuilder'
import ResponseHelper from '../helper/ResponseHelper'
import MailService from '../service/MailService'
import jwt from 'jsonwebtoken'

export default class UserService{

	constructor( {db, index, config} ) {
		this.builder = new RequestBuilder();
		this.response = new ResponseHelper();
		this.mail = new MailService(config.name, config.nodemailer);
		this.index = index.index;
		this.type = index.type;
		this.db = db;
	}

	login( res, {email, password} ) {
		try{
			let user = this.getByEmail(email);
			if (!user) {
				throw new Error('Authentication failed. User not found.' );
			} else if (user) {
				if (user.password != password) {
					throw new Error('Authentication failed. Wrong password.');
				} else {
					const payload = {
						admin: user.admin
					};
					var token = jwt.sign(payload, process.env.JWT_SECRET, {
						expiresInMinutes: 1440 // expires in 24 hours
					});
					this.response.onSuccess(res)({ message : 'Enjoy your token!' });
				}
			}
		} catch(e){
			this.response.onError(res)({ 'message' : e.message });
		}
	}

	register(res, { name, email, password}){
		try{
			this.checkEmailFormat(email);
			this.checkEmailExists(email);
			let query = this.builder.buildCreateQuery(this.index, this.type, { name, email, password});
			this.db.create(query).then(this.response.onSuccess(res), this.response.onError(res));
			this.mail.confirmUserSubscription({ 'name' : name, 'email' : email});
		} catch(e){
			this.response.onError(res)({ 'message' : e.message });
		}
	}

	async checkEmailExists(email) {
		let query = this.builder.buildMatchQuery(this.index, this.type, { email });
		await this.db.search(query).then( data => {
			if(!data.hits.hits.length){
				throw new Error(`L'adresse email [${email}] est déjà utilisée`);
			}
		}, this.response.onError(res));
	}

	async getByEmail(email) {
		let user = null;
		let query = this.builder.buildMatchQuery(this.index, this.type, { email });
		await this.db.search(query).then( data => {
			if(!data.hits.hits.length){
				user = data.hits.hits[0]._source;
			} else {
				throw new Error(`L'adresse email [${email}] est déjà utilisée`);
			}
		}, this.response.onError(res));
		return user;
	}


	checkEmailFormat(email) {
		var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (email == '' || !re.test(email))
		throw new Error('Email format invalid');
		return true;
	}

}
