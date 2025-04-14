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

    const sql = `SELECT posts.title, posts.id, posts.content, posts.image, GROUP_CONCAT(tags.label ORDER BY tags.label SEPARATOR ', ') AS tags FROM posts JOIN post_tag ON post_tag.post_id = posts.id JOIN tags ON tags.id = post_tag.tag_id WHERE posts.id = ${id} GROUP BY posts.title, posts.id, posts.content, posts.image;`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err })
        else if (results[0] == null) return res.status(500).json({ error: 'notFound' })
        results[0].tags = results[0].tags.split(',')
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