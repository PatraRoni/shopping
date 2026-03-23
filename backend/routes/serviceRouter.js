import express from 'express'
import {bookService,allService} from "../controllers/serviceController.js"

const serviceRouter = express.Router()

serviceRouter.post('/book',bookService)
serviceRouter.get('/all',allService)

export default serviceRouter