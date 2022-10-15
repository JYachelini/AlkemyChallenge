import db from '../models'
import { CreateMovieDTO, IMovieDTO } from '../interfaces/movie.interface'
import { characterService } from './character.service'
import { genreService } from './genre.service'

const findByArray = async (movies: number[]) => {
	let errors: string[] = []

	for (const id of movies) {
		const movie = await db.Movie.findByPk(id)
		if (movie === null) errors.push(`Movie with id ${id} not found.`)
	}
	return errors
}

const list = async (filter?: object, order?: string[][]) => {
	if (Object.keys(filter!)[0] == 'genre.id') {
		return await db.Movie.findAll({
			attributes: ['image', 'title', 'date'],
			include: [
				{
					model: db.Genre,
					as: 'genres',
					through: {
						attributes: [],
					},
					where: {
						id: Object.values(filter!)[0],
					},
				},
			],
		})
	}
	return await db.Movie.findAll({
		attributes: ['image', 'title', 'date'],
		where: filter,
		order: order,
	})
}

const get = async (id: number) => {
	return await db.Movie.findByPk(id, {
		include: [
			{
				model: db.Character,
				as: 'characters',
				through: {
					attributes: [],
				},
			},
			{
				model: db.Genre,
				as: 'genres',
				through: {
					attributes: [],
				},
			},
		],
	})
}

const create = async (data: CreateMovieDTO) => {
	const { image, title, date, characters, qualify, genres } = data

	if (characters) {
		const characterNotFound = await characterService.findByArray(characters)
		if (characterNotFound.length > 0) {
			return { errors: characterNotFound }
		}
	}

	if (genres) {
		const genreNotFound = await genreService.findByArray(genres)
		if (genreNotFound.length > 0) {
			return { errors: genreNotFound }
		}
	}

	const movieCreated = await db.Movie.create({
		image,
		title,
		date,
		qualify,
	})

	if (characters) {
		for (const idCharacter of characters) {
			await db.MovieCharacter.create({
				MovieId: movieCreated.id,
				CharacterId: idCharacter,
			})
		}
	}

	if (genres) {
		for (const idGenre of genres) {
			await db.MovieGenre.create({
				MovieId: movieCreated.id,
				GenreId: idGenre,
			})
		}
	}

	return movieCreated
}

const update = async (data: IMovieDTO, id: number) => {
	return await db.Movie.update(data, { where: { id } })
}

const remove = async (id: number) => {
	return await db.Movie.destroy({ where: { id } })
}

export const movieService = { findByArray, create, list, get, update, remove }
