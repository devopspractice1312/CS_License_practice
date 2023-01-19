const db = require('../models');
const { Op } = require("sequelize");
const moment = require("moment");
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateProductKey() {
	var tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var chars = 5;
	var segments = 5;
	var keyString = "";

	for (var i = 0; i < segments; i++) {
		var segment = "";

		for (var j = 0; j < chars; j++) {
			var k = getRandomInt(i, 35);
			segment += tokens[k];
		}

		keyString += segment;

		if (i < (segments - 1)) {
			keyString += "-";
		}
	}
	return keyString;

}

exports.insert = async (req, res) => {
	try {
		const { company_name, count, expiry_mode, expiry_date } = req.body;
		if (parseInt(count) == 0) {
			throw new Error(`Please enter the number of keys you want to generate.please pass perameter 'count' with number of keys you want to geneter.`)
		};
		if (!expiry_mode) {
			throw new Error(`Please select expire in mode.Please pass perameter 'expiry_mode' with any of these value like 1M, 6M, 1Y or custom`)
		};
		var dataObj = {
			company_name: company_name,
			expiry_mode: expiry_mode,
			expiry_date: new Date(),
			expires_in: 0,
			locked: false
		};
		var todayDate = moment();
		if (expiry_mode == 'custome') {
			if (!expiry_date) {
				throw new Error(`Please select expire date.please pass perameter 'expiry_date' with date format 'YYYY-MM-DD'`)
			};
			var selectedDate = moment(expiry_date);
			dataObj.expires_in = moment.duration(selectedDate.diff(todayDate)).days();
			dataObj.expiry_date = new Date(expiry_date);
		};
		if (expiry_mode == '1M' || expiry_mode == '6M' || expiry_mode == '1Y') {
			if (expiry_mode == '1M') {
				dataObj.expiry_date = new Date(moment().add(1, 'M').format('YYYY-MM-DD'));
				dataObj.expires_in = 1
			};
			if (expiry_mode == '6M') {
				dataObj.expiry_date = new Date(moment().add(6, 'M').format('YYYY-MM-DD'));
				dataObj.expires_in = 6
			};
			if (expiry_mode == '1Y') {
				dataObj.expiry_date = new Date(moment().add(1, 'y').format('YYYY-MM-DD'));
				dataObj.expires_in = 1
			};
		};
		if (count > 1000)
			count = 1000;
		if (count > 1) {
			var data = [];
			for (var index = 1; index <= count; index++) {
				let obj = {};
				obj = { ...dataObj };
				let key = '';
				key = generateProductKey();
				obj['key'] = key;
				data.push(obj);
			}
			db.licensekey.bulkCreate(data)
			res.status(200).send(data);
		} else {
			dataObj['key'] = generateProductKey();
			db.licensekey.create(dataObj)
				.then((licencekey) => res.send({ licencekey: licencekey.key }))
				.catch((err) => {
					console.log('***There was an error creating a licencekey', err)
					return res.status(200).send({ error: true, message: err.message })
				})
		}
	} catch (error) {
		return res.status(200).send({ error: true, message: error.message })
	}
};
exports.assignKeyToUser
exports.list = async (req, res) => {
	let contacts = await db.licensekey.findAll({ attributes: ['key', 'locked'] })
		.catch((err) => {
			console.log('***There was an error querying licencekeys', err)
			return res.status(200).send({ error: true, message: err.message });
		});
	res.send(contacts);
};

