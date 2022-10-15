export interface CreateMovieCharacterDTO {
	MovieId: number
	CharacterId: number
}

export interface IMovieCharacter extends CreateMovieCharacterDTO {
	id: number
}
