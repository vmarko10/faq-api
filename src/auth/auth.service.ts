import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { authDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if (user && await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {        
        const payload = { username: user.name, sub: user.id };

        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    async signup(user: authDto) {
        const hash = await bcrypt.hash(user.password, 10);

        return this.userService.insert({ ...user, password: hash });
    }
}