exports.insertCustom = async (req, res) => {
	try {
		const { licencekey, company_name, count, expiry_mode, expiry_date } = req.body;
		if (parseInt(count) == 0) {
			throw new Error(`Please enter the number of keys you want to generate.please pass perameter 'count' with number of keys you want to geneter.`)
		};
		if (!expiry_mode) {
			throw new Error(`Please select expire in mode.Please pass perameter 'expiry_mode' with any of these value like 1M, 6M, 1Y or custom`)
		};
		var dataObj = {
			company_name: company_name,
			expiry_mode: expiry_mode,
			expiry_date: new Date(),
			expires_in: 0,
			key: licencekey,
			locked: false
		};
		var todayDate = moment();
		if (expiry_mode == 'custome') {
			if (!expiry_date) {
				throw new Error(`Please select expire date.please pass perameter 'expiry_date' with date format 'YYYY-MM-DD'`)
			};
			var selectedDate = moment(expiry_date);
			dataObj.expires_in = moment.duration(selectedDate.diff(todayDate)).days();
			dataObj.expiry_date = new Date(expiry_date);
		};
		if (expiry_mode == '1M' || expiry_mode == '6M' || expiry_mode == '1Y') {
			if (expiry_mode == '1M') {
				dataObj.expiry_date = new Date(moment().add(1, 'M').format('YYYY-MM-DD'));
				dataObj.expires_in = 1
			};
			if (expiry_mode == '6M') {
				dataObj.expiry_date = new Date(moment().add(6, 'M').format('YYYY-MM-DD'));
				dataObj.expires_in = 6
			};
			if (expiry_mode == '1Y') {
				dataObj.expiry_date = new Date(moment().add(1, 'y').format('YYYY-MM-DD'));
				dataObj.expires_in = 1
			};
		};
		db.licensekey.create(dataObj)
			.then((licencekey) => res.send({ licencekey: licencekey.key }))
			.catch((err) => {
				console.log('***There was an error creating a licencekey', err)
				return res.status(200).send({ error: true, message: err.message })
			})
	} catch (error) {
		return res.status(200).send({ error: true, message: error.message })
	}
};

exports.validateLicenceKey = async (req, res) => {
	const { customerEmail, licenceKey } = req.params;
	if (!customerEmail || !licenceKey) return res.send({ error: true, message: "customerEmail or licenceKey is missing on params" })
	try {

		const customerDetail = await db.customer.findOne({ raw: true, where: { email: customerEmail } });
		if (!customerDetail) return res.send({ error: true, message: "No customer found" });
		if (customerDetail.licencekey === licenceKey) {
			// key matched
			const licenceDetail = await db.licensekey.findOne({ raw: true, where: { key: customerDetail.licencekey } });
			if (!licenceDetail) return res.send({ error: true, message: "No licence key found" });
			// decode key and get expiry month
			return res.send({ error: false, licence: { locked: licenceDetail.locked, key: licenceDetail.licenceDetail } })
		}
	} catch (error) {
		console.log('error', error);
		res.status(503).send({ error: true, message: error })
	}
}
exports.validateLicenceKeyOnSignUp = async (req, res) => {
	const { licenceKey } = req.params;
	if (!licenceKey) return res.send({ error: true, message: "licenceKey is missing on params" })
	try {
		const licenceDetail = await db.licensekey.findOne({ raw: true, where: { key: licenceKey } });
		if (!licenceDetail) return res.status(404).send("Invalid licence key");
		let { locked, key, expires_in } = licenceDetail;
		return res.send({ error: false, licence: { locked, key, expires_in } })
	} catch (error) {
		console.log('error', error);
		res.status(503).send({ error: true, message: error })
	}
}

