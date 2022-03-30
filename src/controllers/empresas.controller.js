const Empresa = require('../models/empresas.model');
const bcrypt = require('bcrypt-nodejs');

function AgregarEmpresa (req, res){
    var parametros = req.body;
    var empresaModelo = new Empresa();

    if( parametros.usuario && parametros.nombreEmpresa && parametros.password && parametros.tipoEmpresa) {
        empresaModelo.email = parametros.email;
        empresaModelo.password = parametros.password;
        empresaModelo.rol = 'EMPRESA';
        empresaModelo.tipoEmpresa = parametros.tipoEmpresa;

        bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
            empresaModelo.password = passwordEncriptada;

                 empresaModelo.save((err, empresaGuardada) => {
                       if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
                       if(!empresaGuardada) return res.status(404).send( { mensaje: "Error, no se agrego ninguna empresa"});

                 return res.status(200).send({ empresa: empresaGuardada });
        })
      })
    }
}


function EditarEmpresa (req, res) {
    var idE = req.params.idEmpresa;
    var parametros = req.body;
    
        Empresa.findByIdAndUpdate(idE, parametros, { new: true } ,(err, empresaActualizada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!empresaActualizada) return res.status(404).send( { mensaje: 'Error al editar la empresa'});

        return res.status(200).send({ empresa: empresaActualizada});
    });
}

function EliminarEmpresa(req, res){
    var id = req.params.idEmpresa;
    
    Empresa.findByIdAndDelete(id, (err, empresaEliminada) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!empresaEliminada) return res.status(404).send( { mensaje: 'Error al eliminar la empresa'});

        return res.status(200).send({ empresa: empresaEliminada});
    })
}

function BuscarEmpresa(req, res){
    Empresa.find((err, empresaEncontrada) => {
        if (err) return res.send({ mensaje: "Error: " + err })

        for (let i = 0; i < empresaEncontrada.length; i++) {
            console.log(empresaEncontrada[i].nombre)
        }

        return res.send({ empresa: empresaEncontrada });
    })
}



module.exports = {
    AgregarEmpresa,
    EditarEmpresa,
    EliminarEmpresa,
    BuscarEmpresa
}