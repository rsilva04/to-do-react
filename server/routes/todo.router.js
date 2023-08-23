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
        console.log(`Added activity to the database`, result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500); // Good server always responds
    })
})


// PUT
router.put('/complete/:id', (req,res) => {
    let {id} = req.params;
    let {complete} = req.body
    let sqlText = `UPDATE "todo" SET "complete" = NOT "complete" WHERE "id" = $1;`;
    pool.query(sqlText, [id])
    .then((result) => {
        console.log(`Updated stuff in database`, result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making query ${sqlText}`, error);
        res.sendStatus(500);
})
})
router.put('/reset', (req,res) => {
    let {complete} = req.body;
    console.log(req.body);
    let sqlText = `UPDATE "todo" SET "complete" = $1`;
    pool.query(sqlText, [complete])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making query ${sqlText}`, error);
            res.sendStatus(500);
        });
    })


// DELETE
router.delete('/:id', (req, res) => {
    let { id } = req.params;
    const queryText = 'DELETE FROM "todo" WHERE "id" = $1;';
    pool.query(queryText, [id])
    .then((response) => {
        console.log('got stuff from database', response);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Error makign query', error);
        res.sendStatus(500);
    })
})

module.exports = router;
