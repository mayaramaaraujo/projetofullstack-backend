export class Genre {
    private id: string
    private genre: string

    constructor(
        id: string,
        genre: string
    ) {
        this.id = id
        this.genre = genre
    }

    public getId(){ return this.id }
    public getName(){ return this.genre }
}

export interface inputGenre {
    token: string,
    genre: string
}