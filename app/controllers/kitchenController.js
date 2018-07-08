'use strict';
const orderModel = require('../models/orders'),
    createdTillDishModel = require('../models/createdTillDish'),
    fs = require('fs'),
    co = require('co'),
    csv = require('fast-csv');

module.exports = function (app) {
    app.get('/kitchen/listing', function (req, res) {
        co(function* () {
            const arrOrder = yield orderModel.find({}).populate([{ path: 'dishId', select: '_id dishName price' }]).exec();
            const resSave = yield getCreatedTillDishListing(arrOrder);
            res.status(200).send(resSave);
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });
    });
    app.post('/kitchen/createdTillDish', function (req, res) {
        co(function* () {
            const resSave = yield getCreatedTillDish(req.body);
            res.status(200).send(resSave);
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });
    });
    app.post('/kitchen/addCreatedTillDish', function (req, res) {
        co(function* () {
            const resSave = yield addCreatedTillDish(req.body);
            res.status(200).send(resSave);
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });
    });
    app.get('/downloadExampleFile', function (req, res) {
        co(function* () {
            if (req.query.type === 'report') {
                yield mailOutletRes(res);
            }
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });
    });
};

const getCreatedTillDish = function* (req) {
    let objRes = {};
    const objDishRes = yield createdTillDishModel.find({ dishId: req.dishId }).exec();
    if (objDishRes.length === 0) {
        objRes.status = 200;
        objRes.data = [];
        objRes.message = 'No Dish is created earlier';
        return objRes;
    }
    objRes.status = 200;
    objRes.data = objDishRes;
    objRes.message = 'Dish created earlier';
    return objRes;
};

const addCreatedTillDish = function* (req) {
    let objRes = {};
    let objNew = {};
    const resDishData = yield createdTillDishModel.find({ dishId: req._id }).exec();
    if (resDishData.length === 0) {
        objNew.dishId = req._id;
        objNew.quantity = parseInt(req.quantity);
        objNew.createdTill = parseInt(req.createdTillNow);
        let objNewData = createdTillDishModel(objNew);
        const resSave = objNewData.save();
        objRes.status = 200;
        objRes.data = [];
        objRes.message = 'Created Till Dish added successfully';
        return objRes;
    } else {
        const objCreatedTillDishRes = yield createdTillDishModel.update({ dishId: req._id }, { $set: { createdTill: req.createdTillNow } }).exec();
        objRes.status = 200;
        objRes.data = [objCreatedTillDishRes];
        objRes.message = 'Created Till Dish updated successfully';
        return objRes;
    }
}

const getCreatedTillDishListing = function* (arrOrder) {
    let objRes = {};
    let arrOrderList = [];
    for (let objOrder of arrOrder) {
        const tillNow = yield createdTillDishModel.find({ dishId: objOrder.dishId._id }, { createdTill: 1, dishId: 1 }).exec();
        let obj = {};
        if (tillNow.length > 0) {
            obj = {
                _id: objOrder._id,
                quantity: objOrder.quantity,
                dishId: objOrder.dishId,
                createdTillNow: tillNow[0].createdTill
            };
            arrOrderList.push(obj);
        } else {
            obj = objOrder;
            arrOrderList.push(obj);
        }
    }
    objRes.status = 200;
    objRes.data = arrOrderList;
    objRes.message = 'Order listing found';
    return objRes;
}
const mailOutletRes = function* (res) {
    const arrOrder = yield orderModel.find({}).populate([{ path: 'dishId', select: '_id dishName price' }]).exec();
    const resSave = yield getCreatedTillDishListing(arrOrder);
    var csvStream = csv.createWriteStream({ headers: true });
    var writeableStream = fs.createWriteStream('reports.csv');
    csvStream.pipe(writeableStream);
    for (let objOrderList of resSave.data) {
        let resCSV = {};
        resCSV['Name'] = objOrderList.dishId.dishName;
        resCSV['Quantity'] = objOrderList.quantity;
        resCSV['Created-till-now'] = objOrderList.createdTillNow;
        resCSV['Predicted'] = objOrderList.dishId.price;
        csvStream.write(resCSV);
    }
    csvStream.end();
    writeableStream.on('finish', function () {
        res.setHeader('Content-disposition', 'attachment; filename=reports.csv');
        res.setHeader('Content-type', 'text/csv');
        var filestream = fs.createReadStream('./reports.csv');
        filestream.pipe(res);
    });
}