const db = require('../models');

exports.insert = async (req, res) => {
    const { email, licencekey, hardwareid, macaddress, licencetype, finishAt } = req.body;

    let licenceCheck = await db.licensekey.findOne({
        where: {
          key: licencekey
        }
    });

    if (licenceCheck === null || licenceCheck === undefined) {
        return res.status(200).send({error: true, message: 'Licence key is unknown!' })
    }

    let customer = await db.customer.findOne({
        where: {
          licencekey: licencekey, 
        }
    })

    if (customer !== null && customer !== undefined) {
        return res.status(200).send({error: true, message: 'Customer already exists for this license ' + licencekey })
    }

    customer = await db.customer.findOne({
        where: {
          email: email, 
        }
    })

    if (customer !== null && customer !== undefined) {
        return res.status(200).send({error: true, message: 'Customer already exists for this email ' + email })
    }

    db.customer.create({ email, licencekey, hardwareid, macaddress, licencetype, finishAt })
    .then((customer) => res.send(customer))
    .catch((err) => {
        console.log('***There was an error creating a customer', err);
        return res.status(200).send({error: true, message: err.message })
    })
};

exports.list = async (req, res) => {
	let customers = await db.customer.findAll()
	.catch((err) => {
		console.log('***There was an error querying customers', err);
		return res.status(200).send({error: true, message: err.message });
	}); 
	res.send(customers);
}; 

exports.getByEmail = async (req, res) => {
    let customers = await db.customer.findAll({
        where: {
          email: req.params.email
        }
    })
    .catch((err) => {
		console.log('***There was an error querying customers by email', err);
		return res.status(200).send({error: true, message: err.message });
	}); 
	res.send(customers);
};

exports.update = async (req, res) => {

    const { licencekey, hardwareid, macaddress, licencetype, finishAt } = req.body;

    let licenceCheck = await db.licensekey.findOne({
        where: {
          key: licencekey
        }
    });

    if (licenceCheck === null || licenceCheck === undefined) {
        return res.status(200).send({error: true, message: 'Licence key is unknown!' })
    }

    let customerCheck = await db.customer.findOne({
        where: {
            licencekey: licencekey
        }
    });

    if (customerCheck !== null && customerCheck !== undefined) {
        if (customerCheck.email !== req.params.email) {
            return res.status(200).send({error: true, message: 'Wrong license key' })
        }
    }

    db.customer.findOne({
        where: {
          email: req.params.email
        }
    })
    .then((customer) => {
        if (customer === null || customer === undefined) {
            return res.status(200).send({error: true, message: 'No customer with email ' + req.params.email })
        }

        console.log(`finishAt is ${finishAt}`);
        return customer.update({ licencekey, hardwareid, macaddress, licencetype, finishAt })
        .then(() => res.send(customer))
        .catch((err) => {
            console.log('***Error updating customer', err)
            return res.status(200).send({error: true, message: err.message });
        });
    })
    .catch((err) => {
		console.log('***There was an error querying customers by email', err)
		return res.status(200).send({error: true, message: err.message });
	}); 
};

exports.checkLicense = async (req, res) => {
    const { email, licencekey, hardwareid } = req.body;

    var today = new Date();

    let customer = await db.customer.findOne({
        where: {
          email: email,
          licencekey: licencekey, 
          hardwareid: hardwareid
        }
    })

    if (customer === null || customer === undefined) {
        return res.status(200).send({error: true, message: 'Wrong licence' });    
    }

    return res.status(200).send({ customer: customer, currentDate: today.toISOString() });
};

exports.checkLicense2 = async (req, res) => {
    const { emails, hardwareid } = req.body;

    var today = new Date();

    let customer = await db.customer.findOne({
        where: {
          email: emails,
          hardwareid: hardwareid
        }
    })

    if (customer === null || customer === undefined) {
        return res.status(200).send({error: true, message: 'Wrong licence' });    
    }

    return res.status(200).send({ customer: customer, currentDate: today.toISOString() });
};
