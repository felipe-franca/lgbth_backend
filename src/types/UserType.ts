
export interface UpdateUserType {
  id: number
  age: number | undefined
  birthDate: Date | undefined
  avatar: Buffer | undefined
};

export interface CreateUserType {
  name: string
  email: string
  password: string
  avatar: Buffer | undefined
}
