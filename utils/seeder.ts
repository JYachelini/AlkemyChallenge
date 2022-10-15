import { Model } from 'sequelize'
import { ICharacter } from '../interfaces/character.interface'
import db from '../models'

const createMovies = async () => {
	const { count } = await db.Movie.findAndCountAll()
	if (count > 0) return

	let movies = [
		{
			title: 'The Shawshank Redemption',
			image:
				'https://occ-0-2773-2774.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABRtMYpIEbqrYrlxXp8Ezqpv-6_-wa4psAIUoAOJOP8mgH9y7qTi3SYTLfrNgCgNb-qlDfrTHCZ1KkJ-fr4j86xeTHw.jpg?r=d0a',
			date: '1994-09-10',
			qualify: 5,
		},
		{
			title: 'The Godfather',
			image:
				'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABZVO6ItTejgTusodETTiu3L5xzww2kE-0Jgbore0GiukWNGYQFVAQZcVUkiyoodPWC17iqffeg_QJ8dvX9eh53Jo3Q.jpg?r=bc1',
			date: '1972-03-14',
			qualify: 4,
		},
		{
			title: 'The Godfather: Part II',
			image:
				'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABaBGRGU8A9knbD8DPrvffwtt7B1IIyACVKG2mjMQExmliJgO11kyqupILKQSBSkajRjdBnvDjU16y91DsO-gAW9Kbw.jpg?r=4ff',
			date: '1974-12-12',
			qualify: 3,
		},
		{
			title: 'The Dark Knight',
			image:
				'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABRtIIrpv2j8ZZwKSo73OJyM_Lt0_h4ZQ_DMKI8rlAM_cer2rZc11hcnaJQZqTNuS3OwxxbdVQijsISgwG59neccd_Q.jpg?r=541',
			date: '2008-07-14',
			qualify: 2,
		},
		{
			title: "Schindler's List",
			image:
				'https://occ-0-768-769.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABX2lS7rcwWAPowMjaselxLlCzI-5oW9UcQRAzfhs6HjHfZCJLdZa9i57rOiSUwacR0V0TZK54CRqiPVZgY_30lthQw.jpg?r=9fb',
			date: '1993-11-30',
			qualify: 1,
		},
	]

	movies.map((movie) => {
		db.Movie.create(movie)
	})
}

const createGenres = async () => {
	const { count } = await db.Genre.findAndCountAll()
	if (count > 0) return

	let genres = [
		{
			name: 'Crime',
			image: 'https://loremflickr.com/640/480/cats',
		},
		{
			name: 'Drama',
			image: 'https://loremflickr.com/640/480/cats',
		},
		{
			name: 'Action',
			image: 'https://loremflickr.com/640/480/cats',
		},
		{
			name: 'Thriller',
			image: 'https://loremflickr.com/640/480/cats',
		},
		{
			name: 'Biography',
			image: 'https://loremflickr.com/640/480/cats',
		},
		{
			name: 'History',
			image: 'https://loremflickr.com/640/480/cats',
		},
	]
	genres.map((movie) => {
		db.Genre.create(movie)
	})
}

