'use strict'

import nodemailer from 'nodemailer';

export default class MailService {

	constructor(appName, config) {
		this.config = config;
		this.appName = appName;
	};

	confirmNeedSending(recipient) {

		let message_txt = `Bonjour ${recipient.name}
											 Nous avons bien reçu votre demande.
											 Nos commerciaux reviendrons vers vous très rapidement.

											 A très bientot
											 Providence entreprises`;

		let message_html = `<div><p>Bonjour <b>${recipient.name}</b><br/>
											 Nous avons bien reçu votre demande.<br/>
											 Nos commerciaux reviendrons vers vous très rapidement.<br/><br/>

											 A très bientot<br/>
											 Providence entreprises</p></div>`;

		let mailOptions = {
						from: this.appName,
						to: recipient.email,
						subject: 'Confirmation',
						text: message_txt,
						html: message_html
		};

		this.sendmail(mailOptions);
	}

	confirmUserSubscription(recipient) {

		let message_txt = `Bonjour ${recipient.name}
											 Nous avons bien pris en compte votre souscription sur ${this.appName}

											 Vous devez finaliser votre souscription en suivant le lien suivant afin de valider votre compte
											 lien :

 											 A très bientot
 											 Providence entreprises`;

		let message_html = `<div><p>Bonjour <b>${recipient.name}</b><br/>
												Nous avons bien pris en compte votre souscription sur ${this.appName}.<br/>

												Vous devez finaliser votre souscription en suivant le lien suivant afin de valider votre compte.<br/>
												lien :<br/>

												A très bientot<br/>
												Providence entreprises</p></div>`;

		let mailOptions = {
						from: this.appName,
						to: recipient.email,
						subject: 'Confirmation',
						text: message_txt,
						html: message_html
		};

		this.sendmail(mailOptions);
	}

	notifySalePersons(need) {

		let message_txt = `Bonjour
											 Un nouveau besoin a été vient d'être posté sur site Providence

											 Informations sur le besoin :
											 		Personne : ${need.name}
													Adresse email: ${need.email}
													Téléphone : ${need.phone}
													Message : ${need.details}
													Marque : ${need.brand}

 											 A très bientot
 											 Providence entreprises`;

		let message_html = `<p>Bonjour
											 Un nouveau besoin a été vient d'être posté sur site Providence
											 <br/><br/>
											 Informations sur le besoin :<br/>
											 		<b>Nom : </b> ${need.name} <br/>
													<b>Email : </b> ${need.email} <br/>
													<b>Téléphone : </b> ${need.phone} <br/>
													<b>Message : </b> ${need.details} <br/><br/>
													<b>Marque : </b> ${need.brand} <br/><br/>

 											 A très bientot<br/>
 											 Providence entreprises<p>`;

		let mailOptions = {
						from: this.appName,
						to: ['mbugujude@gmail.com','warysswiser@gmail.com'],
						subject: 'Notification',
						text: message_txt,
						html: message_html
		};

		this.sendmail(mailOptions);
	}

	sendmail(options) {
		this.config.auth = {
			"user": process.env.PENT_EMAIL,
			"pass": process.env.PENT_PASS
		};
		console.log(this.config);
		console.log(this.config.auth);
		let transporter = nodemailer.createTransport( this.config );
		transporter.sendMail(options, function(error, info){
			 if(error){
					return console.log(error);
			 }
			 console.log('Message sent: ' + info.response);
		});
		transporter.close();
	}

}
