const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const LicencekeyRouter = require('./routes/licencekey.routes');
const CustomerRouter = require('./routes/customer.routes');
const BrandingRouter = require('./routes/branding.routes');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

LicencekeyRouter.routesConfig(app);
CustomerRouter.routesConfig(app);
BrandingRouter.routesConfig(app);

app.use('/branding', express.static('public'));

app.get('/api/1.1/licencekeys', (req, res) => {
  return res.status(200).send({error: true, message: 'aaaaaa' })
}); 
app.get('/', (req, res) => {
  return res.status(404).send({error: true, message: 'licence management' })
}); 

app.listen(port, () => {
  console.log('Server is up on port 3000');
});
