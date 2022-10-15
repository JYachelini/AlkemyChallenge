'use strict'
import { Model } from 'sequelize'
import { IMovie } from '../interfaces/movie.interface'
module.exports = (sequelize: any, DataTypes: any) => {
	class Movie extends Model<IMovie> implements IMovie {
		id!: number
		image!: string
		title!: string
		date!: string
		qualify!: number
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
			// define association here
			Movie.belongsToMany(models.Character, {
				through: 'MovieCharacter',
				as: 'characters',
			})
			Movie.belongsToMany(models.Genre, {
				through: 'MovieGenre',
				as: 'genres',
			})
		}
	}
	Movie.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			qualify: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Movie',
		}
	)
	return Movie
}
