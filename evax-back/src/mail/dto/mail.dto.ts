import { IsNotEmpty, IsOptional, IsPositive, MaxLength, MinLength } from 'class-validator';
export class MailDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  email: string;

  @IsNotEmpty()
  Jour: number;

  @IsPositive()
  @IsNotEmpty()
  mois: number;

  @IsNotEmpty()
  annee: number;

  @IsNotEmpty()
  address: string;
}