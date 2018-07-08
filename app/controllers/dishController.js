'use strict';
const co = require('co'),
    dishModel = require('../models/dish');

module.exports = function (app) {
    app.post('/dish/insert', function (req, res) {
        co(function* () {
            const resSave = yield saveDish(req.body);
            res.status(200).send(resSave);
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });

    });
    app.get('/dish/listing', function (req, res) {
        co(function* () {
            const objRes = {};
            const arrDish = yield dishModel.find({}).exec();
            objRes.status = 200;
            objRes.data = arrDish;
            objRes.message = 'Dish Listing found';
            res.status(200).send(objRes);
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });
    });
};

const saveDish = function* (req) {
    let objRes = {};
    const price = parseInt(req.price, 10);
    const reqJson = {
        price: price,
        dishName: req.dishName,
        shortName: req.shortName
    };
    let newDish = dishModel(reqJson);
    newDish.save();
    objRes.status = 200;
    objRes.data = [];
    objRes.message = 'Dish added successfully';
    return objRes;
};