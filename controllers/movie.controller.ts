import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { CreateMovieDTO, IMovieDTO } from '../interfaces/movie.interface'
import services from '../services'

const list = async (req: Request, res: Response) => {
	const { title, genre, order } = req.query
	let filter = {}
	let orderBy: string[][] = []

	if (title) {
		filter = {
			[Op.or]: [
				{
					title: { [Op.substring]: title },
				},
			],
		}
	} else if (genre) {
		filter = {
			'genre.id': {
				[Op.eq]: Number(genre),
			},
		}
	} else if (order) {
		orderBy = [['date', String(order)]]
	}
	const movies = await services.movieService.list(filter, orderBy)

	return res.json(movies)
}

const get = async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	console.log(id)
	const movie = await services.movieService.get(id)

	return res.json(movie)
}

const create = async (req: Request, res: Response) => {
	const data = req.body as CreateMovieDTO
	const created = await services.movieService.create(data)

	return res.json(created)
}

const update = async (req: Request, res: Response) => {
	const data = req.body as IMovieDTO
	const id = Number(req.params.id)
	const updated = await services.movieService.update(data, id)
	if (updated[0] === 0) return res.status(404).json({ error: `Movie with ID ${id} not found.` })

	return res.json({ message: `Movie with ID ${id} updated.` })
}

const remove = async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const removed = await services.movieService.remove(id)
	if (removed[0] === 0) return res.status(404).json({ error: `Movie with ID ${id} not found.` })

	return res.json({ message: `Movie with ID ${id} removed.` })
}

export const movieController = { list, get, create, update, remove }
