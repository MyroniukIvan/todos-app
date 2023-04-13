import {MongoClient, ObjectId} from "mongodb";
import {dbName, uri} from "../creds.js";
import {Types} from "mongoose";
import {todoSchema} from "../model/todo.model.js";

const addTodo = async (req, res) => {
	const client = await MongoClient.connect(uri, {useUnifiedTopology: true});
	const todos = client.db(dbName).collection('todos');

	try {
		const { error } = todoSchema.validate(req.body);
		if (error) {
			return res.status(400).send(error.details[0].message);
		}
		const result = await todos.insertOne({...req.body, _id: new Types.ObjectId()});
		res.send(result);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error connecting to database');
	} finally {
		await client.close();
	}
};

const getTodos = async (req, res) => {
	try {
		const client = await MongoClient.connect(uri, {useUnifiedTopology: true});
		const todos = client.db(dbName).collection('todos');
		const result = await todos.find({}).toArray();
		res.send(result);
		await client.close();
	} catch (err) {
		console.error(err);
		res.status(500).send('Error connecting to database');
	}
};

const getTodo = async (req, res) => {
	try {
		const client = await MongoClient.connect(uri, {useUnifiedTopology: true});
		const todos = client.db(dbName).collection('todos');
		const result = await todos.findOne({})
		res.send(result);
		await client.close();
	} catch (err) {
		console.error(err);
		res.status(500).send('Error connecting to database');
	}
};


const addImageToTodo = async (req, res) => {
	const client = await MongoClient.connect(uri, {useUnifiedTopology: true});
	const todos = client.db(dbName).collection('todos');
	const todo = todos.findOne({_id: new ObjectId(req.body.id)});
	if (todo) {
		await todos.updateOne({_id: new ObjectId(req.body.id)}, {
			$set: {
				image: `http://localhost:3000/images/${req.newFileName}`
			}
		})
		res.sendStatus(200);
	} else {
		res.sendStatus(404);
	}
}

const deleteTodoById = async (req, res) => {
	const client = await MongoClient.connect(uri, {useUnifiedTopology: true});
	const db = client.db(dbName);
	const collectionName = 'todos';
	const id = req.params.id;

	try {
		const result = await db.collection(collectionName).deleteOne({_id: new Types.ObjectId(id)});
		res.send(result);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error deleting document');
	}
	await client.close();
};

const updateTodoById = async (req, res) => {
	const client = await MongoClient.connect(uri, {useUnifiedTopology: true});
	const db = client.db(dbName);
	const collectionName = 'todos';
	const id = req.params.id;
	const newTodo = req.body;
	try {
		const result = await db.collection(collectionName).updateOne({_id: new Types.ObjectId(id)}, {$set: newTodo});
		res.send(result);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error updating document');
	}
	await client.close();
};


export {
	getTodos, addTodo, updateTodoById, deleteTodoById, getTodo, addImageToTodo
}
