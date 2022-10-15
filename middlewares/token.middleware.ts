import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'
import { IUser } from '../interfaces/user.interface'

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	const bearerHeader = req.headers['authorization']
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ')
		const access_token = bearer![1]

		req.token = access_token
		try {
			const payload = jwt.verify(req.token, config.JWT_SECRET!) as IUser
			req.user = payload
		} catch (error) {
			return res.status(403).json({ error: 'Invalid token.' })
		}

		return next()
	} else {
		return res.status(403).json({ error: 'No token provided.' })
	}
}
