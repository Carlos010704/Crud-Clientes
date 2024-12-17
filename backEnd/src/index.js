const { Client } = require('pg');
import app from './app';
import { getConnection } from './database/connection';
import router from './routes/general.routes';

app.listen(app.get('port'));

app.use('/', router);

console.log('Server on http://localhost:' +  app.get('port'));

getConnection();