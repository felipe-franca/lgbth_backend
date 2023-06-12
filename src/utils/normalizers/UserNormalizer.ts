import { type User } from '@prisma/client';
import { type NormalizedUser } from '../../types/UserType';

export default class UserNormalizer {
  public normalize (user: User): NormalizedUser {
    return {
      avatar: user.avatar ?? '',
      email: user.email,
      birthDate: user.birth_date ?? null,
      age: user.age ?? null,
      name: user.name,
      password: user.password,
      id: user.id
    };
  }
}
