import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getAllUsers() {
    return this.userModel.find();
  }

  async getMe() {
    //
    return this.userModel.findOne({});
  }

  async getUser(id: string) {
    return this.userModel.findById(id);
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return;
  }
}
