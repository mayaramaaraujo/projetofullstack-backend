import { Music } from "../model/Music";
import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {
    public async create(music: Music){
        try {
            
            await this.getConnection()
            .insert({
                id: music.getId(),
                title: music.getTitle(),
                author_id: music.getAuthorId(),
                date: music.getDate(),
                file: music.getFile(),
                genre: music.getGenre(),
                album: music.getAlbum()
            })
            .into(this.tableNames.musics)

        } catch (error) {
            throw new Error(error.message || error.message)
        }
    }

    public async getMusics(author_id: string){
        try {
            const result = await this.getConnection()
            .select("*")
            .from(this.tableNames.musics)
            .where("author_id", author_id)

            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getAll(author_id: string){
        try {
            
            const result = await this.getConnection()
            .select("*")
            .from(this.tableNames.musics)
            .where("author_id", author_id)

            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async delete(id: string){
        try {
            await this.getConnection().raw(`
                 DELETE FROM ${this.tableNames.musics} WHERE id = "${id}"
            `)

        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}