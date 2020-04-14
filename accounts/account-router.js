// /api/accounts endpoint

const express = required('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    // list of post
    // select from accounts
    db.select('*').from('accounts').then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'failed to get accounts'})
    })
});

router.get('/:id', (req, res) => {
    // get a post by id
    db('accounts')
        .where({ id: req.params.id})
        .first() // gets the first item on the returned array
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'failed to get a post'});
        })
});

router.post('/', (req, res) => {
    // adds a post
    // insert into posts () values ()
    db('accounts').insert(req.body, 'id') // this will give a warning when using sqlite, I can ignore it.
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'failed to add a post'})
        })
});

router.put('/:id', (req, res) => {
    //update a post
    const id = req.params.id;
    const changes = req.body;

    db('accounts')
        .where({ id }) // remember to filter or all records will be updated (BAD PANDA!!)
        .update(changes) // could be partial changes, only one column is enough
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "failed to update post"})
        })
});

router.delete('/:id', (req, res) => {
    //remove a post
    const id = req.params.id;
    db('accounts')
        .where({ id }) // remember to filter or all records will be DELETED (BAD PANDA!!)
        .del() // could be partial changes, only one column is enough
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "failed to delete post"})
        })
}); 

module.exports = router;