// Author: Mitch Allen
// File: root.js

const express = require('express')
const router = express.Router()

const { calcUptime } = require('../lib/uptime.js')

router.get('/', (req, res) => {

    const uptime = calcUptime()

    const {
        title: name,
        version,
        author,
        explorer,  
    } = req.info;

    const record = {
        name,
        version,
        author,
        explorer,
        uptime,
    }

    res.status(200).json(record);
});

module.exports = router