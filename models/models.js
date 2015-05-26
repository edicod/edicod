var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
{dialect: "sqlite", storage: "quiz.sqlite"}
);

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);
exports.Quiz = Quiz; // exportar tabla Quiz
exports.Comment = Comment;

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
// then(..) ejecuta el manejador una vez creada la tabla
Quiz.count().then(function (count){
if(count === 0) { // la tabla se inicializa solo si está vacía
Quiz.bulkCreate(
[ {pregunta: 'Capital de Italia', respuesta: 'Roma'},
{pregunta: 'Capital de Portugal', respuesta: 'Lisboa'}
]
).then(function(){console.log('Base de datos inicializada')});
};
});
});
