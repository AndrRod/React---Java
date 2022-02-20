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

  const modificarTexto = (l)=>{
    setTexto(l)
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

  // mandamos a llamar el metodo con useEffect
  useEffect(()=>{
    peticionGet();
  },[]);  
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
    <button className='btn btn-success' >Agregar usuario</button>
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
              <button className='btn btn-primary'  ><FontAwesomeIcon icon={faEdit}/></button>
              {" "}
              <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>    
            </td>   
          </tr>        
        )
        }
        )}
        </tbody>
    </Table>  



</div>   
  );
}
// }

export default App;


      
// <div className="App"> 
    
//     {/* // comienza barra navegacion */}
    
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <a className="navbar-brand" href="#">INFORMATORIO JAVA</a>
//         <button className="navbar-toggler" type="button" data-toggle="collapse" 
//                 data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
//                 aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
    
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <a className="nav-link" href="#">USUARIO <span className="sr-only">(current)</span></a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#"> EMPRENDIMIENTO</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#"> EVENTO</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#"> VOTO</a>
//             </li>            
           
//           </ul>
          
//             <input className="form-control mr-sm-5" type="search" placeholder="Search" aria-label="Search"/>
//             <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
          
//         </div>
//       </nav>
    
    
//     {/* termina barra de navegacion */}
    
    
//     <br></br>
//     <button className='btn btn-success' onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar usuario</button>
//     <br></br>
    
    
//     <br></br>
//     <Table striped bordered hover>
//       <thead>
//       {/* {console.log(Math.max[cantId])} */}
      
//         <tr>          
//           <th>Id</th>
//           <th>Nombre y Apellido</th>            
//           <th>Email</th>
//           <th>Pais, Provincia y Ciudad</th>
//           <th>Tipo</th>
//           <th>FechaCreacion</th>
//           <th>acciones</th>
//         </tr>
//       </thead>
//       <tbody>
    
//       {this.state.data.map(usuario=>{
        
//         return(
//           <tr key={usuario.id}>
//             <td>{usuario.id}</td>
//             <td>{usuario.nombre} {usuario.apellido}</td>
//             <td>{usuario.email}</td>
//             <td>{usuario.pais}, {usuario.provincia}, {usuario.ciudad}</td>
//             <td>{usuario.tipo}</td>
//             <td>{usuario.fechaCreacion}</td>
//             <td>
//               <button className='btn btn-primary' onClick={()=>{this.seleccionarUsuario(usuario); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
//               {" "}
//               <button className="btn btn-danger" onClick={()=>{this.seleccionarUsuario(usuario); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
    
//             </td>
    
//           </tr>
//         );}
//         )}
//         </tbody>
//     </Table>
    
    
    
//     {/* con isOpen pasamos el estado si el modalInserter es false esta cerrado y si es true se abre*/}
//     <Modal isOpen={this.state.modalInsertar}>
//       <ModalHeader style={{display: 'float'}}>
//         <button className='btn btn-outline-primary  ' style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x
//           </button>
//       </ModalHeader>
//       <ModalBody>
//         <div className='form-group'>
//           <br/>
//           <label htmlFor="id">Id</label>
//           <input className='form-control' type="text" name="id" id="id" onChange={this.handleChange}  defaultValue={form? form.id: this.getLastArrItem(listaId)+1} readOnly/>
//           <br/>
//           {/* <label htmlFor="fechaCreacion">Fecha Creacion</label>
//           <input className='form-control' type="text" name="fechaCreacion" id="fechaCreacion" onChange={this.handleChange}  value={form.fechaCreacion} readOnly/>
//           <br/> */}
//           <label htmlFor="nombre">Nombre</label>
//           <input className='form-control' type="text" name="nombre" id="nombre" onChange={this.handleChange}   defaultValue={form? form.nombre: ""}/>
//           <br/>
//           <label htmlFor="apellido">Apellido</label>
//           <input className='form-control' type="text" name="apellido" id="apellido" onChange={this.handleChange}  defaultValue={form? form.apellido : ""}/>
//           <br/>
//           <label htmlFor="email">Email</label>
//           <input className='form-control' type="text" name="email" id="email" onChange={this.handleChange}  defaultValue={form? form.email : ""}/>
//           <br/>
//           <label htmlFor="pais">Pais</label>
//           <input className='form-control' type="text" name="pais" id="pais" onChange={this.handleChange}  defaultValue={form? form.pais : ""}/>
//           <br/>
//           <label htmlFor="provincia">Provincia</label>
//           <input className='form-control' type="text" name="provincia" id="provincia" onChange={this.handleChange}  defaultValue={form? form.provincia : ""}/>
//           <br/>
//           <label htmlFor="ciudad">Ciudad</label>
//           <input className='form-control' type="text" name="ciudad" id="ciudad" onChange={this.handleChange}  defaultValue={form? form.ciudad : ""}/>
//           <br/>
//           {/* <label htmlFor="tipo">Tipo</label>
//           <input className='form-control' type="text" name="tipo" id="tipo" onChange={this.handleChange}  defaultValue={form? form.tipo : ""}/> */}
          
