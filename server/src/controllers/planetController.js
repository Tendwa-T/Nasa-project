const { planets } = require('../models/planetModel');

function getAllPlanets(req, res) {
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets
};