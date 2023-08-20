const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    console.log("GET request");
    const queryText = `SELECT * FROM todo ORDER BY id, id ASC;`;
    pool.query(queryText)
        .then ((result) => {
            console.log(`Got stuff back from database`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
})

// POST
router.post('/', (req, res) => {
    const queryText = `INSERT INTO "todo" ("activity") VALUES ($1);`;
    pool.query(queryText, [req.body.activity])
    .then((result) => {
        console.log(`Added activity to the database`);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500); // Good server always responds
    })
})


// PUT

// DELETE

module.exports = router;
