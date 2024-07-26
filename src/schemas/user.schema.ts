import mongoose, { ObjectId } from 'mongoose';
import { BcryptHelper } from 'src/helpers/bcrypt.helper';

export interface IUser {
  _id: ObjectId;
  name: string;
  username: string;
  password: string;
}

export const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
});

UserSchema.pre('save', async function (next) {
  this.password = await BcryptHelper.hashPassword(this.password);
  next();
});
