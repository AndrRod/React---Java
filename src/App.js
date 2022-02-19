import './App.css';
import axios from 'axios';
import React from 'react';
import { Component } from 'react';
// mejor forma es la importación más que agregar el script 
import 'bootstrap/dist/css/bootstrap.min.css';
//fontawesone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// reactstrap
import { Modal, ModalBody, ModalHeader, ModalFooter, Table, Form, Button} from 'reactstrap';




let url = "http://localhost:8080/usuario/";

// cambiar la funcion a clase
class App extends React.Component{
  // para almanezar la data y la peticion (get)
  state={
    data:[],
    // modal Insertar hace que se abra y cierre el modal (si es false o true)
    modalInsertar: false,
    modalEliminar: false,
    // lugar donde se guarda la informacion
    form:{
      id: "",
      nombre: "",
      apellido: "",
      email: "",
      ciudad: "",
      provincia: "",
      pais: "",
      tipo: "",
      fechaCreacion: "",
      // vamos a usar el mismo modal con los mismos campos, lo que significa que lo especificamos en el estado
      tipoModal: ""
    }
  }
  //en axios se almacena la informacion
  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
      // console.log(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  }
  // debe ser asincrona porque se ejecuta en segundo plano
  peticionPost= async ()=>{
    delete this.state.form.id;
    await axios.post(url, this.state.form).then(response=>{      
      
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    }) 
  }
  peticionPut=()=>{
    // porque url + id es el path de la api.
    // pasar la data: que es el estado form
    axios.put(url+this.state.form.id, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })    
  }

  peticionDelete=()=>{
    axios.delete(url+this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  seleccionarUsuario = (usuario) =>{
    this.setState({
      tipoModal: "actualizar",

      form:{
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        ciudad: usuario.ciudad,
        provincia: usuario.provincia,
        pais: usuario.pais,
        tipo: usuario.tipo,
        fechaCreacion: usuario.fechaCreacion
      }
    })
  }

  // hace que el modal se abra cuando se apreta el boton crear usuario y que se cierre cuando se apreta el boton cancelar
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar})
  }

  //atrapa los datos que ingresa el usuario
  handleChange=async e=>{
    e.persist();    
    await this.setState({
      form:{
        //hereda los atributos del form y que no se borre cuando el usuario escriba
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
    console.log(this.state.form)
  }
  //ciclo de vida
  componentDidMount(){
    this.peticionGet(); 
  }
  mayorId(){ Math.max( [this.state.data.map(u=>(u.id))])}
  
  getLastArrItem = (arr) => { 
    let lastItem=arr[arr.length-1];  
    return lastItem; 
  }      
  
  render(){
    // const form = this.state.form;
    const {form} = this.state;
    let listaId = this.state.data.map(u=>(u.id))   
   
    return (
      
     
    
      
      <div className="App"> 

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">INFORMATORIO JAVA</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" 
                  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                  aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">USUARIO <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"> EMPRENDIMIENTO</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"> EVENTO</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"> VOTO</a>
              </li>            
             
            </ul>
            
              <input class="form-control mr-sm-5" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
            
          </div>
        </nav>


      <br></br>
      <button className='btn btn-success' onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar usuario</button>
      <br></br>
      
    
      <br></br>
      <Table striped bordered hover>
        <thead>
        {/* {console.log(Math.max[cantId])} */}
        
          <tr>          
            <th>Id</th>
            <th>Nombre y Apellido</th>            
            <th>Email</th>
            <th>Pais, Provincia y Ciudad</th>
            <th>Tipo</th>
            <th>FechaCreacion</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>

        {this.state.data.map(usuario=>{
          
          return(
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre} {usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>{usuario.pais}, {usuario.provincia}, {usuario.ciudad}</td>
              <td>{usuario.tipo}</td>
              <td>{usuario.fechaCreacion}</td>
              <td>
                <button className='btn btn-primary' onClick={()=>{this.seleccionarUsuario(usuario); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {" "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarUsuario(usuario); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>

              </td>

            </tr>
          );}
          )}
          </tbody>
      </Table>
      
{/* con isOpen pasamos el estado si el modalInserter es false esta cerrado y si es true se abre*/}
      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'float'}}>
          <button className='btn btn-outline-primary  ' style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x
            </button>
        </ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <br/>
            <label htmlFor="id">Id</label>
            <input className='form-control' type="text" name="id" id="id" onChange={this.handleChange}  defaultValue={form? form.id: this.getLastArrItem(listaId)+1} readOnly/>
            <br/>
            {/* <label htmlFor="fechaCreacion">Fecha Creacion</label>
            <input className='form-control' type="text" name="fechaCreacion" id="fechaCreacion" onChange={this.handleChange}  value={form.fechaCreacion} readOnly/>
            <br/> */}
            <label htmlFor="nombre">Nombre</label>
            <input className='form-control' type="text" name="nombre" id="nombre" onChange={this.handleChange}   defaultValue={form? form.nombre: ""}/>
            <br/>
            <label htmlFor="apellido">Apellido</label>
            <input className='form-control' type="text" name="apellido" id="apellido" onChange={this.handleChange}  defaultValue={form? form.apellido : ""}/>
            <br/>
            <label htmlFor="email">Email</label>
            <input className='form-control' type="text" name="email" id="email" onChange={this.handleChange}  defaultValue={form? form.email : ""}/>
            <br/>
            <label htmlFor="pais">Pais</label>
            <input className='form-control' type="text" name="pais" id="pais" onChange={this.handleChange}  defaultValue={form? form.pais : ""}/>
            <br/>
            <label htmlFor="provincia">Provincia</label>
            <input className='form-control' type="text" name="provincia" id="provincia" onChange={this.handleChange}  defaultValue={form? form.provincia : ""}/>
            <br/>
            <label htmlFor="ciudad">Ciudad</label>
            <input className='form-control' type="text" name="ciudad" id="ciudad" onChange={this.handleChange}  defaultValue={form? form.ciudad : ""}/>
            <br/>
            {/* <label htmlFor="tipo">Tipo</label>
            <input className='form-control' type="text" name="tipo" id="tipo" onChange={this.handleChange}  defaultValue={form? form.tipo : ""}/> */}
            
            Tipo
            <select htmlFor="tipo" name="tipo" id="tipo" className="form-select" onChange={this.handleChange}  defaultValue={form? form.tipo : ""}>
                <option  value="OWNER">OWNER</option>
                <option value="USUARIO">USUARIO</option>
                <option  value="COLABORADOR">COLABORADOR</option>
          </select>    
            <br/>
        
            <label htmlFor="password">Contraseña</label>
            <input className='form-control' type="password" name="password" id="password" onChange={this.handleChange}  defaultValue={form? form.password : ""}  />
            {/* {this.state.data.response} */}
            
            <br/>
            
            
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.tipoModal == 'insertar'?          
          <button className='btn btn-success'onClick={()=>{this.peticionPost()}}>Insertar</button>:
          <button className='btn btn-primary'onClick={()=>{this.peticionPut()}}>Actualizar</button>          
          }
          <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>Cancelar</button>
          
        </ModalFooter>
      </Modal>
        
      <Modal isOpen={this.state.modalEliminar}>
        <ModalBody>
          ¿Estas seguro que quieres eliminar el usuario {form && form.email}?
        </ModalBody>
        <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-primary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
        </ModalFooter>
      </Modal>

    </div>

  );
}
}

export default App;
