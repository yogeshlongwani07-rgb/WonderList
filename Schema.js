const Joi = require("joi");

const listingSchema1 = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(10),
        image:Joi.object({
            url:Joi.string().allow('',null),
            filename:Joi.string(),
        }),
    }).required()
});

module.exports = listingSchema1;
