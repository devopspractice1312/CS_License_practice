const CustomerController = require('../controllers/customer.controller');

exports.routesConfig = function (app) {
    app.post('/api/1.0/customers', [
        CustomerController.insert
    ]);
	
	app.get('/api/1.0/customers', [
        CustomerController.list
    ]);

    app.get('/api/1.0/customers/:email', [
        CustomerController.getByEmail
    ]);

    app.put('/api/1.0/customers/:email', [
        CustomerController.update
    ]);

    app.post('/api/1.0/customers/checklicense', [
        CustomerController.checkLicense
    ]);

    app.post('/api/1.0/customers/checkLicense2', [
        CustomerController.checkLicense2
    ]);
    
};
