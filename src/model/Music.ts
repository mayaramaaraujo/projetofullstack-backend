export class Music {
    id: string
    title: string
    author_id: string
    date: Date
    file: string
    genre: string
    album: string

    constructor(
        id: string,
        title: string,
        author_id: string,
        date: Date,
        file: string,
        genre: string,
        album: string,
    ) {
        this.id = id
        this.title = title
        this.author_id = author_id
        this.date = date
        this.file = file
        this.genre = genre
        this.album = album
    }

    public getId(){
        return this.id
    }

    public getTitle(){
        return this.title
    }

    public getAuthorId(){
        return this.author_id
    }

    public getDate() {
        return this.date
    }

    public getFile() {
        return this.file
    }

    public getGenre(){
        return this.genre
    }

    public getAlbum(){
        return this.album
    }
}