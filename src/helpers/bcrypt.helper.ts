import * as bcrypt from 'bcrypt';

export class BcryptHelper {
  static async hashPassword(plainPassword: string) {
    const hash = await bcrypt.hash(plainPassword, 10);
    return hash;
  }

  static async comparePassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
