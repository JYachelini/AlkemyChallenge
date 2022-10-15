import { Router } from 'express'
import controllers from '../controllers'
import { body, param, query, validationResult } from 'express-validator'
import { validateToken } from '../middlewares/token.middleware'

export const routerCharacter = Router()

routerCharacter
	.route('/characters')
	.get(
		validateToken,
		query('age')
			.optional()
			.custom((value) => {
				if (isNaN(value)) {
					throw new Error('Age must be numeric.')
				}
				return true
			}),
		query('movies')
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
		controllers.characterController.list
	)
	.post(
		body('name')
			.isString()
			.withMessage('Must be a string')
			.isLength({ min: 4, max: 30 })
			.withMessage('Must have between 4-30 characters.'),
		body('age').isInt({ min: 18 }).withMessage('Age must be greater or equal than 18.'),
		body('weight').isInt().withMessage('Weight must be a number.'),
		body('image').isURL().withMessage('Must be a valid URL.'),
		body('history').isString().withMessage('Must be string.'),
		body('movies')
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
		controllers.characterController.create
	)

routerCharacter
	.route('/characters/:id')
	.get(
		param('id').custom((value) => {
			if (isNaN(value)) {
				throw new Error('adsasad')
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
		controllers.characterController.get
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
		controllers.characterController.remove
	)
	.put(
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
		controllers.characterController.update
	)
