import nodemailer from 'nodemailer';
import validator from 'validator';
const config = useRuntimeConfig();

const transporter = nodemailer.createTransport({
	host: config.MAIL_TRANSPORT_HOST,
	port: config.MAIL_TRANSPORT_PORT,
	auth: {
		user: config.MAIL_TRANSPORT_USER,
		pass: config.MAIL_TRANSPORT_PASSWORD,
	},
});

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		//console.log('oy:', body);
		await isValid(body)
			.then(async (data) => {		

				// build xml for car/contact etc. here
				const mail = await transporter.sendMail({
					from: `"${data.name}" <${data.email}>`,
					to: config.MAIL_TRANSPORT_TO_ADDRESS,
					subject: `IKE im Museum – Webseite: Kontakt`,
					text: `Name: ${data.name} ### Funktion: ${data.selectedFunction} ### Institution: ${data.institution} ### Telefon: ${data.phone} ### E-Mail: ${data.email} ### Kulturerbe: ${data.heritage} ### Projektbeschreibung: ${data.description}`,
					html: `
					<style>td{padding-right: 20px} td:first-child{font-weight: bold}</style>
					<table>
						<tr>
							<td>Name:</td>
							<td>${data.name}</td>
						</tr>
						<tr>
							<td>Funktion:</td>
							<td>${data.selectedFunction}</td>
						</tr>		
						<tr>
							<td>E-mail:</td>
							<td>${data.email}</td>
						</tr>								
						<tr>
							<td>Telefon:</td>
							<td>${data.phone}</td>
						</tr>			
						<tr>
							<td>Institution:</td>
							<td>${data.institution}</td>
						</tr>		
						<tr>
							<td>Um dieses Kulturerbe handelt es sich:</td>
							<td>${data.heritage}</td>
						</tr>							
						<tr>
							<td>Projektbeschreibung:</td>
							<td>${data.description}</td>
						</tr>																																				
					</table>`,				
				});

				console.log('Message sent: %s', mail.messageId);
				console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mail));
				return Promise.resolve();
			})
			.catch((errors) => {
				return Promise.reject(errors);
			});

		return 'Gesendet!';
	} catch (error) {
		sendError(event, createError({ statusCode: 400, statusMessage: error }));
	}
});

async function isValid(body) {
	const errors = [];

	if (validator.isEmpty(body.email || ''))
		errors.push({field: 'email', error: 'Field is required.'});
	if (!validator.isEmail(body.email || ''))
		errors.push({ field: 'email', error: 'Field should be a valid email.' });			
	if (validator.isEmpty(body.name || ''))
		errors.push({field: 'name', error: 'Field is required.'});		

	if (errors.length > 0) {
		return Promise.reject(errors);
	} else {
		return Promise.resolve({
			selectedFunction: validator.escape(body.selectedFunction),
			name: validator.escape(body.name),
			institution: validator.escape(body.institution),
			email: validator.normalizeEmail(body.email),
			phone: validator.escape(body.phone),
			heritage: validator.escape(body.heritage),
			description: validator.escape(body.description),
		});
	}
}