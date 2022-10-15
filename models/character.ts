'use strict'

import { Model, UUIDV4 } from 'sequelize'
import { ICharacter } from '../interfaces/character.interface'

module.exports = (sequelize: any, DataTypes: any) => {
	class Character extends Model<ICharacter> implements ICharacter {
		id!: number
		image!: string
		name!: string
		age!: number
		weight!: number
		history!: string

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
			// define association here
			Character.belongsToMany(models.Movie, {
				through: 'MovieCharacter',
				as: 'movies',
			})
		}
	}
	Character.init(
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
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			age: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			weight: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			history: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Character',
		}
	)
	return Character
}
