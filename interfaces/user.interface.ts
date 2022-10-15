export interface IUserDTO {
	email: string
	password: string
}

export interface IUser extends IUserDTO {
	id: number
}
