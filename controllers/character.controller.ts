import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { CreateCharacterDTO, ICharacterDTO } from '../interfaces/character.interface'
import services from '../services'

const list = async (req: Request, res: Response) => {
	const { name, age, movies } = req.query
	let filter = {}

	if (name) {
		filter = {
			[Op.or]: [
				{
					name: { [Op.substring]: name },
				},
			],
		}
	} else if (age) {
		filter = {
			age: {
				[Op.eq]: Number(age),
				/*
                No sabía bien como había que filtrarlo así que dejo las 3 formas para hacerlo.
				[Op.lte]: Number(age),
				[Op.gte]: Number(age),
                */
			},
		}
	} else if (movies) {
		filter = {
			'movies.id': {
				[Op.eq]: Number(movies),
			},
		}
	}
	const characters = await services.characterService.list(filter)

	return res.json(characters)
}

const create = async (req: Request, res: Response) => {
	const data = req.body as CreateCharacterDTO
	const created = await services.characterService.create(data)

	return res.json(created)
}

const get = async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const character = await services.characterService.get(id)

	return res.json(character)
}

const update = async (req: Request, res: Response) => {
	const data = req.body as ICharacterDTO
	const id = Number(req.params.id)
	const updated = await services.characterService.update(data, id)
	if (updated[0] === 0) return res.status(404).json({ error: `Character with ID ${id} not found.` })

	return res.json({ message: `Character with ID ${id} updated.` })
}

const remove = async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const removed = await services.characterService.remove(id)
	if (removed[0] === 0) return res.status(404).json({ error: `Character with ID ${id} not found.` })

	return res.json({ message: `Character with ID ${id} removed.` })
}

export const characterController = { list, create, get, update, remove }
