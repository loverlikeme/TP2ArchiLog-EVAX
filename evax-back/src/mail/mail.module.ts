import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitoyenEntity } from 'src/dashboard/entity/citoyen.entity';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([CitoyenEntity])],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
