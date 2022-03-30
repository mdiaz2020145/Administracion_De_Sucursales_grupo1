const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuariosSchema = new Schema({ 
    usuario: String, 
    nombreEmpresa: String, 
    password: String, 
    rol: String, 
    tipoEmpresa: String }) 
   
module.exports = mongoose.model('empresas', usuariosSchema);