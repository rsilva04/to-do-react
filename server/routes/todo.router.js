const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM toDo;`;
    pool.query(sqlText)
        .then ((result) => {
            console.log(`Got stuff back from database`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})

// POST

// PUT

// DELETE

module.exports = router;
