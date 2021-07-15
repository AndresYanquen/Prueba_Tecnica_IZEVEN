import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Table, Container, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { GetCursos, getCursos } from './components/crud';

function App() {

  return (
      <>
      <h1>Academia</h1>
    
      <GetCursos/>
      </>
      
  
  );
}

export default App;
