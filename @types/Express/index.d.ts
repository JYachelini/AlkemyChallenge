import { IUser } from '../../interfaces/user.interface'

export {}

declare global {
	namespace Express {
		export interface Request {
			token: string
			user: {
				id: number
				email: string
			}
		}
	}
}
