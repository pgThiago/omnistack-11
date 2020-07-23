const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index); // Listar ongs cadastradas
routes.post('/ongs', celebrate({

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })

}), OngController.create); // Cadastrar ongs

routes.get('/profile', celebrate({
    
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index); // Exibe o perfil da ong


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) , IncidentController.index); // Listar incidents


routes.post('/incidents', IncidentController.create); // Criar o id da ong q ta criando um caso
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) , IncidentController.delete);

module.exports = routes;