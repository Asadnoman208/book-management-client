import Joi from 'joi';

export const registrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().label('Username'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string().min(6).required().label('Password'),
    confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm Password')
        .messages({ 'any.only': 'Confirm Password does not match' }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string().min(6).required().label('Password'),
});


export const bookSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required.',
    }),
    author: Joi.string().required().messages({
        'string.empty': 'Author is required.',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required.',
    }),
    genre: Joi.string().required().messages({
        'string.empty': 'Genre is required.',
    }),
    publishedYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required().messages({
        'number.base': 'Published Year must be a number.',
        'number.min': `Published Year cannot be before 1900.`,
        'number.max': `Published Year cannot be in the future.`,
        'number.empty': 'Published Year is required.',
    }),
});