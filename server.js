const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;
const posts_routes = require('./routers/posts_routes')
const errorsHandler = require('./middlewares/errors')
const notFound = require('./middlewares/error404')

app.use(express.static('public'))
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.listen(port, () => {
    console.log(`server listening on http:/localhost:${port}`)
})

app.get("/", (req, res) => {
    //daje()  //added to debug error checking
    res.send("welcome to my server")
})

app.use('/posts', posts_routes)

app.use(errorsHandler)
app.use(notFound)
