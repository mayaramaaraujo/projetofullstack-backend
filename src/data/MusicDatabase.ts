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
}