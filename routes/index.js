var db = require('../database.js');

exports.index = function(req, res){
  db.works.find(function(err,docs) {
    if(!docs) {
      console.log('Error' + err);
      return;
    }
    if ( docs.length === 0 ) {
      // Initialize database with basic data
      // Only used once: the first time the application is started.
      // And used only if the database hasn't data yet
      console.log('Populating database with initial info');
      populateDB();
    }

    res.render('index', { title: 'Jonathan Alvarez G. - Frontend Developer' });

});
};

var populateDB = function() {
  var works = [
    {
      name : "Ubicar Satelital",
      desc : "Ubicar satelital proporciona un amplio portafolio de posibilidades para controlar su vehículo (carga o pasajeros) entregándole a sus clientes mucho más que un sistema de posicionamiento global.",
      task : "Design and development",
      pic  : "/public/img/works/land-ubicar.png"
    },

    {
      name : "Invertir Mejor",
      desc : "Invertir Mejor es fundada en 2004 por Juan Diego Gómez Gómez con una visión concreta: convertirse en un referente de alta calidad en lo que tiene que ver con educación financiera e inversiones por medio de Internet.",
      task : "Frontend and backend development",
      pic  : "/public/img/works/land-invertirmejor.png"
    }
  ];

  db.works.insert(works, function(err, doc){});
}
