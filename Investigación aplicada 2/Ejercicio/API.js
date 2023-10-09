const express = require('express');
const app = express();
const PORT = 4000;
const axios = require('axios');

app.use(express.json());

let inscripciones = [];

//cada carrera debe tener registrada la información de 10 materias de su respectivo pensum.
const pensumTecnico = [
    {
      codigo: "ALG501",
      creditos: 4,
      nombre: "Álgebra Vectorial y Matrices",
      requisitos: ["Bachillerato"],
      ciclo: 1,
    },
    {
      codigo: "ANF231",
      creditos: 3,
      nombre: "Antropología Filosófica",
      requisitos: ["Bachillerato"],
      ciclo: 1,
    },
    {
      codigo: "LME404",
      creditos: 4,
      nombre: "Lenguajes de Marcado y Estilo Web",
      requisitos: ["Bachillerato"],
      ciclo: 1,
    },
    {
      codigo: "PAL404",
      creditos: 4,
      nombre: "Programación de Algoritmos",
      requisitos: ["Bachillerato"],
      ciclo: 1,
    },
    {
      codigo: "REC404",
      creditos: 4,
      nombre: "Redes de Comunicación",
      requisitos: ["Bachillerato"],
      ciclo: 1,
    },
    {
      codigo: "ASB404",
      creditos: 4,
      nombre: "Análisis y Diseño de Sistemas y Base de Datos",
      requisitos: ["PAL404"],
      ciclo: 2,
    },
    {
      codigo: "DAW404",
      creditos: 4,
      nombre: "Desarrollo de Aplic. Web con Soft. Interpret. en el Cliente",
      requisitos: ["LME404"],
      ciclo: 2,
    },
    {
      codigo: "DSP404",
      creditos: 4,
      nombre: "Desarrollo de Aplicaciones con Software Propietario",
      requisitos: ["PAL404"],
      ciclo: 2,
    },
    {
      codigo: "POO404",
      creditos: 4,
      nombre: "Programación Orientada a Objetos",
      requisitos: ["PAL404"],
      ciclo: 2,
    },
    {
      codigo: "PSC231",
      creditos: 3,
      nombre: "Pensamiento Social Cristiano",
      requisitos: ["Bachillerato"],
      ciclo: 2,
    },
  ]



  const pensumIngenieria = [
    {
      codigo: "CAD941",
      creditos: 4,
      nombre: "Cálculo Diferencial",
      requisitos: ["Bachillerato"],
      ciclo: 1,
    },
    {
      codigo: "AVM941",
      creditos: 4,
      nombre: "Álgebra Vectorial y Matrices",
      requisitos: ["Bachillerato"],
      ciclo: 1,
    },
    {
      codigo: "CVV941",
      creditos: 4,
      nombre: "Cálculo de Varias Variables",
      requisitos: ["5,6"],
      ciclo: 1,
    },
    {
      codigo: "QUG941",
      creditos: 4,
      nombre: "Química General",
      requisitos: ["Bachillerato"],
      ciclo: 1,
    },
    {
      codigo: "CA1941",
      creditos: 4,
      nombre: "Cálculo Integral",
      requisitos: ["1"],
      ciclo: 1,
    },
    {
      codigo: "EYM941",
      creditos: 4,
      nombre: "Electricidad y Magnetismo",
      requisitos: ["2,6,7"],
      ciclo: 2,
    },
    {
      codigo: "EOE901",
      creditos: 4,
      nombre: "Expresión Oral y Escrita",
      requisitos: ["Bachillerato"],
      ciclo: 2,
    },
    {
      codigo: "CDP941",
      creditos: 4,
      nombre: "Cinemática y Dinámica de Partículas",
      requisitos: ["1"],
      ciclo: 2,
    },
    {
      codigo: "ESA941",
      creditos: 4,
      nombre: "Estadística Aplicada",
      requisitos: ["6"],
      ciclo: 2,
    },
    {
      codigo: "PRE941",
      creditos: 4,
      nombre: "Programación Estructurada",
      requisitos: ["Bachillerato"],
      ciclo: 2,
    }
  ];

// Rutas para obtener información de los pensum

//La API debe manejar la información de los pensum de las carrera del técnico en ingeniería en computación y la carrera de ingeniería en computación de la UDB


//http://localhost:4000/pensum/tecnico
app.get('/pensum/tecnico', (req, res) => {
  res.json(pensumTecnico);
});
//http://localhost:4000/pensum/ingenieria
app.get('/pensum/ingenieria', (req, res) => {
  res.json(pensumIngenieria);
});

