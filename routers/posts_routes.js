const express = require('express')
const router = express.Router()
const posts_controller = require('../controllers/posts_controller')

//filteredindex
router.get("/", posts_controller.tagFilter)

//show
router.get("/:slug", posts_controller.show)

//store
router.post("/", posts_controller.store)

//update
router.put("/:slug", posts_controller.update)

//modify
router.patch("/:slug", posts_controller.modify)

//destroy
router.delete("/:slug", posts_controller.destroy)

module.exports = router;