import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authDto } from 'src/auth/dto/auth.dto';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {}

    // find a user by username
    async findOne(username: string): Promise<Users> {
        return this.usersRepository.findOne({ where: { name: username }});
    }

    // insert new user
    async insert(user: authDto) {
        const userExist = await this.findOne(user.username);

        // if username is alread exist, return
        if (userExist) {
            return { msg: "This username already registered. Please choose another." };
        }

        try {
            // insert new user
            this.usersRepository.insert({
                name: user.username,
                email: user.email,
                gender: user.gender,
                password: user.password,
            });

            return { msg: 'Signup was successfully!' }
            
        } catch (error) {
            return { msg: 'Unexpected error under signup!' }
        }
    }

}
