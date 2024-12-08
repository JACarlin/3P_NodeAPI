import nodemailer from 'nodemailer'
import envs from '../../config/envs'

interface MailOptions{
    to: string,
    subject: string,
    htmlBody: string
}

export class EmailService{
    private transporter= nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_ACCESS_TOKEN
        }
    });

    async sendEmail(mailOptions: MailOptions){
        try{
            const {to, subject, htmlBody} = mailOptions
            const sendInformation = await this.transporter.sendMail({to, subject, html:htmlBody})
            console.log(sendInformation)
        }catch(error){
            console.error(error)
        }
        

    }
}