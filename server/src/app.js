import express from 'express';
import cors from 'cors';
import {MongoClient} from 'mongodb';
import {uri} from './creds.js';
import {jsonParser, urlencodedParser} from './helpers/bodyParserMiddleware.js';
import todosRoutes from "./routes/todos.routes.js";

// Establishing server
export const app = express();

// insert body-parser
app.use(jsonParser);
app.use(urlencodedParser);

// CORS
app.use(cors({origin: '*'}));

// Images
app.use('/images', express.static('./images/'))

// Routes
app.use(todosRoutes)


const PORT = process.env.PORT || 8000;
// Connecting MongoDB and running server
MongoClient.connect(uri, {useUnifiedTopology: true})
	.then(() => {
		console.log('Connected to database');
		app.listen(PORT, () => {
			console.log('Server listening on port 3000');
		});
	})
	.catch((err) => {
		console.error(err);
	});
