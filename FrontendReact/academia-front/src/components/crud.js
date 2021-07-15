import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Container,
  FormGroup,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import ModalCrear from './ModalCrear'
import axios from 'axios';


export function GetCursos() {
  const baseUrl='http://localhost:5000/cursos/'
  let [cursos, setCursos] = useState([]);
  let [modalEditar, setModalEditar] = useState(false)
  let [modalCrear, setModalCrear] = useState(false)
  let [cursoSelec, setCursoSelec] = useState({
    idcurso:'',
    nombre_curso:'',
    precio:''

  })

  const selectCurso=(curso, caso)=>{
    setCursoSelec(curso);
    (caso =='Editar') && setModalEditar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setCursoSelec((prevState)=>({
      ...prevState,
      [name]: value
      
    }));
   // console.log(cursoSelec);
  }

  const getCursos = async () => {
    let res = await fetch('http://localhost:5000/cursos'),
      json = await res.json();
      console.log(json)

    setCursos(json);

  };

  const eliminarCurso = async (id) => {
    let res = await fetch(`${baseUrl}${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }),
      json = await res.json();
      console.log(json)
      getCursos();
  };

  const editarCurso=async()=>{
    let res = await fetch(`${baseUrl}${cursoSelec.idcurso}` , {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(cursoSelec)
    })
      let json = await res.json();
      setModalEditar(false);
      setCursoSelec({
        idcurso:'',
        nombre_curso:'',
        precio:''
    
      })
      getCursos();
  }
  const crearCurso=async()=>{
    let curso = {
      ...cursoSelec,
      precio : parseInt(cursoSelec.precio)
    }
    delete curso.idcurso
    console.log(curso)
    let res = await fetch(`${baseUrl}` , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cursoSelec)
    })
      //let json = await res.json();
      setModalCrear(false);
      getCursos();
  }
  
  useEffect(() => {

    //console.log(json[2].nombre_curso)

    getCursos();
    /* cursos.forEach(e => {
            console.log("Elemntos de cursos");
            console.log(e,e.nombre_curso);
        }); */
  }, []);

  return (
    <>
      <Container>
        <Button color="success" onClick={()=>setModalCrear(true)}> Insertar Nueva Clase</Button>
        <p> Contenido cursos </p>
        {cursos && cursos !== undefined ? (
          /* cursos.map(curso => (
           <h2>{curso.nombre_curso}</h2>
       )) */
          <Container>
            <p> Contenido cursos : </p>
            <Table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Curso</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cursos.map((curso) => (
                  <tr key={curso.idcurso}>
                    <td> {curso.idcurso}</td>
                    <td> {curso.nombre_curso}</td>
                    <td> {curso.precio}</td>
                    <td> <Button color="warning" onClick={()=>selectCurso(curso,"Editar")}>Editar </Button> </td>
                    <td> <Button color="danger" onClick={()=>eliminarCurso(curso.idcurso)}> Eliminar</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        ) : (
          <p>No hay datos </p>
        )}
      </Container>
      <div>
      {    <ModalCrear titulo={"Editar Curso"} handleChange={handleChange} crearCurso={editarCurso} setModalEditar={setModalEditar} modalCrear={modalEditar} cursoSelec={cursoSelec} />}
          
          {<ModalCrear titulo={"Crear Curso"} handleChange={handleChange} crearCurso={crearCurso} setModalEditar={setModalCrear} modalCrear={modalCrear} cursoSelec={cursoSelec} />}

      </div>
       


            

    </>
  );
}