exports.getListOfLicenceKeys = async (req, res) => {
	try {
		var condition = {
			attributes: ['expiry_mode', 'expiry_date', 'company_name', 'key', 'expires_in', 'createdAt', 'updatedAt', 'id'],
			limit: req.body.limit,
			offset: req.body.skip,
		};
		if (Object.keys(req.body.condition).length > 0) {
			if (req.body.condition.key && req.body.condition.company_name) {
				condition['where'] = {
					[Op.and]: [
						{ key: { [Op.regexp]: req.body.condition.key } },
						{ company_name: { [Op.regexp]: req.body.condition.company_name } },
					]
				};
			};
			if (req.body.condition.key && !req.body.condition.company_name) {
				condition['where'] = {
					key: { [Op.regexp]: req.body.condition.key }
				}
			};
			if (req.body.condition.company_name && !req.body.condition.key) {
				condition['where'] = {
					company_name: { [Op.regexp]: req.body.condition.company_name }
				}
			};
			if (req.body.condition.id) {
				condition['where'] = {
					id: req.body.condition.id
				}
			}
		};
		if (req.body.sort.length > 0) {
			condition['order'] = req.body.sort;
		} else {
			condition['order'] = [['createdAt', 'DESC']]
		};
		let licenceKeys = await db.licensekey.findAll(condition)
			.catch((err) => {
				console.log('***There was an error querying licencekeys', err)
				return res.status(200).send({ error: true, message: err.message });
			});
		let totalLicenceKeys = licenceKeys.length;
		if (Object.keys(req.body.condition).length === 0) {
			var totalLicenceKey = await db.licensekey.findAll({ attributes: ['expiry_mode', 'expiry_date', 'company_name', 'key', 'expires_in', 'createdAt', 'updatedAt', 'id'], })
				.catch((err) => {
					console.log('***There was an error querying licencekeys', err)
					return res.status(200).send({ error: true, message: err.message });
				});
			totalLicenceKeys = totalLicenceKey.length;
		};
		let result = {
			code: 200,
			message: 'Data found.',
			items: licenceKeys,
			total_count: totalLicenceKeys
		};
		res.send(result);
	} catch (error) {
		let result = {
			code: 404,
			message: error.message ? error.message : 'Data found.',
			items: [],
			total_count: 0
		};
		res.status(404).send(result);
	};
};

exports.addLicenceKeysFromUI = async (req, res) => {
	try {
		const { company_name, count, expiry_mode, expiry_date } = req.body;

		if (parseInt(count) == 0) {
			throw new Error(' Please enter the number of keys you want to generate.')
		};
		if (!expiry_mode) {
			throw new Error('Please select expire in mode.')
		};
		var dataObj = {
			company_name: company_name,
			expiry_mode: expiry_mode,
			expiry_date: new Date(),
			expires_in: 0,
			locked: false
		};
		var todayDate = moment();
		if (expiry_mode == 'custome') {
			if (!expiry_date) {
				throw new Error('Please select expire date.')
			};
			var selectedDate = moment(expiry_date);
			dataObj.expires_in = moment.duration(selectedDate.diff(todayDate)).days();
			dataObj.expiry_date = new Date(expiry_date);
		};
		if (expiry_mode == '1M' || expiry_mode == '6M' || expiry_mode == '1Y') {
			if (expiry_mode == '1M') {
				dataObj.expiry_date = new Date(moment().add(1, 'M').format('YYYY-MM-DD'));
				dataObj.expires_in = 1
			};
			if (expiry_mode == '6M') {
				dataObj.expiry_date = new Date(moment().add(6, 'M').format('YYYY-MM-DD'));
				dataObj.expires_in = 6
			};
			if (expiry_mode == '1Y') {
				dataObj.expiry_date = new Date(moment().add(1, 'y').format('YYYY-MM-DD'));
				dataObj.expires_in = 1
			};
		};
		if (count > 1000)
			count = 1000;
		if (count > 1) {
			var data = [];
			for (var index = 1; index <= count; index++) {
				let obj = {};
				obj = { ...dataObj };
				let key = '';
				key = generateProductKey();
				obj['key'] = key;
				data.push(obj);
			}
			db.licensekey.bulkCreate(data)
			res.status(200).send({ code: 200, message: 'Successfully added.', data: data });
		} else {
			dataObj.key = generateProductKey();
			db.licensekey.create(dataObj)
				.then((licencekey) => {
					return res.status(200).send({ code: 200, message: 'Successfully added.', data: licencekey })
				}).catch((error) => {
					console.log('***There was an error creating a licencekey', error)
					return res.status(400).send({ code: 404, message: error.message ? error.message : 'Something went wrong.Please try again.' })
				})
		}
	} catch (error) {
		res.status(404).send({ code: 404, message: error.message ? error.message : 'Something went wrong.Please try again.' })
	}
};

