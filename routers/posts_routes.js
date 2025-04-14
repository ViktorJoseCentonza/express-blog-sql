const express = require('express')
const router = express.Router()
const posts_controller = require('../controllers/posts_controller')

//index
router.get("/", posts_controller.index)

//show
router.get("/:id", posts_controller.show)

//store
router.post("/", posts_controller.store)

//update
router.put("/:id", posts_controller.update)

//modify
router.patch("/:id", posts_controller.modify)

//destroy
router.delete("/:id", posts_controller.destroy)

module.exports = router;