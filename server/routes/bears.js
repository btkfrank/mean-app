const express = require('express');
const router = express.Router();
const Bear = require('../models/bear');

router.route('/bears')
    // create a bear (accessed at POST http://localhost:3000/api/bears)
    .post((req, res) => {
        let bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(err => {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })
    // get all the bears (accessed at GET http://localhost:3000/api/bears)
    .get((req, res) => {
        Bear.find((err, bears) => {
            if (err)
                res.send(err);

            res.json(bears);
        });
    })
    // get the bear with that id (accessed at GET http://localhost:3000/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    // update the bear with this id (accessed at PUT http://localhost:3000/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:3000/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;