exports.editLicenceKeysFromUI = async (req, res) => {
	try {
		const { id, key, company_name, expiry_mode, expiry_date } = req.body;
		if (!id) {
			throw new Error('Please provide record id.')
		};
		if (!id) {
			throw new Error('Please provide key.')
		};
		var condition = {
			attributes: ['expiry_mode', 'expiry_date', 'company_name', 'key', 'expires_in', 'createdAt', 'updatedAt', 'id'],
			where: {
				[Op.and]: [
					{ id: id },
					{ key: key },
				]
			}
		};
		let licenceKeys = await db.licensekey.findAll(condition)
			.catch((err) => {
				console.log('***There was an error querying licencekeys', err)
				return res.status(404).send({ code: 404, message: err.message ? err.message : 'Key Details not found.Please try again.' });
			});
		if (licenceKeys.length === 0) {
			throw new Error('Key Details not found.Please try again.')
		} else {
			if (!expiry_mode) {
				throw new Error('Please select expire in mode.')
			};
			var dataObj = {
				company_name: company_name,
				expiry_mode: expiry_mode,
				expiry_date: new Date(),
				expires_in: 0,
				locked: false
			};
			var todayDate = moment();
			if (expiry_mode == 'custome') {
				if (!expiry_date) {
					throw new Error('Please select expire date.')
				};
				var selectedDate = moment(expiry_date);
				dataObj.expires_in = moment.duration(selectedDate.diff(todayDate)).days();
				dataObj.expiry_date = new Date(expiry_date);
			};
			if (expiry_mode == '1M' || expiry_mode == '6M' || expiry_mode == '1Y') {
				if (expiry_mode == '1M') {
					dataObj.expiry_date = new Date(moment().add(1, 'M').format('YYYY-MM-DD'));
					dataObj.expires_in = 1
				};
				if (expiry_mode == '6M') {
					dataObj.expiry_date = new Date(moment().add(6, 'M').format('YYYY-MM-DD'));
					dataObj.expires_in = 6
				};
				if (expiry_mode == '1Y') {
					dataObj.expiry_date = new Date(moment().add(1, 'y').format('YYYY-MM-DD'));
					dataObj.expires_in = 1
				};
			};
			var updatedData = await db.licensekey.update(dataObj, { where: { id: id } }).catch((error) => {
				return res.status(302).send({ code: 302, message: error.message ? error.message : 'Error while updating the key.Please try again.' });
			});
			return res.status(200).send({ code: 200, message: 'Successfully updated.', data: updatedData })
		}
	} catch (error) {
		console.log('errror ===>', error);
		return res.status(404).send({ code: 404, message: error.message ? error.message : 'Something went wrong.Please try again.' })
	}
};

exports.deleteLicenceKeyFromUI = async (req, res) => {
	try {
		const { id, key } = req.body;
		if (!id) {
			throw new Error('Please provide record id.')
		};
		if (!id) {
			throw new Error('Please provide key.')
		};
		var condition = {
			attributes: ['expiry_mode', 'expiry_date', 'company_name', 'key', 'expires_in', 'createdAt', 'updatedAt', 'id'],
			where: {
				[Op.and]: [
					{ id: id },
					{ key: key },
				]
			}
		};
		let licenceKeys = await db.licensekey.findAll(condition)
			.catch((err) => {
				console.log('***There was an error querying licencekeys', err)
				return res.status(404).send({ code: 404, message: err.message ? err.message : 'Key Details not found.Please try again.' });
			});
		if (licenceKeys.length === 0) {
			throw new Error('Key Details not found.Please try again.')
		} else {
			var deleteRecord = await db.licensekey.destroy({ where: { id: id } }).catch((error) => {
				return res.status(302).send({ code: 302, message: error.message ? error.message : 'Error while deleting the key.Please try again.' });
			});
			return res.status(200).send({ code: 200, message: 'Successfully deleted.', data: deleteRecord })
		}
	} catch (error) {
		console.log('errror ===>', error);
		return res.status(404).send({ code: 404, message: error.message ? error.message : 'Something went wrong.Please try again.' })
	}
}