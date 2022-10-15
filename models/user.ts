'use strict'
import { Model } from 'sequelize'
import { IUser } from '../interfaces/user.interface'
module.exports = (sequelize: any, DataTypes: any) => {
	class User extends Model<IUser> implements IUser {
		id!: number
		email!: string
		password!: string

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
			// define association here
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	)
	return User
}
