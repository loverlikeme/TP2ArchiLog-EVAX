import { Body, Controller, Post } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {

    constructor(private readonly mailService: MailService){}

    @Post('sendRendezVous')
    async sendEmail(@Body() createMail: MailDto ) {
        this.mailService.sendEmailVerification(createMail.email, createMail.address, createMail.Jour, createMail.mois, createMail.annee);
    }
}
