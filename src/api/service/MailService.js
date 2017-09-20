'use strict'

import nodemailer from 'nodemailer';

export default class MailService {

	constructor(config) {
		this.config = config;
	};

	sendmail() {

		let transporter = nodemailer.createTransport( this.config );

		var mailOptions = {
						from: 'Jude',
						to: 'mbugujude@gmail.com',
						subject: 'test',
						text: 'Premier message envoyé par PENT',
						html: '<b>Premier message envoyé par PENT</b>'
		};

		transporter.sendMail(mailOptions, function(error, info){
			 if(error){
					return console.log(error);
			 }
			 console.log('Message sent: ' + info.response);
		});

		transporter.close();

	}

}
