const posts_data = require('../data/posts_data')

const slugify = str =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');


function tagFilter(req, res) {
    let filteredPosts = posts_data
    if (req.query.tags) {
        filteredPosts = posts_data.filter(post => post.tags.includes(req.query.tags))
    }
    if (filteredPosts == '') {
        res.status(404).json({
            error: '404 not found',
            message: 'no post with those tags was found!'
        })
    } else {
        res.json(filteredPosts);
    }

}

function show(req, res) {
    const postSlug = req.params.slug
    const singlePost = posts_data.find(post => post.slug === postSlug)

    if (!singlePost) {
        return res.status(404).json({
            error: '404 not found',
            message: 'Post not found'
        })
    }

    res.json(singlePost)
}

function store(req, res) {
    const slug = slugify(req.body.title)
    const slugCheck = posts_data.find(post => post.slug === slug);
    console.log(slugCheck)

    if (slugCheck) {
        res.status(404);
        return res.json({
            error: "slug already present",
            message: "slug repetition detected"
        })
    }

    const newPost = {
        title: req.body.title,
        slug: slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    }
    posts_data.push(newPost);
    console.log(posts_data)

    res.status(201);
    res.json(newPost);
}

function update(req, res) {
    const slug = req.params.slug

    const post = posts_data.find(post => post.slug === slug);

    if (!post) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "post non trovato"
        })
    }

    post.title = req.body.title
    post.slug = slug
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags
    console.log(posts_data)

    res.json(post);
}

function modify(req, res) {
    const postSlug = req.params.slug
    res.send(`edit post with slug: ${postSlug}`)
}

function destroy(req, res) {
    const postSlug = req.params.slug
    // console.log(posts_data.indexOf(postSlug))
    // posts_data.splice(posts_data.indexOf(postSlug), 1)

    const postIndex = posts_data.findIndex(post => post.slug == postSlug);
    console.log(postIndex)
    if (postIndex === -1) {
        res.status(404).json({
            error: '404 not found',
            message: 'Post not found'
        })
    } else {
        posts_data.splice(postIndex, 1)
        console.log(posts_data)
        console.log(`post ${postIndex} deleted!`)
        // res.send("vaffanculo")
        res.status(204).json(
            {
                message: 'Success!'
            }
        )
    }

}

module.exports = {
    show,
    tagFilter,
    store,
    update,
    modify,
    destroy
}