interface CreateUserType {
  name: string
  email: string
  password: string
  age: number | null
  birtDate: Date | null
  avatar: Blob | null
}

export default CreateUserType;
