import { IsNotEmpty, IsString } from 'class-validator';

export default class GoogleTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
