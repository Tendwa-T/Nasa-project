const express = require('express');
const { getAllPlanets } = require('../../controllers/planetController');

const router = express.Router();

router.get('/planets', getAllPlanets);

module.exports = router;