
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    compress        = require('compression');;

mongoose.connect('mongodb://Prueba:Luiselmejor@ds063170.mongolab.com:63170/dlicors', function (err, res) {
//mongoose.connect('mongodb://localhost/GuiaDB', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
    console.log(res);
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compress());

var MUser     = require('./models/Users')(app, mongoose);
var UsersCtrl = require('./Controllers/CUsers');
var MGeography = require('./models/Geography')(app, mongoose);
var GeographyCtrl = require('./Controllers/CGeography');
var MTPayment = require('./models/PaymentType')(app, mongoose);
var TPaymentCtrl = require('./Controllers/CPaymentType');
var MPlaces = require('./models/Places')(app, mongoose);
var PlacesCtrl = require('./Controllers/CPlaces');
var MStates = require('./models/States')(app, mongoose);
var StatesCtrl = require('./Controllers/CStates');
var MProducts = require('./models/Products')(app, mongoose);
var ProductsCtrl = require('./Controllers/CProducts');
var MOrders = require('./models/Orders')(app, mongoose);
var OrdersCtrl = require('./Controllers/COrders');
var MCategories = require('./models/Categories')(app, mongoose);
var CategoriesCtrl = require('./Controllers/CCategories');



var router = express.Router();
router.get('/', function(req, res) {
  res.send("<h1>Api Rest DLicors With MongoDB running...</h1>");
});

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(router);



// API routes
var usersr = express.Router();

//---------Inicio rutas Users--------------//
usersr.route('/user')
  .get(UsersCtrl.findAllUsers)
  .post(UsersCtrl.addUser);

usersr.route('/user/:id')
  .get(UsersCtrl.findUserById)
  .put(UsersCtrl.updateUser)
  .delete(UsersCtrl.deleteUser);

usersr.route('/userNomUsu/:NomUsu')
  .get(UsersCtrl.findUserByNomUsu);
  
usersr.route('/userByCel/:IdCel')
  .get(UsersCtrl.findUserByCelular);
//----------Fin rutas Users-------------------//


//------------Inicio rutas Geography-----------//
var geography = express.Router();

geography.route('/geography')
  .get(GeographyCtrl.findAllGeography)
  .post(GeographyCtrl.addGeography);

geography.route('/geography/Cities')
  .get(GeographyCtrl.findAllCities);

geography.route('/geography/Countries')
  .get(GeographyCtrl.findAllCountries);

geography.route('/geography/StateProvince')
  .get(GeographyCtrl.findAllStateProvince);

geography.route('/geography/:id')
  .get(GeographyCtrl.findGeographyById)
  .put(GeographyCtrl.updateGeography)
  .delete(GeographyCtrl.deleteTEvent);
//-------------Fin rutas Geography----------------//

//------------Inicio rutas Payment Type-----------//
var tpayment = express.Router();

tpayment.route('/tpayment')
  .get(TPaymentCtrl.findAllTPayment)
  .post(TPaymentCtrl.addTPayment);

tpayment.route('/tpayment/:id')
  .get(TPaymentCtrl.findTPaymentById)
  .put(TPaymentCtrl.updateTPayment)
  .delete(TPaymentCtrl.deleteTPayment);
//-------------Fin rutas Payment Type----------------//

//------------Inicio rutas Places-----------//
var places = express.Router();

places.route('/places')
  .get(PlacesCtrl.findAllPlaces)
  .post(PlacesCtrl.addplaces);

places.route('/places/:id')
  .get(PlacesCtrl.findplacesById)
  .put(PlacesCtrl.updateplaces)
  .delete(PlacesCtrl.deleteplaces);
//-------------Fin rutas Places----------------//


//------------Inicio rutas States-----------//
var states = express.Router();

states.route('/states')
  .get(StatesCtrl.findAllStates)
  .post(StatesCtrl.addStates);

states.route('/states/:id')
  .get(StatesCtrl.findStatesById)
  .put(StatesCtrl.updateStates)
  .delete(StatesCtrl.deleteStates);
//-------------Fin rutas States----------------//

//------------Inicio rutas Products-----------//
var products = express.Router();

products.route('/products')
  .get(ProductsCtrl.findAllProducts)
  .post(ProductsCtrl.addproducts);

products.route('/productsByCity/:City')
  .get(ProductsCtrl.findproductsByCiudad);

products.route('/productsByCity/:City/:Category')
  .get(ProductsCtrl.findproductsByCiudadByCatego);

products.route('/products/:id')
  .get(ProductsCtrl.findproductsById)
  .put(ProductsCtrl.updateproducts)
  .delete(ProductsCtrl.deleteproducts);
//-------------Fin rutas Products----------------//

//------------Inicio rutas Orders-----------//
var orders = express.Router();

orders.route('/orders')
  .get(OrdersCtrl.findAllOrders)
  .post(OrdersCtrl.addOrders);

orders.route('/orders/:id')
  .get(OrdersCtrl.findOrdersById)
  .put(OrdersCtrl.updateOrders)
  .delete(OrdersCtrl.deleteOrders);
//-------------Fin rutas Orders----------------//

//------------Inicio rutas Categories-----------//
var categories = express.Router();

categories.route('/categories')
  .get(CategoriesCtrl.findAllCategories)
  .post(CategoriesCtrl.addcategories);

categories.route('/categories/:id')
  .get(CategoriesCtrl.findcategoriesById)
  .put(CategoriesCtrl.updatecategories)
  .delete(CategoriesCtrl.deletecategories);
//-------------Fin rutas Categories----------------//

app.use('/api',usersr);
app.use('/api',geography);
app.use('/api',tpayment);
app.use('/api',places);
app.use('/api', states);
app.use('/api', products);
app.use('/api', orders);
app.use('/api', categories);

var Port = process.env.PORT || 8888;
app.listen(Port, function() {
  console.log("Node server running on http://localhost:3000. Server IBoleta With MongoDB");
});