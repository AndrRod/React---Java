import './App.css';
import axios from 'axios';
import React from 'react';
import { Component, useEffect, useState } from 'react';
// mejor forma es la importación más que agregar el script 
import 'bootstrap/dist/css/bootstrap.min.css';
//fontawesone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// reactstrap
import { Modal, ModalBody, ModalHeader, ModalFooter, Table, Form, Button} from 'reactstrap';




let url = "http://localhost:8080/usuario/";


function App (){

  // datos en forma dinamica
  const [usuarios, setUsuarios] = useState([]);
  // datos en forma estatica
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  // datos que tipe el usuario en busqueda
  const [busqueda, setBusqueda] = useState("");

  const [inputTexto, setTexto] = useState("");

  const [modalEliminar, setModalEliminar] = useState(false);

  const [modalAgregarUsuario, setModaAgregarUsuario] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  // const [datosUser, setDatosUser] = useState("");

  const modificarTexto = (l)=>{
    setTexto(l)
  }
  
 
  // const getUsuarioDatos =()=>{         
  //   console.log(datosUser.id, datosUser.email)    
  //   return datosUser;
  // }

  const modifModalEditar=()=>{
    if(modalEditar==false){
      setModalEditar(true)
    }else{
      setModalEditar(false)
      // setDatosUser("");
    }
  }

  const modifModalEliminar= ()=>{    
    if(modalEliminar==false){
      setModalEliminar(true)
    }else{
      setModalEliminar(false)
      // setDatosUser("");
    }
  }
 

  const modifModalAgregar= ()=>{    
    if(modalAgregarUsuario==false){
      setModaAgregarUsuario(true)
    }else{
      setModaAgregarUsuario(false)
      }
  }

  

  // const ComponentCrearUsuario = () => {
    const [user, setUser] = useState({
      id: "",
      nombre: "",
      apellido: "",
      email: "",
      ciudad: "",
      provincia: "",
      pais: "",
      tipo: "",
      fechaCreacion: "",
      password: ""
    });

    
    const handleSubmitCreacion = async () => {      
      const userNew = user;
      console.log(userNew)
      // const userInput = {id, nombre, apellido, email, ciudad, provincia, pais, tipo, fechaCreacion};

      await axios.post('http://localhost:8080/usuario/', userNew)
      .then(response=>{
        console.log(response);
        modifModalAgregar()
        peticionGet();        
      });        
  };

  const peticionPut= async (id, user)=>{
    const userNew = user;
    console.log(userNew)
    // setUser(usuario);
    // console.log(user)
    await axios.put(url+ id, userNew).then(response=>{
      console.log(response.data);
      peticionGet();
    })    
  }

//   peticionPut(1,{
//     "id": 1,
//     "nombre": "andres",
//     "apellido": "Rodriguez",
//     "email": "andresRod@gmail.com",
//     "ciudad": "Resistencia",
//     "provincia": "chaco",
//     "password": "asdfsa32",
//     "pais": "argentina",
//     "tipo": "OWNER",
//     "fechaCreacion": "04-12-2021 07:56:32"
// })

  const handleChangeUsuario = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value})
    }  
  


  const peticionGetPorId = (id)=>{
    axios.get("http://localhost:8080/usuario/buscarPorId/" + id)
    .then(response=>{      
      // setDatosUser(response.data);
      setUser(response.data)        
      // console.log(response.data);
    }).catch(error=>{
      console.log(error)
    })
  }

  const peticionGet= async ()=>{
    await axios.get(url)
    .then(response=>{
      setUsuarios(response.data);
      setTablaUsuarios(response.data);      
      // console.log(response.data);
    }).catch(error=>{
      console.log(error)
    })
  }
  const handleChange=(e)=>{
    modificarTexto(e.target.value)
    setBusqueda(e.target.value);
    // filtrar(e.target.value);
    // getUsuarioDatos();
  }
  
  const filtrarCiudad= ()=>{       
     axios.get("http://localhost:8080/usuario/buscarPorCiudad?ciudad=" + inputTexto)
    .then(response=>{      
      setTablaUsuarios(response.data);
      setUsuarios(response.data);      
      // console.log(response.data);      
    }).catch(error=>{
      console.log(error)  
    // var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
    //   if (elemento.ciudad.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())      
    //   || elemento.fechaCreacion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    //   ){
    //     return elemento;
    //   }
    });
    // setUsuarios(resultadosBusqueda);
  }


    
  const filtrarFecha= ()=>{       
    axios.get("http://localhost:8080/usuario/buscarPorFecha/" + inputTexto)
   .then(response=>{      
     setTablaUsuarios(response.data);
     setUsuarios(response.data);           
   }).catch(error=>{
     console.log(error)     
   });   
 }




 const eliminarUsuario = (id) => {
    axios.delete("http://localhost:8080/usuario/" + id)
      .then(response=>{
      console.log(response.data);      
      modifModalEliminar()    
      peticionGet(); 
    }).catch (error =>{
    console.log(error);
  })
};



  // mandamos a llamar el metodo con useEffect
  useEffect(()=>{
    peticionGet();
  },[]);  

  const getLastArrItem = (arr) => { 
    let lastItem=arr[arr.length-1];  
    return lastItem; 
  }           
  
  let users = usuarios.map(m=>{return m.id})  
  const ultimoId = () => { return getLastArrItem(users)}; 
    
  

    return (
      <div className="App"> 
      {/* // barra nav */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">INFORMATORIO JAVA</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>    
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">USUARIO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> EMPRENDIMIENTO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> EVENTO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> VOTO</a>
            </li>                       
          </ul>          
            <input className="form-control inputBuscar" type="search" aria-label="Search" value={busqueda} placeholder="Buscar por Ciudad y fecha de Creacion"
            onChange={handleChange}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={()=>{filtrarCiudad();filtrarFecha()}}><FontAwesomeIcon icon={faSearch}/></button>          
        </div>
      </nav>
      {/* // termina barra nav */}
      <br></br>   
    <button className='btn btn-success' onClick={()=>modifModalAgregar()}>Agregar usuario</button>
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
          {/* <th>{usuarios && usuarios.map(usuario=>{usuario.id})}</th> */}
        </tr>
      </thead>      
      
      <tbody>
        {/* {usuarios.map(usuario=>{console.log(usuario.id, usuario.nombre, usuario.apellido)})} */}
        {usuarios && usuarios.map(usuario=>{         
          return(            
            <tr key={usuario.id}>            
            <td>{usuario.id}</td>
            <td>{usuario.nombre} {usuario.apellido}</td>
            <td>{usuario.email}</td>
            <td>{usuario.pais}, {usuario.provincia}, {usuario.ciudad}</td>
            <td>{usuario.tipo}</td>
            <td>{usuario.fechaCreacion}</td>
            <td>
              <button className='btn btn-primary' onClick={()=>{peticionGetPorId(usuario.id); modifModalEditar()}}><FontAwesomeIcon icon={faEdit} /></button>
              {" "}
              <button className="btn btn-danger" onClick={()=>{peticionGetPorId(usuario.id); modifModalEliminar()}}><FontAwesomeIcon icon={faTrashAlt} /></button>    
            </td>   
          </tr>        
        )}
        )}
        </tbody>
    </Table>  


       <Modal isOpen={modalAgregarUsuario || modalEditar}>
     <ModalHeader style={{display: 'float'}}>
       <button className='btn btn-outline-primary  ' style={{float: 'right'}} onClick={()=>{modalEditar? modifModalEditar() :modifModalAgregar()}}>x
         </button>
     </ModalHeader>
     <ModalBody>
       <div className='form-group'>
         <br/>
         <label htmlFor="id">Id</label>
         <input className='form-control' type="text" name="id" id="id"  defaultValue={modalEditar? user.id :ultimoId()+1} readOnly/>
         <br/>
         {/* <label htmlFor="fechaCreacion">Fecha Creacion</label>
         <input className='form-control' type="text" name="fechaCreacion" id="fechaCreacion"   value={form.fechaCreacion} readOnly/>
         <br/> */}
         <label htmlFor="nombre">Nombre</label>
         <input className='form-control' type="text" name="nombre" id="nombre"   defaultValue={modalEditar? user.nombre : ""} onChange={(e)=>handleChangeUsuario(e)}/>
         <br/>
         <label htmlFor="apellido">Apellido</label>
         <input className='form-control' type="text" name="apellido" id="apellido"  defaultValue={modalEditar? user.apellido : ""} onChange={(e)=>handleChangeUsuario(e)} />
         <br/>
         <label htmlFor="email">Email</label>
         <input className='form-control' type="text" name="email" id="email"   defaultValue={modalEditar? user.email : ""}  onChange={(e)=>handleChangeUsuario(e)}/>
         <br/>
         <label htmlFor="pais">Pais</label>
         <input className='form-control' type="text" name="pais" id="pais"  defaultValue={modalEditar? user.pais : ""} onChange={(e)=>handleChangeUsuario(e)} />
         <br/>
         <label htmlFor="provincia">Provincia</label>
         <input className='form-control' type="text" name="provincia" id="provincia"   defaultValue={modalEditar? user.provincia : ""} onChange={(e)=>handleChangeUsuario(e)}/>
         <br/>
         <label htmlFor="ciudad">Ciudad</label>
         <input className='form-control' type="text" name="ciudad" id="ciudad"  defaultValue={modalEditar? user.ciudad : ""} onChange={(e)=>handleChangeUsuario(e)} />
         <br/>
         {/* <label htmlFor="tipo">Tipo</label>
         <input className='form-control' type="text" name="tipo" id="tipo"   */}
          
         Tipo
         <select htmlFor="tipo" name="tipo" id="tipo" className="form-select" defaultValue={modalEditar? user.tipo : ""} onChange={(e)=>handleChangeUsuario(e)} >
            <option >Elija una Opcion</option>
             <option  value="OWNER">OWNER</option>
             <option value="USUARIO">USUARIO</option>
             <option  value="COLABORADOR">COLABORADOR</option>
       </select>    
         <br/>
      
         <label htmlFor="password">Contraseña</label>
         <input className='form-control' type="password" name="password" id="password"   defaultValue={modalEditar? user.password : ""} onChange={(e)=>handleChangeUsuario(e)} />
         {/* {this.state.data.response} */}
          
         <br/>
          
          
       </div>
     </ModalBody>
     <ModalFooter>
       {modalEditar?          
      <button className='btn btn-success' onClick={()=>peticionPut(user.id, user)}>Actualizar</button>:
       <button className='btn btn-primary' onClick={()=>handleSubmitCreacion()}>Insertar</button>          
      }
       <button className='btn btn-danger' onClick={()=>{modalEditar? modifModalEditar() :modifModalAgregar()}}>Cancelar</button>
        
     </ModalFooter>
   </Modal>
      


         
     <Modal isOpen={modalEliminar}>       
     {/* devolverEstadoEliminar() */}
       <ModalBody>
             <p>¿Estas seguro que quieres eliminar el usuario {user.email}?</p>
              
           </ModalBody><ModalFooter>
               <button className="btn btn-danger" onClick={() =>eliminarUsuario(user.id)}>Sí</button>
               <button className="btn btn-primary" onClick={() => modifModalEliminar()}>No</button>
            </ModalFooter>
     </Modal>
        
    


</div>   
  );
}
// }

export default App;