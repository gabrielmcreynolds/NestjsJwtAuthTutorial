import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Ip,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
import { LoginDto } from './dto/login.dto';
import GoogleTokenDto from './dto/google-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/google/login')
  async googleLogin(
    @Body() body: GoogleTokenDto,
    @Req() req,
    @Ip() ip: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const result = await this.authService.loginGoogleUser(body.token, {
      userAgent: req.headers['user-agent'],
      ipAddress: ip,
    });
    if (result) {
      return result;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Error while logging in with google',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    return this.authService.login(body.email, body.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }
}
