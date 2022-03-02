const citiesStates = require('../cidades-estados.json');

function finalizePurchase(req, res) {
    console.log(req.body);
    res.send('ok');
}

function getCitiesByState(req, res) {
    const abbreviationState = req.params['abbreviationState'].toUpperCase();
    const dataState = citiesStates.states.filter(state => state.abbreviation === abbreviationState)
    if (dataState.length === 0) {
        res.status(404).json({ error: `${abbreviationState} não é um estado válido.` });
    }
    res.json(dataState[0].cities);
}

module.exports = {
    finalizePurchase,
    getCitiesByState
}