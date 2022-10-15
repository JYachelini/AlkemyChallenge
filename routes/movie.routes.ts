import { Router } from 'express'
import { body, query, param, validationResult } from 'express-validator'
import { nextTick } from 'process'
import controllers from '../controllers'
import { validateToken } from '../middlewares/token.middleware'

export const routerMovie = Router()

routerMovie
	.route('/movies')
	.get(
		validateToken,
		query('order')
			.optional()
			.custom((value) => {
				if (value != 'ASC' || value != 'DESC') {
					throw new Error('Order must be ASC or DESC')
				}
				return true
			}),
		query('genre')
			.optional()
			.custom((value) => {
				if (isNaN(value)) {
					throw new Error('Genre must be numeric.')
				}
				return true
			}),
		(req, res, next) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() })
			}
			return next()
		},
		controllers.movieController.list
	)
	.post(
		body('title')
			.isString()
			.withMessage('Must be a string')
			.isLength({ min: 4, max: 30 })
			.withMessage('Must have between 4-30 characters.'),
		body('qualify').isInt({ min: 1, max: 5 }).withMessage('Qualify must be between 1-5'),
		body('date').isDate({ format: 'YYYY-MM-DD' }).withMessage('Must be a valid date. YYYY-MM-DD'),
		body('image').isURL().withMessage('Must be a valid URL.'),
		body('characters')
			.optional()
			.isArray({ min: 1 })
			.custom((value) => {
				if (!value.every(Number.isInteger)) throw new Error('Array only can contain numbers.')
				return true
			}),
		body('genres')
			.optional()
			.isArray({ min: 1 })
			.custom((value) => {
				if (!value.every(Number.isInteger)) throw new Error('Array only can contain numbers.')
				return true
			}),
		(req, res, next) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() })
			}
			return next()
		},
		validateToken,
		controllers.movieController.create
	)

routerMovie
	.route('/movies/:id')
	.get(
		param('id').custom((value) => {
			if (isNaN(value)) {
				throw new Error('ID Must be numeric.')
			}
			return true
		}),
		(req, res, next) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() })
			}
			next()
		},
		validateToken,
		controllers.movieController.get
	)
	.delete(
		param('id').custom((value) => {
			if (isNaN(value)) {
				throw new Error('ID Must be numeric.')
			}
			return true
		}),
		(req, res, next) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() })
			}
			next()
		},
		validateToken,
		controllers.movieController.remove
	)
	.put(
		param('id').custom((value) => {
			if (isNaN(value)) {
				throw new Error('adsasad')
			}
			return true
		}),
		body('title')
			.optional()
			.isString()
			.withMessage('Must be a string')
			.isLength({ min: 4, max: 30 })
			.withMessage('Must have between 4-30 characters.'),
		body('qualify').optional().isInt({ min: 1, max: 5 }).withMessage('Qualify must be between 1-5'),
		body('date')
			.optional()
			.isDate({ format: 'YYYY-MM-DD' })
			.withMessage('Must be a valid date. YYYY-MM-DD'),
		body('image').optional().isURL().withMessage('Must be a valid URL.'),
		(req, res, next) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() })
			}
			next()
		},
		validateToken,
		controllers.movieController.update
	)
