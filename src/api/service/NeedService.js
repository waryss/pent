'use strict'

import RequestBuilder from '../builder/RequestBuilder'
import ResponseHelper from '../helper/ResponseHelper'
import MailService from '../service/MailService'

export default class NeedService{

	constructor( {db, index, config} ) {
		this.builder = new RequestBuilder();
		this.response = new ResponseHelper();
		this.mail = new MailService(config.name, config.nodemailer);
		this.index = index.index;
		this.type = index.type;
		this.db = db;
	}

	register(res, need){
		try{
			let query = this.builder.buildCreateQuery(this.index, this.type, need);
			this.db.create(query).then(this.response.onSuccess(res), this.response.onError(res));
			if (need.email){
				this.mail.confirmNeedSending({ 'name' : need.name, 'email' : need.email});
				this.mail.notifySalePersons(need);
			}
		} catch(e){
			this.response.onError(res)({ 'message' : e.message });
		}
	}

}
