import { Hono } from 'hono'

import {UserRouter} from './routes/user'

import { BlogRouter } from './routes/blog'

import {cors} from 'hono/cors'

const app = new Hono().basePath('/api/v1')

app.use('/*',cors())


app.route('/user',UserRouter)

app.route('/blog',BlogRouter)






export default app