//Deberá haber una ruta para consulta de prerrequisitos de una materia por código.

//http://localhost:4000/prerrequisitos/CDP941
app.get('/prerrequisitos/:codigo', (req, res) => {
  const codigoMateria = req.params.codigo;
  const materiaEnTecnico = pensumTecnico.find(materia => materia.codigo === codigoMateria);
  const materiaEnIngenieria = pensumIngenieria.find(materia => materia.codigo === codigoMateria);
  if (materiaEnTecnico) {
    res.json(materiaEnTecnico.requisitos);
  } else if (materiaEnIngenieria) {
    res.json(materiaEnIngenieria.requisitos);
  } else {
    res.status(404).json({ mensaje: 'Materia no encontrada' });
  }
});

//Deberá crear un ruta para consulta de materias por ciclo.

//http://localhost:4000/materias/1 
app.get('/materias/:ciclo', (req, res) => {
  const ciclo = req.params.ciclo;
  const materiasTecnico = pensumTecnico.filter(materia => materia.ciclo === Number(ciclo));
  const materiasIngenieria = pensumIngenieria.filter(materia => materia.ciclo === Number(ciclo));
  const materias = [...materiasTecnico, ...materiasIngenieria];
  res.json(materias);
});


//Crear una ruta para inscripción de materia por carrera seleccionada, debe de validar que cumpla con la cantidad de UV requeridas, y permita inscribir 4 materias desde esa ruta.
//Aun que directa mente con e navegador no puede porque en navegador solo se utiliza GET a través de la barra de direcciones, , pero no puedes enviar datos mediante solicitudes POST 
//o realizar solicitudes DELETE directamente desde la barra de direcciones del navegador. Asi que para interactuar con rutas que requieren solicitudes POST o DELETE,
// se debe utilizar herramientas de desarrollo como Postman, Insomnia, pero de que funciona funciona
app.post('/realizarInscripcion', (req, res) => {
  const { carrera, materias } = req.body;
  const creditosNecesarios = creditosRequeridosPorCarrera(carrera);
  const creditosInscritos = calcularCreditos(materias);

  if (creditosInscritos > creditosNecesarios) {
    return res.status(400).json({ mensaje: 'Exceso de créditos' });
  }

  if (materias.length > 4) {
    return res.status(400).json({ mensaje: 'Límite de materias excedido' });
  }

  const materiasNoCumplenPrerrequisitos = materias.filter(materia => {
    const prerrequisitos = obtenerPrerrequisitos(materia.codigo);
    return prerrequisitos.some(prerrequisito => !materias.includes(prerrequisito));
  });

  if (materiasNoCumplenPrerrequisitos.length > 0) {
    return res.status(400).json({ mensaje: 'No se cumplen los prerrequisitos' });
  }

  inscripciones.push({ carrera, materias });
  res.json({ mensaje: 'Inscripción exitosa' });
});


//Crear ruta para eliminar inscripciones de materias.
//Aun que directa mente con e navegador no puede porque en navegador solo se utiliza GET a través de la barra de direcciones, , pero no puedes enviar datos mediante solicitudes POST 
//o realizar solicitudes DELETE directamente desde la barra de direcciones del navegador. Asi que para interactuar con rutas que requieren solicitudes POST o DELETE,
// se debe utilizar herramientas de desarrollo como Postman, Insomnia, pero de que funciona funciona
app.delete('/eliminarInscripcion/:inscripcionId', (req, res) => {
  const inscripcionId = req.params.inscripcionId;
  const inscripcionIndex = inscripciones.findIndex(inscripcion => inscripcion.id === inscripcionId);

  if (inscripcionIndex !== -1) {
    inscripciones.splice(inscripcionIndex, 1);
    res.json({ mensaje: 'Inscripción eliminada correctamente' });
  } else {
    res.status(404).json({ mensaje: 'Inscripción no encontrada' });
  }
});

function creditosRequeridosPorCarrera(carrera) {
  if (carrera === 'tecnico') {
    return 120;
  } else if (carrera === 'ingenieria') {
    return 150;
  } else {
    return 0;
  }
}

function obtenerPrerrequisitos(codigoMateria) {
  const materia = pensumTecnico.find(m => m.codigo === codigoMateria);
  return materia ? materia.requisitos : [];
}

  app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
  });