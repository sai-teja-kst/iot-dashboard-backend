const express = require('express');
const router = express.Router();
const { chathistory, newchat, userquery } = require("../controllers/chatcontroller");

router.get('/chat', chathistory);

router.post('/chat', newchat);

router.post('/query', userquery);

module.exports = router;
