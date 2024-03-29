import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
const port = process.env.PORT || 5555

connectDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/todos', todoRoutes)

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  // set static folder 
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
  // any route that is not api will be redirected to index.html
  app.get('*', (req,res) => 
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server Running on Port: ${port}`))