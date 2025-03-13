export type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    collection: string[],
    trades: string[],
    registerDate: string
};