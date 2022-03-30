const express = require('express');
const empresaControlador = require('../controllers/empresas.controller');

const api = express.Router();
api.post('/agregarE', empresaControlador.AgregarEmpresa);
api.put('/editarE/:idEmpresa', empresaControlador.EditarEmpresa);
api.delete('/eliminarE/:idEmpresa', empresaControlador.EliminarEmpresa);
api.get('/encontrarE', empresaControlador.BuscarEmpresa);Lo

module.exports = api;