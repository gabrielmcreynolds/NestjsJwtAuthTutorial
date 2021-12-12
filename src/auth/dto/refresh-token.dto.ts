import { IsNotEmpty } from 'class-validator';

class RefreshTokenDto {
  @IsNotEmpty()
  refreshToken: string;
}

export default RefreshTokenDto;
