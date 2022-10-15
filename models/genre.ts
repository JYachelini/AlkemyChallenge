'use strict'
import { Model } from 'sequelize'
import { IGenre } from '../interfaces/genre.interface'
module.exports = (sequelize: any, DataTypes: any) => {
	class Genre extends Model<IGenre> implements IGenre {
		name!: string
		image!: string
		id!: number
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
			// define association here
			// Gender.hasMany(models.Movie, { as: 'Movie', foreignKey: 'MovieId' })
			// Genre.hasMany(models.Movie,{as:'genre',foreignKey:''})
			Genre.belongsToMany(models.Movie, { through: 'MovieGenre', as: 'movies' })
		}
	}
	Genre.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Genre',
		}
	)
	return Genre
}
