import db from '../models'

const findByArray = async (genres: number[]) => {
	let errors: string[] = []

	for (const id of genres) {
		const genre = await db.Genre.findByPk(id)
		if (genre === null) errors.push(`Genre with id ${id} not found.`)
	}
	return errors
}

export const genreService = { findByArray }
