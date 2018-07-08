// Routes
module.exports = function (app) {
    /************************************************* APP ROUTES START **************************************/
    /**
     * check user login Session
     * @param {type} req description
     * @param {type} res description
     * @param {type} next description
     */

    //dashboard
    app.get('/', function (req, res) {
        res.render('index');
    });

    /************************************************* ORDER ROUTES START **************************************/
    //insert order Page
    app.get('/order/insert', function (req, res) {
        res.render('orderViews/insertOrder');
    });

    //list all order in table
    app.get('/order/list', function (req, res) {
        res.render('orderViews/listOrder');
    });

    /************************************************* DISH ROUTES START **************************************/
    //list all dish in table
    app.get('/dish/insert', function (req, res) {
        res.render('dishViews/insertDish');
    });
    //insert dish
    app.get('/dish/list', function (req, res) {
        res.render('dishViews/listDish');
    });

    /************************************************* Kitchen Display ROUTES START **************************************/
    //list all kitchen display in table
    app.get('/kitchen/list', function (req, res) {
        res.render('kitchenViews/listKitchen');
    });
};