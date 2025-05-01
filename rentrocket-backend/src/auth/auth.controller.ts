import { Controller, HttpCode, UsePipes, ValidationPipe, Get, UseGuards, Post, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegDto } from './dto/auth.dto';
import { Response, response } from 'express';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const {refreshToken, ...response} = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken)
    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegDto, @Res({ passthrough: true }) res: Response) {
    const {refreshToken, ...response} = await this.authService.register(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken)
    return response;
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)
    return true
  }


  @Post('login/access-token')
  @HttpCode(200)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshTokenFromResponse = req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromResponse) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh token not found');
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromResponse);

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response

  }

}
