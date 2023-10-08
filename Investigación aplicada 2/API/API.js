const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const pensumTecnico = [
    {
      codigo: "ALG501",
      creditos: 4,
      nombre: "Álgebra Vectorial y Matrices",
      requisitos: ["Bachillerato"],
    },
    {
      codigo: "ANF231",
      creditos: 3,
      nombre: "Antropología Filosófica",
      requisitos: ["Bachillerato"],
    },
    {
      codigo: "LME404",
      creditos: 4,
      nombre: "Lenguajes de Marcado y Estilo Web",
      requisitos: ["Bachillerato"],
    },
    {
      codigo: "PAL404",
      creditos: 4,
      nombre: "Programación de Algoritmos",
      requisitos: ["Bachillerato"],
    },
    {
      codigo: "REC404",
      creditos: 4,
      nombre: "Redes de Comunicación",
      requisitos: ["Bachillerato"],
    },
    {
      codigo: "ASB404",
      creditos: 4,
      nombre: "Análisis y Diseño de Sistemas y Base de Datos",
      requisitos: ["PAL404"],
    },
    {
      codigo: "DAW404",
      creditos: 4,
      nombre: "Desarrollo de Aplic. Web con Soft. Interpret. en el Cliente",
      requisitos: ["LME404"],
    },
    {
      codigo: "DSP404",
      creditos: 4,
      nombre: "Desarrollo de Aplicaciones con Software Propietario",
      requisitos: ["PAL404"],
    },
    {
      codigo: "POO404",
      creditos: 4,
      nombre: "Programación Orientada a Objetos",
      requisitos: ["PAL404"],
    },
    {
      codigo: "PSC231",
      creditos: 3,
      nombre: "Pensamiento Social Cristiano",
      requisitos: ["Bachillerato"],
    },
  ]



  const pensumIngenieria = [
    {
      codigo: "CAD941",
      creditos: 4,
      nombre: "Cálculo Diferencial",
      requisitos: ["Bachillerato"],
    },
    {
      codigo: "AVM941",
      creditos: 4,
      nombre: "Álgebra Vectorial y Matrices",
      requisitos: ["Bachillerato"],
    },
    {
      codigo: "CVV941",
      creditos: 4,
      nombre: "Cálculo de Varias Variables",
      requisitos: ["5,6"],
    },
    {
      codigo: "QUG941",
      creditos: 4,
      nombre: "Química General",
      requisitos: ["Bachillerato"],
    },
    {
      codigo: "CA1941",
      creditos: 4,
      nombre: "Cálculo Integral",
      requisitos: ["1"],
    },
    {
      codigo: "EYM941",
      creditos: 4,
      nombre: "Electricidad y Magnetismo",
      requisitos: ["2,6,7"],
    },
    {
      codigo: "EOE901",
      creditos: 4,
      nombre: "Expresión Oral y Escrita",
      requisitos: ["Bachillerato"],
    },
    {
      codigo: "CDP941",
      creditos: 4,
      nombre: "Cinemática y Dinámica de Partículas",
      requisitos: ["1"],
    },
    {
      codigo: "ESA941",
      creditos: 4,
      nombre: "Estadística Aplicada",
      requisitos: ["6"],
    },
    {
      codigo: "PRE941",
      creditos: 4,
      nombre: "Programación Estructurada",
      requisitos: ["Bachillerato"],
    }
  ];

// Rutas para obtener información de los pensum
app.get('/pensum/tecnico', (req, res) => {
  res.json(pensumTecnico);
});

app.get('/pensum/ingenieria', (req, res) => {
  res.json(pensumIngenieria);
});

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
  });
