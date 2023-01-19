const LicencekeyController = require('../controllers/licencekey.controller');

exports.routesConfig = function (app) {
    app.post('/api/1.0/licensekeys', [
        LicencekeyController.insert
    ]);
	
	app.get('/api/1.0/licensekeys', [
        LicencekeyController.list
    ]);
	app.get('/api/1.0/licensekeys/:customerEmail/:licenceKey', [
        LicencekeyController.validateLicenceKey
    ]);
    // validate licence key while registering and get expiry date and type
	app.get('/api/1.0/licensekeys/:licenceKey', [
        LicencekeyController.validateLicenceKeyOnSignUp
    ]);

    app.post('/api/1.0/custom/licensekeys', [
        LicencekeyController.insertCustom
    ]);

    app.post('/api/1.0/getListOfLicenceKeys', [
        LicencekeyController.getListOfLicenceKeys
    ]);

    app.post('/api/1.0/addLicenceKeysFromUI', [
        LicencekeyController.addLicenceKeysFromUI
    ]);

    app.post('/api/1.0/editLicenceKeysFromUI', [
        LicencekeyController.editLicenceKeysFromUI
    ]);

    app.post('/api/1.0/deleteLicenceKeyFromUI', [
        LicencekeyController.deleteLicenceKeyFromUI
    ]);
};
