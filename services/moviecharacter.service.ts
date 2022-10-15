import { CreateMovieCharacterDTO } from '../interfaces/moviecharacter.interface'
import db from '../models'

const create = async (data: CreateMovieCharacterDTO) => {
	return await db.MovieCharacter.create(data)
}

export const moviecharacterService = { create }
