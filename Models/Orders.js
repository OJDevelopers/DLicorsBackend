exports = module.exports = function(app, mongoose) {
  var OrdersSchema = new mongoose.Schema({
    OrdenNumber: String,
    User: {
    	Id: String,
    	Name: String,
    	PersonalId: String,
    	TelephoneNumber: String,
    },
    Products: [{
    	Id: String,
    	Name: String,
    	Amount: Number,
    	UnitValue: Number
    }],
    Geo:{
    	Lat: String,
    	Long: String,
    	Country: String,
    	Province: String,
    	City: String
    },
    PaymentType: String,
    InfoControl: 
    [{
      UserCreated: String,
      userModified: String,
      DateCreated: Date,
      DateModified: Date
    }],
    State: String
  });

  mongoose.model('Orders', EventsSchema);
};