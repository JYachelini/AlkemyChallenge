import { Router } from 'express'
import { body, param, validationResult } from 'express-validator'
import controllers from '../controllers'

export const routerUser = Router()

routerUser.post(
	'/auth/register',
	body('email').isEmail().withMessage('Email must be a valid email.'),
	body('password')
		.isString()
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters.'),
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() })
		}
		return next()
	},
	controllers.userController.register
)

routerUser.post('/auth/login', controllers.userController.login)
