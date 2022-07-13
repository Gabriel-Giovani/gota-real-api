export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    name: string;
    master: boolean;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

export interface IProduct {
    id: number;
    name: string;
    category: number;
    photo: string;
}

export interface ICategory {
    id: number;
    name: string;
}

export interface IBanner {
    id: number;
    title: string;
    link: string;
    photo: string;
}