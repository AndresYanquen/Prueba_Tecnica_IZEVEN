import React from 'react'
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

const ModalCrear = ({titulo, handleChange,crearCurso, setModalEditar,modalCrear,cursoSelec}) => {
    return (
    <Modal isOpen={modalCrear}>
        <ModalHeader>
          <div>
            <h3>{titulo}</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="idcurso"
              value={cursoSelec && cursoSelec.idcurso}
            />
            <br />

            <label>Nombre_curso</label>
            <input
              className="form-control"
              type="text"
              name="nombre_curso"
              value={cursoSelec && cursoSelec.nombre_curso}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="precio"
              value={cursoSelec && cursoSelec.precio}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>crearCurso()}>
            Crear
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    );
}

export default ModalCrear;