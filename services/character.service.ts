import { CreateCharacterDTO, ICharacterDTO } from '../interfaces/character.interface'
import db from '../models'
import { movieService } from './movie.service'

const list = async (filter?: object) => {
	if (Object.keys(filter!)[0] == 'movies.id') {
		return await db.Character.findAll({
			include: [
				{
					model: db.Movie,
					as: 'movies',
					through: {
						attributes: [],
					},
					where: {
						id: Object.values(filter!)[0],
					},
				},
			],
			attributes: ['image', 'name'],
		})
	}
	return await db.Character.findAll({
		attributes: ['image', 'name'],
		where: filter,
	})
}

const get = async (id: number) => {
	return await db.Character.findByPk(id, {
		include: [
			{
				model: db.Movie,
				as: 'movies',
				through: {
					attributes: [],
				},
				include: {
					as: 'genres',
					model: db.Genre,
					through: {
						attributes: [],
					},
					// attributes: {
					// 	exclude: ['id', 'createdAt', 'updatedAt'],
					// },
				},
			},
		],
	})
}

const create = async (data: CreateCharacterDTO) => {
	const { age, history, image, movies, name, weight } = data

	if (movies) {
		const moviesNotFound = await movieService.findByArray(movies)
		if (moviesNotFound.length > 0) {
			return { errors: moviesNotFound }
		}
	}

	const characterCreated = await db.Character.create({
		age,
		history,
		image,
		name,
		weight,
	})

	if (movies) {
		for (const idMovie of movies) {
			await db.MovieCharacter.create({
				MovieId: idMovie,
				CharacterId: characterCreated.id,
			})
		}
	}

	return characterCreated
}

const update = async (data: ICharacterDTO, id: number) => {
	return await db.Character.update(data, { where: { id } })
}

const remove = async (id: number) => {
	return await db.Character.destroy({ where: { id } })
}

const findByArray = async (characters: number[]) => {
	let errors: string[] = []

	for (const id of characters) {
		const character = await db.Character.findByPk(id)
		if (character === null) errors.push(`Character with id ${id} not found.`)
	}
	return errors
}

export const characterService = { list, get, create, update, remove, findByArray }
