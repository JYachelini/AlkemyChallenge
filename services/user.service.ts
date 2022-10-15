import { IUser, IUserDTO } from '../interfaces/user.interface'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import db from '../models'
import config from '../config/config'

const login = async (data: IUserDTO) => {
	const { email, password } = data

	const userFound: IUser | null = await db.User.findOne({ where: { email } })
	if (userFound === null) return { error: 'Wrong email.' }

	const isMatch = await bcrypt.compare(password, userFound.password)

	if (!isMatch) return { error: 'Wrong password.' }

	const payload = {
		user: {
			id: userFound.id,
			email: userFound.email,
		},
	}

	const access_token = jwt.sign(payload, config.JWT_SECRET!)

	return {
		message: 'Login successfully',
		user: { id: userFound.id, email: userFound.email },
		access_token,
	}
}

const register = async (data: IUserDTO) => {
	const { email, password } = data

	const userFound: IUser | null = await db.User.findOne({ where: { email } })
	if (userFound !== null) return { error: 'Email already exist.' }

	const hash = await bcrypt.hash(password, 10)

	const userCreated = await db.User.create({
		email,
		password: hash,
	})

	return userCreated
}

export const userService = { login, register }
