import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from "@nestjs/config";
import { verify } from 'argon2';
import { Response } from 'express';
import axios from 'axios';

@Injectable()
export class AuthService {
    EXPIRE_DAY_REFRESH_TOKEN = 1
    REFRESH_TOKEN_NAME = 'refreshToken'
    CAPTCHA_SECRET_KEY: string;

    constructor(
        private readonly configService: ConfigService,
        private jwt: JwtService,
        private userService: UserService
    ) {
        this.CAPTCHA_SECRET_KEY = this.configService.get('CAPTCHA_KEY');
    }


    createTokensPair(res : Response, req : any){
        if (!req.user) return false;
        const { accessToken, refreshToken } = this.issueTokens(req.user.id);
        this.addRefreshTokenToResponse(res, refreshToken);
        return accessToken;
    }


    async login(dto: AuthDto) {
        const { password, ...user } = await this.validateUser(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens
        }
    }

    async register(dto: AuthDto) {
        await this.verifyRecaptcha(dto.captcha);
        const oldUser = await this.userService.getByLogin(dto.login);
        if (oldUser) throw new BadRequestException('User already exists');

        const { password, ...user } = await this.userService.create(dto);

        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens
        }
    }


    private async verifyRecaptcha(captcha: string) {
        const data = new URLSearchParams();
        data.append('response', captcha);
        data.append('secret', this.CAPTCHA_SECRET_KEY);

        const response = await axios.post('https://hcaptcha.com/siteverify', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Captcha verification response:', response.data);

        if (!response.data.success) {
            throw new UnauthorizedException('Подверждение авторизации по капче не пройдено.');
        }
    }

    private issueTokens(userId: string) {
        const data = { id: userId }

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        })

        return { accessToken, refreshToken }
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.userService.getByLogin(dto.login);
        if (!user) throw new NotFoundException('User not found');

        const isValid = await verify(user.password, dto.password);
        if (!isValid) throw new UnauthorizedException('Wrong password');

        return user;
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            // domain: 'localhost',
            domain: '.lockshield.online',
            expires: expiresIn,
            secure: true,
            sameSite: 'none'
        })
    }

    removeRefreshTokenFromResponse(res: Response) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            // domain: 'localhost',
            domain: '.lockshield.online',
            expires: new Date(0),
            secure: true,
            sameSite: 'none'
        })
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result) throw new UnauthorizedException('Wrong refresh token');

        const user = await this.userService.getById(result.id);
        if (!user) throw new NotFoundException('User not found');

        const { password, ...userData } = user;
        const tokens = this.issueTokens(userData.id);

        return {
            user: userData,
            ...tokens
        }
    }


}
