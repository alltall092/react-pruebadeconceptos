import React, { useState } from 'react';
import axios from 'axios';

//import generateSeed from 'iota-generate-seed';
import './TangleRed.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { Container, ProgressBar } from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import Whatsapp from './Whatsapp';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';


function TangleRed() {
    const [seed, setSeed] = useState('');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [encrypted, setEncrypted] = useState(null);
  const [encryptionKey,setEncryptionKey]=useState('');
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);

    // Simulamos una carga con un temporizador
    setTimeout(() => {
      setProgress(100);
    }, 2000);
  };

  const notifySuccess = (mensaje,variable) => {
    toast.success(mensaje, {
      style: { background: 'green', color: 'white' },
    },variable);
  };

  const servidor = () => {
  const n=navigate('/servidor');
  return n;
    
  };
  const notifyError = (mensaje,error) => {
    toast.error(mensaje, {
      style: { background: 'red', color: 'white' },
    },error);
  };
  const handleChange = (event) => {
    setSeed(event.target.value);
  };

  const generateAddres = (e) => {
    e.preventDefault();
    axios.post('https://nodejsprueba.onrender.com/api/v1/generateAddress').then(res=>{
    setAddress(res.data);
    notifySuccess('has generado una direccion',address);
 }).catch(err=> notifyError('la direccion esta vacia o un error',err));
    
  };

 

  const encryptFile = () => {
    //const formData = new FormData();
   
    files.forEach((file) => {
    
axios.post('https://nodejsprueba.onrender.com/api/v1/encryptado',JSON.stringify({file:file.path,encryptionKey:encryptionKey}),{  headers: {
 'Content-Type': 'multipart/form-data',
 'content-type':'application/json; charset=utf-8'
 
},

}).then(res=>{
  
  setEncrypted(res.data)
  notifySuccess('su archivo ha sido encryptado',res.data);
}).catch(err=>notifyError('el encryptionKey  esta vacia o un error',err));
});
  };

  const sendEncryptedFile = () => {
    files.forEach((file) => {


   axios.post('https://nodejsprueba.onrender.com/api/v1/redTangle',JSON.stringify({address:address,
   encryptionKey:encryptionKey,
   encrypted:encrypted,
   file:file.path}),{  headers: {
    'Content-Type': 'multipart/form-data',
    'content-type':'application/json; charset=utf-8'
    
   },}).then(res=>{
   Swal.fire({
      position: 'top',
      icon: 'success',
      title:res.data.message,
      showConfirmButton: false,
      timer: 1500
    })
    
    
    
    console.log(res.data)}).catch(err=>notifyError('el campo archivo  esta vacia o un error de los otro campo',err));
    });
  
  };

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const iconStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  };
 
  
 
  return (<>
<Header/>
    <div className="container contenedor">

      <div className="item">
      <h2>Red Tangle Básica para Enviar Archivo Encriptado</h2>
      <button onClick={generateAddres}>Generar Dirección</button>
      <button onClick={encryptFile}>Encriptar Archivo</button>
      <button onClick={sendEncryptedFile}>Enviar Archivo Encriptado</button>
      <button onClick={servidor}>Servidor</button>
    


      <div className="row">
      <div className="col-md-6">
      <ToastContainer />
     
        <label>Ingresar tu Address</label>
        <input
        type="text" className="form-control"
        placeholder="generar un Address"
        onChange={(e)=>setAddress(e.target.value)} value={address}
      />
        <label>Ingresar ClaveDeEncriptacion</label>
        <div className="form-group" style={{ position: 'relative' }}>
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder="Ingresa tu claveDeEncriptacion"
        onChange={(e) => setEncryptionKey(e.target.value)}
        value={encryptionKey}
      />
      <span onClick={togglePasswordVisibility} style={iconStyle}>
        {showPassword ? (
          <i className="fas fa-eye-slash"></i>
        ) : (
          <i className="fas fa-eye"></i>
        )}
      </span>
    </div>
    
    
    <h5 style={{margin:"20px",padding:"5px",display:"none"}}>Saldo generado</h5>
  
   
    
      </div>
      <div className="col-md-6">

      <Container>
      <h4 style={{color:"green"}}>Subir Archivo aqui</h4>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input type="file" name="file"  {...getInputProps()}  />
            <p>Arrastra y suelta archivos aquí o haz clic para seleccionar archivos</p>
          </div>
        )}
      </Dropzone>
      <ProgressBar now={progress} label={`${progress}%`} variant="success"  />
      {files.length > 0 && (
        <div>
          <h3>Archivos seleccionados:</h3>
          <ul>
            {files.map((file) => (
              <li key={file.name}><i className="fa-solid fa-folder-open icon"></i>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>



      </div>
      
      </div>
    </div>
    <Whatsapp/>
    </div>

    </>
  );
}

export default TangleRed;
