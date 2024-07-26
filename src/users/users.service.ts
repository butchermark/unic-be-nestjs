import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
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

  async getMe(req: Request) {
    const user = req.user as User;
    const foundUser: User = await this.userModel.findById(user._id);

    if (!foundUser) {
      throw new UserNotFoundException(user._id);
    }

    return foundUser;
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