const createCharacters = async () => {
	const { count } = await db.Character.findAndCountAll()
	if (count > 0) return

	let characters = [
		{
			name: 'Liam Neeson',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Liam_Neeson_at_2008_TIFF_cropped.jpg/220px-Liam_Neeson_at_2008_TIFF_cropped.jpg',
			age: 70,
			weight: 90,
			history:
				'William John Neeson (Ballymena, Antrim, Irlanda del Norte, 7 de junio de 1952), conocido como Liam Neeson, es un actor británico. En 1976 comenzó a actuar en el Teatro lírico de Belfast, donde estuvo dos años. Su primer papel reseñable en el cine fue la película Excalibur de 1981. En esa década también participó en filmes como The Bounty (1984), junto a Mel Gibson y Anthony Hopkins, La misión (1986), con Robert De Niro y Jeremy Irons o el wéstern Con su propia ley (1989), protagonizado por Patrick Swayze. ',
		},
		{
			name: 'Christian Bale',
			image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Christian_Bale-7837.jpg',
			age: 48,
			weight: 81,
			history:
				'Christian Charles Philip Bale (Haverfordwest, Gales, 30 de enero de 1974), más conocido como Christian Bale, es un actor británico ganador de dos Globos de Oro, 2 premios del SAG y un Óscar. Se le considera uno de los actores del estilo de método más importantes de su generación, debido a su intensidad y a las transformaciones drásticas de su cuerpo en diversos papeles.',
		},
		{
			name: 'Robert De Niro',
			image: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Robert_De_Niro_Cannes_2016.jpg',
			age: 79,
			weight: 88,
			history:
				'Robert Anthony De Niro (Nueva York, 17 de agosto de 1943), más conocido como Robert De Niro, es un actor, director y productor estadounidense. Ganador de dos premios Óscar por su actuación en las películas El padrino: Parte II (1974) como un joven Vito Corleone —convirtiéndose en el primer actor en ganar un Óscar por interpretar a un mismo personaje, ya que Marlon Brando también lo ganó por El padrino (1972)— y Toro salvaje como Jake LaMotta (1980). Es ampliamente conocido por sus papeles de gánster y de personajes conflictivos y turbulentos, destacando sus múltiples colaboraciones con el director Martin Scorsese, y por sus primeros trabajos con el director Brian De Palma.',
		},
		{
			name: 'Al Pacino',
			image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Al_Pacino.jpg',
			age: 82,
			weight: 85,
			history:
				'Alfredo James Pacino (Nueva York, 25 de abril de 1940), conocido como Al Pacino, es un actor de cine, teatro y televisión estadounidense, habiéndose desempeñado ocasionalmente como guionista, director y productor. Su carrera abarca siete décadas, desde sus inicios en la escena teatral neoyorquina hasta su éxito en el cine, obteniendo numerosos premios y honores, incluidos los premios Óscar, Emmy, Globo de Oro y Tony, siendo uno de los actores del siglo XX que más reconocimientos ha recibido.5​ Es conocido por haber interpretado personajes problemáticos y outsiders,6​ con una presencia intensa y explosiva,7​8​ lo que lo llevó a ser catalogado por varios medios como uno de los mejores actores de su generación y uno de los más representativos del cine estadounidense de la década de 1970.',
		},
		{
			name: 'Morgan Freeman',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/7/79/Academy_Award-winning_actor_Morgan_Freeman_narrates_for_the_opening_ceremony_%2826904746425%29_%28cropped%29.jpg',
			age: 85,
			weight: 79,
			history:
				'Morgan Freeman (Memphis, Tennessee; 1 de junio de 1937) es un actor y documentalista estadounidense, ganador del premio Óscar en 2005 por Million Dollar Baby. Además ha recibido otras nominaciones por sus actuaciones en El reportero de la calle 42 (1987), Paseando a Miss Daisy (1989), Cadena perpetua (1994) e Invictus (2009). También ha ganado los premios Globo de Oro y SAG, es apodado como Nelson Mandela Americano por su parecido artístico al expresidente de Sudáfrica Nelson Mandela. ',
		},
	]
	characters.map(async (character) => {
		const created = db.Character.create(character)
	})
}

const createMovieCharacter = async () => {
	const { count } = await db.MovieCharacter.findAndCountAll()
	if (count > 0) return

	let assignations = [
		{
			MovieId: 1,
			CharacterId: 5,
		},
		{
			MovieId: 2,
			CharacterId: 4,
		},
		{
			MovieId: 3,
			CharacterId: 3,
		},
		{
			MovieId: 4,
			CharacterId: 2,
		},
		{
			MovieId: 5,
			CharacterId: 1,
		},
		{
			MovieId: 5,
			CharacterId: 2,
		},
	]

	assignations.map((assignation) => {
		db.MovieCharacter.create(assignation)
	})
}

const createMovieGenre = async () => {
	const { count } = await db.MovieGenre.findAndCountAll()
	if (count > 0) return

	let assignations = [
		{
			MovieId: 1,
			GenreId: 5,
		},
		{
			MovieId: 2,
			GenreId: 4,
		},
		{
			MovieId: 3,
			GenreId: 3,
		},
		{
			MovieId: 4,
			GenreId: 2,
		},
		{
			MovieId: 5,
			GenreId: 1,
		},
		{
			MovieId: 5,
			GenreId: 2,
		},
	]

	assignations.map((assignation) => {
		db.MovieGenre.create(assignation)
	})
}

const main = async () => {
	await createGenres()
	await createMovies()
	await createCharacters()
	await createMovieCharacter()
	await createMovieGenre()
}

main()