//           Tipo
//           <select htmlFor="tipo" name="tipo" id="tipo" className="form-select" onChange={this.handleChange}  defaultValue={form? form.tipo : ""}>
//               <option  value="OWNER">OWNER</option>
//               <option value="USUARIO">USUARIO</option>
//               <option  value="COLABORADOR">COLABORADOR</option>
//         </select>    
//           <br/>
      
//           <label htmlFor="password">Contraseña</label>
//           <input className='form-control' type="password" name="password" id="password" onChange={this.handleChange}  defaultValue={form? form.password : ""}  />
//           {/* {this.state.data.response} */}
          
//           <br/>
          
          
//         </div>
//       </ModalBody>
//       <ModalFooter>
//         {this.state.tipoModal == 'insertar'?          
//         <button className='btn btn-success'onClick={()=>{this.peticionPost()}}>Insertar</button>:
//         <button className='btn btn-primary'onClick={()=>{this.peticionPut()}}>Actualizar</button>          
//         }
//         <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>Cancelar</button>
        
//       </ModalFooter>
//     </Modal>
      
    
    
//     <Modal isOpen={this.state.modalEliminar}>
//       <ModalBody>
//         ¿Estas seguro que quieres eliminar el usuario {form && form.email}?
//       </ModalBody>
//       <ModalFooter>
//             <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
//             <button className="btn btn-primary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
//       </ModalFooter>
//     </Modal>
    
//     </div>
    





//  clase

// cambiar la funcion a clase
// class App extends React.Component{


//   // para almanezar la data y la peticion (get)
//   state={
//     data:[],
//     // modal Insertar hace que se abra y cierre el modal (si es false o true)
//     modalInsertar: false,
//     modalEliminar: false,
//     // lugar donde se guarda la informacion
//     form:{
//       id: "",
//       nombre: "",
//       apellido: "",
//       email: "",
//       ciudad: "",
//       provincia: "",
//       pais: "",
//       tipo: "",
//       fechaCreacion: "",
//       // vamos a usar el mismo modal con los mismos campos, lo que significa que lo especificamos en el estado
//       tipoModal: ""
//     }
//   }

//   //en axios se almacena la informacion
//   peticionGet=()=>{
//     axios.get(url).then(response=>{
//       this.setState({data: response.data});
//       // console.log(response.data);
//     }).catch(error=>{
//       console.log(error.message);
//     })
//   }
//   // debe ser asincrona porque se ejecuta en segundo plano
//   peticionPost= async ()=>{
//     delete this.state.form.id;
//     await axios.post(url, this.state.form).then(response=>{      
      
//       this.modalInsertar();
//       this.peticionGet();
//     }).catch(error=>{
//       console.log(error.message);
//     }) 
//   }
//   peticionPut=()=>{
//     // porque url + id es el path de la api.
//     // pasar la data: que es el estado form
//     axios.put(url+this.state.form.id, this.state.form).then(response=>{
//       this.modalInsertar();
//       this.peticionGet();
//     })    
//   }

//   // peticionBuscarPorId=(id)=>{
//   //   axios.get("http://localhost:8080/usuario/buscarPorId/" + id).then(response=>{
//   //     this.modalInsertar();
//   //     this.setState({data: response.data});
//   //   })
//   // }

//   peticionDelete=()=>{
//     axios.delete(url+this.state.form.id).then(response=>{
//       this.setState({modalEliminar: false});
//       this.peticionGet();
//     })
//   }
  
//   seleccionarUsuario = (usuario) =>{
//     this.setState({
//       tipoModal: "actualizar",

//       form:{
//         id: usuario.id,
//         nombre: usuario.nombre,
//         apellido: usuario.apellido,
//         email: usuario.email,
//         ciudad: usuario.ciudad,
//         provincia: usuario.provincia,
//         pais: usuario.pais,
//         tipo: usuario.tipo,
//         fechaCreacion: usuario.fechaCreacion
//       }
//     })
//   }

//   // hace que el modal se abra cuando se apreta el boton crear usuario y que se cierre cuando se apreta el boton cancelar
//   modalInsertar=()=>{
//     this.setState({modalInsertar: !this.state.modalInsertar})
//   }

//   //atrapa los datos que ingresa el usuario
//   handleChange=async e=>{
//     e.persist();    
//     await this.setState({
//       form:{
//         //hereda los atributos del form y que no se borre cuando el usuario escriba
//         ...this.state.form,
//         [e.target.name]: e.target.value,
//       }
//     });
//     console.log(this.state.form)
//   }
//   //ciclo de vida
//   componentDidMount(){
//     this.peticionGet();     
//   }

//   // useEffect(()=>{
//   //   peticionGet();
//   // }),[]);
  
//   mayorId(){ Math.max( [this.state.data.map(u=>(u.id))])}
  
//   getLastArrItem = (arr) => { 
//     let lastItem=arr[arr.length-1];  
//     return lastItem; 
//   } 
         
//   render(){
//     // const form = this.state.form;
//     const {form} = this.state;
//     let listaId = this.state.data.map(u=>(u.id))   
      
