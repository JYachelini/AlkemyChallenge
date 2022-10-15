import { Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import config from '../config/config'
import { IUserDTO } from '../interfaces/user.interface'
import services from '../services'

const login = async (req: Request, res: Response) => {
	const data = req.body as IUserDTO

	const { error, access_token, message, user } = await services.userService.login(data)
	if (error) return res.status(400).json({ error })

	res.json({ message, access_token, user })
}

const register = async (req: Request, res: Response) => {
	sgMail.setApiKey(config.SENDER_EMAIL_API_KEY!)
	const data = req.body as IUserDTO

	const { email, error, id } = await services.userService.register(data)

	if (error) return res.status(400).json({ error })

	await sgMail.send({
		to: email,
		from: 'alkemy.challenge@yopmail.com',
		subject: 'Welcome! Account registered successfully.',
		text: `Email used: ${email} with ID ${id}`,
	})

	return res.json({ message: 'Register successfully.', user: { email, id } })
}

export const userController = { login, register }
