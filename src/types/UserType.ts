
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

export interface CredentialsType {
  email: string
  password: string
}

export interface NormalizedUser {
  avatar: string
  email: string
  birthDate?: Date | null
  age?: number | null
  name: string
  password: string
  id: number
}
