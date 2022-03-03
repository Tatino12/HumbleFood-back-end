export interface User {
  id: string
  name: string
  name_user: string
  email: string
  direction: string
  rol: number
  shops: Array<Shop>
}

export interface Shop {
  id: string
  name: string
  direction: string
  image: string
  description: string
  userId: string
}
