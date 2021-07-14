import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Container,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

export function GetCursos() {
  let [cursos, setCursos] = useState([]);

  useEffect(() => {
    console.log("Hola");
    const getCursos = async (url) => {
      let res = await fetch(url),
        json = await res.json();

      setCursos(json);

      /* if(json !== null){
                //console.log(json);
                json.forEach(e => {
                    console.log(e,json[e])
                    let curso = {
                        idcurso:json.idcurso,
                        nombre_curso: json.nombre_curso,
                        precio:json.precio
          
                      };
                      //console.log(e,curso);
                      setCursos((cursos)=>[...cursos, curso])
                      console.log(10,cursos)
                });
                 
             }  */
    };
    //console.log(json[2].nombre_curso)

    getCursos("http://localhost:5000/cursos");
    /* cursos.forEach(e => {
            console.log("Elemntos de cursos");
            console.log(e,e.nombre_curso);
        }); */
  }, []);

  return (
    <>
      <Container>
        <Button color="success"> Insertar Nueva Clase</Button>
        <p> Contenido cursos </p>
        {cursos && cursos !== undefined ? (
          /* cursos.map(curso => (
           <h2>{curso.nombre_curso}</h2>
       )) */
          <Container>
            <p> Contenido cursos : </p>
            <Table>
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
                  <tr>
                    <td> {curso.idcurso}</td>
                    <td> {curso.nombre_curso}</td>
                    <td> {curso.precio}</td>
                    <td> <Button color="warning">Editar </Button> </td>
                    <td> <Button color="danger"> Eliminar</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        ) : (
          <p>No hay datos </p>
        )}
      </Container>
       


            

    </>
  );
}
