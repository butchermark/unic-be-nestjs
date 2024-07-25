import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { MongoIdDto } from './dto/mongo-id.dto';

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

  async deleteUser(id: MongoIdDto) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async getUser(id: MongoIdDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }

    return user;
  }
}
