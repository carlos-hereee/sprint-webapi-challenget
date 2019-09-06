const express = require('express');
const User = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res)=> {
    User.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({ error: 'error getting actions'})
    })
})
router.post('/', (req, res) => {
    const actions = req.body;
    User.insert(actions)
    .then(actions => {
        res.status(201).json(actions);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'error inserting actions'})
    })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.remove(id)
    .then(() => {
        res.status(204).end()
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({error: 'error deleting actions'})
    })
});
router.put('/:id', (req, res) => {
    console.log('updating actions')
    const { id } = req.params;
    const { project_id, description, notes, completed  } = req.body;
    User.update(id, { project_id, description, notes, completed })
    .then(updated => {
        // if(updated){
            // User.update(id, {name})
            // .then(user => {
                res.status(200).json(updated);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'error updatig actions'})
            })
        })


module.exports= router;