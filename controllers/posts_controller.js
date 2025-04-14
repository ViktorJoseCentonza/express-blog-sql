const connection = require('../data/db')


function index(req, res) {

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err })
        console.log(results)
        res.json(results)
    })

}

function show(req, res) {
    const id = Number(req.params.id)

    const sql = `SELECT * FROM posts WHERE posts . id = ${id}`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err })
        console.log(results)
        res.json(results)
    })
}

function store(req, res) {

}

function update(req, res) {

}

function modify(req, res) {

}

function destroy(req, res) {
    const id = Number(req.params.id)
    const sql = `DELETE FROM posts WHERE posts . id = ${id}`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err })
        console.log(results)
        res.sendStatus(204)
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}