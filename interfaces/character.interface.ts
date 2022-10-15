export interface ICharacterDTO {
	image: string
	name: string
	age: number
	weight: number
	history: string
	// movieId: number
}

export interface ICharacter extends ICharacterDTO {
	id: number
}

export interface CreateCharacterDTO {
	image: string
	name: string
	age: number
	weight: number
	history: string
	movies: number[]
}
