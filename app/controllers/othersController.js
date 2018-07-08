'use strict';

const orderModel = require('../models/orders'),
    dishModel = require('../models/dish'),
    co = require('co');

module.exports = function (app) {
    app.get('/api/count-dashboard-stats', function (req, res) {
        var asyncTaskList = [];
        co(function*(){
            const resOrderCount = yield orderModel.count().exec();
            const resDishCount = yield dishModel.count().exec();
            res.status(200).send([resOrderCount,resDishCount]);
        }).catch((failedRes) => {
            res.status(200).send(failedRes);
        });
    });
};
