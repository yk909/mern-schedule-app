const express = require('express');
const router = express.Router();
const {
    getTrainings,
    createTraining,
    updateTraining,
    deleteTraining
} = require('../controllers/trainingControllers');


router.route('/')
    .get(getTrainings)
    .post(createTraining);

router.route('/:id')
    .put(updateTraining)
    .delete(deleteTraining);


module.exports = router;