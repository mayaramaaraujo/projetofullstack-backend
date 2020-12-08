export class User {
    private id: string
    private name: string
    private nickname: string
    private email: string
    private password: string

    constructor(
        id: string,
        name: string,
        nickname: string,
        email: string,
        password: string
    ) {
        this.id = id
        this.name = name
        this.nickname = nickname
        this.email = email
        this.password = password
    }

    public getId = () => {return this.id}
    public getName = () => {return this.name}
    public getNickname = () => {return this.nickname}
    public getEmail = () => {return this.email}
    public getPassword = () => {return this.password}

    public static toUserModel(user: any): User {
        return new User(user.id, user.name, user.nickname, user.email, user.password)
    }
}

export interface UserInputDTO {
    name: string,
    nickname: string,
    email: string,
    password: string
}