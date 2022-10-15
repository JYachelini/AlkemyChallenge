export interface IMovieDTO {
	image: string
	title: string
	date: string
	qualify: number
}

export interface IMovie extends IMovieDTO {
	id: number
}

export interface CreateMovieDTO extends IMovieDTO {
	characters: number[]
	genres: number[]
}
