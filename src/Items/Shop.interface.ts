
export interface BaseShop {
    name: string
    direction: string
    image: string
    description: string
    userId: string
}

export interface Shop extends BaseShop {
    id: string
}

export interface Shops {
    [kek: number]: Shop
}