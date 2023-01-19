const db = require('../models');

function emailUsername(emailAddress) {
	return emailAddress.split('@')[1];
 }

exports.getByEmail = async (req, res) => {
	console.log('Asks to get all brandings by email');
	
    let brandings = await db.branding.findAll({
        where: {
          email: req.params.email
        }
	})
    .catch((err) => {
		console.log('***There was an error querying brandins by email', err);
		return res.status(200).send({error: true, message: err.message });
	}); 

	if (brandings.length <= 0) {
		console.log(`There isn't brandings for email ${req.params.email}. Check by domain`);
		const domain = emailUsername(req.params.email);
		console.log(`Email domain is ${domain}`);

		brandings = await db.branding.findAll({
			where: {
			  email: domain
			}
		})
		.catch((err) => {
			console.log('***There was an error querying brandins by email', err);
			return res.status(200).send({error: true, message: err.message });
		}); 

		if (brandings.length <= 0) {
			console.log(`There isn't brandings for domain ${domain}. Returns default branding`);
			brandings = await db.branding.findAll({
				where: {
				email: '*'
				}
			})
			.catch((err) => {
				console.log('***There was an error querying brandins by email', err);
				return res.status(200).send({error: true, message: err.message });
			}); 
		}
	}
	
	res.send(brandings[0]);
};

exports.list = async (req, res) => {
	console.log('Asks to get all brandings');
	let brandings = await db.branding.findAll()
	.catch((err) => {
		console.log('***There was an error querying branding', err)
		return res.status(200).send({error: true, message: err.message });
	}); 
	res.send(brandings);
}; 
