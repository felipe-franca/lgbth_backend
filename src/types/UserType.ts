
export interface UpdateUserType extends CreateUserType {
  id: number
  age: number | undefined
  birthDate: Date | undefined
  avatar: string | null
};

export interface CreateUserType {
  name: string
  email: string
  password: string
  avatar: string | null
}
