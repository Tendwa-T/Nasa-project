const express = require('express');
const { httpGetAllPlanets } = require('../../controllers/planetController');

const router = express.Router();

router.get('/', httpGetAllPlanets);

module.exports = router;