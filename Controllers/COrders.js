var mongoose = require('mongoose');
var Orders = mongoose.model('Orders');

  //GET - Return all Users in the DB
  exports.findAllOrders = function(req, res) {
  	console.log(Orders);
  	Orders.find(function(err, orders) {
  		console.log(orders);
  		if(!err) {
  			res.send(orders);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a User with specified ID
  exports.findOrdersById = function(req, res) {
      Orders.findById(req.params.id,function(err, orders) {
      if(!err) {
        res.send(orders);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a User with specified UserName
  /*exports.findUserByNomUsu = function(req, res) {
    //Orders.findById(req.param.id, function(err, guia) {
      Orders.find({NomUsu:req.params.NomUsu},function(err, orders) {
      console.log(req.params);
      if(!err) {
        res.send(orders);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };*/

  //POST - Insert a new User in the DB
  exports.addOrders = function(req, res) {
    console.log('POST');
    console.log(req.body);

    try
    {
        var orders = new Orders({
            OrdenNumber: String,
            User: {
                Id: req.body.Id,
                Name: req.body.Name,
                PersonalId: req.body.PersonalId,
                TelephoneNumber: req.body.TelephoneNumber,
            },
            Products: req.body.Products,
            Geo:{
                Lat: req.body.Lat,
                Long: req.body.Long,
                Country: req.body.Country,
                Province: req.body.Province,
                City: req.body.City
            },
            PaymentType: req.body.PaymentType,
            InfoControl: req.body.InfoControl,
            State: req.body.State
      });

      orders.save(function(err) {
        if(!err) {
          console.log('Event Type "'+ req.body.Name +'" Created Succefull');
        } else {
          console.log('ERROR: ' + err);
        }
      });

      res.send(orders);
    }
    catch(error)
    {
      console.log(error);
    }
    
  };

  //PUT - Update a User already exists
  exports.updateOrders = function(req, res)
  {
      Orders.findById(req.params.id, function (err, orders) {
          orders.OrdenNumber = String,
          orders.User = req.body.User,
          orders.Products = req.body.Products,
          orders.Geo = req.body.Geo,
          orders.PaymentType = req.body.PaymentType,
          orders.InfoControl = req.body.InfoControl,
          orders.State = req.body.State

      orders.save(function(err) {
        if(!err) 
        {
          console.log('Evnet Type "'+ req.body.Name +'" Updated Succefull');
        }
        else
        {
          console.log('ERROR: ' + err);
        }

        res.send(orders);
      });
    });
  };

  //DELETE - Delete a User with specified ID
  exports.deleteOrders = function(req, res) {
    Orders.findById(req.params.id, function(err, orders) {
      orders.remove(function(err) {
        if(!err) {
      console.log('Event Type Id "'+ req.params.id +'" Removed Succefull');
        } else {
      console.log('ERROR: ' + err);
        }
      })
    });
  }