const { getAllPlanets } = require('../models/planetModel');

function httpGetAllPlanets(req, res) {
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
};