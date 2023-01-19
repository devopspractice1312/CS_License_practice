const BrandingController = require('../controllers/branding.controller');

exports.routesConfig = function (app) {
	app.get('/api/1.0/branding', [
        BrandingController.list
    ]);

    app.get('/api/1.0/branding/:email', [
        BrandingController.getByEmail
    ]);
};
