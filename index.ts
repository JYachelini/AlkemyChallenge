import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import config from './config/config'
import { routes } from './routes'
import db from './models'
export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({ credentials: true, origin: true }))
app.use(routes)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

const port = config.PORT

db.sequelize.sync().then(() => {
	console.log('DB Connected.')
	app.listen(port, () => {
		console.log(`App listening on port ${port}`)
	})
})
