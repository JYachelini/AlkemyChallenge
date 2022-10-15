'use strict'

import { IMovieCharacter } from '../interfaces/moviecharacter.interface'

import { Model } from 'sequelize'
module.exports = (sequelize: any, DataTypes: any) => {
	class MovieCharacter extends Model<IMovieCharacter> implements IMovieCharacter {
		id!: number
		MovieId!: number
		CharacterId!: number

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
			// define association here
		}
	}
	MovieCharacter.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			CharacterId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				// primaryKey: true,
				references: {
					model: 'Character',
					key: 'id',
				},
			},
			MovieId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				// primaryKey: true,
				references: {
					model: 'Movie',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			modelName: 'MovieCharacter',
		}
	)
	return MovieCharacter
}
