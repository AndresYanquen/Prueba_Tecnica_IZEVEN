from flask import Flask, json, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import warnings

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/escuela'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class curso(db.Model):
    idcurso = db.Column(db.Integer, primary_key=True)
    nombre_curso = db.Column(db.String(45))
    precio = db.Column(db.Integer)

    def __init__(self, nombre, precio):
        self.nombre_curso = nombre
        self.precio = precio

db.create_all()

class CursoSchema(ma.Schema):
    class Meta:
        fields = ('idcurso','nombre_curso','precio')

curso_Schema =  CursoSchema()
cursos_Schema = CursoSchema(many=True)

@app.route('/',methods=['GET'])
def index():
    return jsonify({'message': 'Academia'})

@app.route('/cursos', methods=['POST'])
def create_curso():
    nombre_curso = request.json['nombre_curso']
    precio = request.json['precio']

    new_Curso = curso(nombre_curso,precio)
    db.session.add(new_Curso)
    db.session.commit()

    return curso_Schema.jsonify(new_Curso)

@app.route('/cursos',methods=['GET'])
def get_cursos():
    all_cursos = curso.query.all()
    result =cursos_Schema.dump(all_cursos)
    return jsonify(result)

@app.route('/cursos/<id>', methods=['GET'])
def get_task(id):
    cursoGet = curso.query.get(id)
    return curso_Schema.jsonify(cursoGet)

@app.route('/cursos/<id>', methods=['PUT'])
def update_curso(id):
    cursoUpdate=curso.query.get(id)
    nombre = request.json['nombre_curso']
    precio = request.json['precio']

    cursoUpdate.nombre_curso = nombre
    cursoUpdate.precio = precio

    db.session.commit()
    return curso_Schema.jsonify(cursoUpdate)

@app.route('/cursos/<id>',methods=['DELETE'])
def delete_item(id):
    cursoDelete = curso.query.get(id)
    db.session.delete(cursoDelete)
    db.session.commit()

    return curso_Schema.jsonify(cursoDelete)


if __name__ == "__main__":
    app.run(debug=True)