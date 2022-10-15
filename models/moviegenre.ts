'use strict'
import { Model } from 'sequelize'
import { IMovieGenre } from '../interfaces/moviegenre.interface'

module.exports = (sequelize: any, DataTypes: any) => {
	class MovieGenre extends Model<IMovieGenre> implements IMovieGenre {
		id!: number
		MovieId!: number
		GenreId!: number
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
			// define association here
		}
	}
	MovieGenre.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			MovieId: {
				type: DataTypes.NUMBER,
				allowNull: false,
				references: {
					model: 'Movie',
					key: 'id',
				},
			},
			GenreId: {
				type: DataTypes.NUMBER,
				allowNull: false,
				references: {
					model: 'Genre',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			modelName: 'MovieGenre',
		}
	)
	return MovieGenre
}
