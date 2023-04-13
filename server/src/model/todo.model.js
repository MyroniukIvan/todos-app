import Joi from "joi";

const todoSchema = Joi.object({
	name: Joi.string().required(),
	done: Joi.boolean().required(),
	image: Joi.string().uri(),
	deadline: Joi.date().iso(),
});

export {todoSchema}
