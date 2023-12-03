import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { generateId } from 'src/helpers/generate-id.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async create(input: CreateUserDto) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      input.password ?? '12345',
      saltOrRounds,
    );

    const createdUser = await this.repository.save({
      id: generateId(),
      ...input,
      password: hashPassword,
    });

    return {
      user_id: createdUser.id,
      username: createdUser.username,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneById(id: string) {
    console.log('id', id, await this.repository.findOneBy({ id }));

    return this.repository.findOneBy({ id });
  }

  findOneByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
