import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitoyenEntity } from 'src/dashboard/entity/citoyen.entity';
import { Repository } from 'typeorm';
import config from '../config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

    constructor(@InjectRepository(CitoyenEntity) private readonly citoyenRepository: Repository<CitoyenEntity>){}

    async sendEmailVerification(email: string, address: String, jour: number, mois: number, annee: number): Promise<boolean> {   
        var model = await this.citoyenRepository.findOne({where:{email: email}});
        if(model && model.email){
            let transporter = nodemailer.createTransport({
                host: config.mail.host,
                port: config.mail.port,
                secure: config.mail.secure, // true for 465, false for other ports
                auth: {
                    user: config.mail.user,
                    pass: config.mail.pass
                },
                tls: {
                  rejectUnauthorized: false
                }
            });
          
              let mailOptions = {
                from: '"EVAX INSAT" <' + config.mail.user + '>', 
                to: email, // list of receivers (separated by ,)
                subject: 'You have been invited for Vaccination', 
                text: 'A mail Of Vaccination', 
                html: 'Hello dear citizen, <br><br> It is time to get better<br><br> Citizen with the following email '+email+
                '<br> You have been invited to: <B>'+address+'<B> to receive your vaccination <br> Please do show up on '+jour+'/'+mois+'/'+annee+' at any given moment <br> Good Luck and get Better!' // html body
              };
          
              var sent = await new Promise<boolean>(async function(resolve, reject) {
                return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {      
                      console.log('Message sent: %s', error);
                      return reject(false);
                    }
                    console.log('Message sent: %s', info.messageId);
                    resolve(true);
                });      
              })
      
              return sent;
          } else {
            throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
          }
        }
}
