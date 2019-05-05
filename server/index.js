import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import initializeDb from './database';

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

routes(app);

initializeDb();

app.listen(process.env.PORT, () => {
    console.log(`Server listening on PORT ${process.env.PORT}`);
});