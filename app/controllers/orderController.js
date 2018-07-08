'use strict';
const orderModel = require('../models/orders'),
    dishModel = require('../models/dish'),
    co = require('co');

module.exports = function (app) {
    app.post('/order/insert', function (req, res) {
        co(function* () {
            const resSave = yield insertOrder(req.body);
            res.status(200).send(resSave);
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });
    });
    app.get('/order/listing', function (req, res) {
        co(function* () {
            const resList = yield orderListing();
            res.status(200).send(resList);
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });
    });
    app.get('/api/getAllDishName', function (req, res) {
        co(function* () {
            const resDishList = yield getAllDishName();
            res.status(200).send(resDishList);
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });

    });
};

const insertOrder = function* (req) {
    let objRes = {};
    const quantity = parseInt(req.quantity, 10);
    const reqJson = {
        quantity: quantity
    };
    const arrDish = yield dishModel.find({ _id: req.dishName }).exec();
    if (arrDish.length === 0) {
        objRes.status = 409;
        objRes.data = [];
        objRes.message = 'No Data found';
        return objRes;
    }
    reqJson.dishId = arrDish[0]._id;
    let newOrder = orderModel(reqJson);
    newOrder.save();
    objRes.status = 200;
    objRes.data = [];
    objRes.message = 'Order placed successfully';
    return objRes;
};

const orderListing = function* () {
    let objRes = {};
    const arrOrder = yield orderModel.find({}).populate([{ path: 'dishId', select: '_id dishName price' }]).exec();
    if (arrOrder.length === 0) {
        objRes.status = 409;
        objRes.data = [];
        objRes.message = 'No Data found';
        return objRes;
    }
    objRes.status = 200;
    objRes.data = arrOrder;
    objRes.message = 'Order listing found';
    return objRes;
};

const getAllDishName = function* () {
    let objRes = {};
    const selectDishName = {
        dishName: 1
    };
    const arrDish = yield dishModel.find({}, selectDishName).exec();
    if (arrDish.length === 0) {
        objRes.status = 409;
        objRes.data = [];
        objRes.message = 'Something went wrong!';
        return objRes;
    }
    objRes.status = 200;
    objRes.data = arrDish;
    objRes.message = 'Dish listing found';
    return objRes;
};