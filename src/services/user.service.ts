import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_MODULES } from 'src/config/database.config';
import { StringHelper } from 'src/helpers/string.helper';
import { IUser } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(DB_MODULES.USER) private UserModel: Model<IUser>) {}

  async findById(userId: string) {
    return await this.UserModel.findById(userId);
  }

  create(name: string, username: string, password: string) {
    const user = new this.UserModel({
      name,
      username,
      password,
    });

    return user.save();
  }

  async findByUsername(username: string) {
    username = StringHelper.normalize(username);

    return await this.UserModel.findOne({ username });
  }
}
