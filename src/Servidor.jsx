import React, { useState,useEffect } from 'react';
import './servidor.css';
import Pagination from 'react-bootstrap/Pagination';
import Header from './Header';
import axios from 'axios';
const ProductsPerPage = 4;
const Servidor=()=>{
    const [products, setProducts] = useState([]);
const [search,setSearch]=useState('');
const [filterData,setFilterData]=useState([]);
      const [selectAll, setSelectAll] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);

      const indexOfLastProduct = currentPage *  ProductsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
      const currentProducts = filterData.slice(indexOfFirstProduct, indexOfLastProduct);
    console.log(currentProducts);
      const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    const searchFilter=()=>{

      const buscador=products.filter(p=>p.namefile.toLowerCase().includes(search.toLowerCase()));
      setFilterData(buscador);


    }
    useEffect(()=>{

axios.get('https://nodejsprueba.onrender.com/api/v1/recibir').then(res=>setProducts(res.data));


    },[]);
    console.log(filterData);


    useEffect(()=>{
      setFilterData(products);
      
      
      },[products]);
      const handleCheckboxChange = (productId) => {
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            product.selected = !product.selected;
          }
          return product;
        });
        setProducts(updatedProducts);
      };
    
      const handleSelectAll = () => {
        const updatedProducts = products.map((product) => ({
          ...product,
          selected: !selectAll,
        }));
        setProducts(updatedProducts);
        setSelectAll(!selectAll);
      };
    
      const handleDeleteSelected = async () => {
        const selectedProductIds = products
          .filter((product) => product.selected)
          .map((product) => product.id);
    
        try {
          await axios.delete('https://nodejsprueba.onrender.com/api/v1/eliminar', {
            data: { ids: selectedProductIds },
          },{  headers: {
            'Content-Type': 'multipart/form-data',
            'content-type':'application/json; charset=utf-8'},}).then(()=>console.log("ha eliminado con existos"));
    
          // Actualizar la lista de productos después de eliminar
          const updatedProducts = products.filter((product) => !product.selected);
          setProducts(updatedProducts);
        } catch (error) {
          console.error('Error al eliminar archivo', error);
        }
      };
      const eliminar = async (id) => {
        try {
           await axios.get(`https://nodejsprueba.onrender.com/api/v1/eliminar/${id}`,{  headers: {
            'Content-Type': 'multipart/form-data',
            'content-type':'application/json; charset=utf-8'},});
          console.log("Eliminado con éxito");
        } catch (error) {
          console.error("Error al eliminar el archivo", error.response);
        }
      };


return(<>
 <div>
  <Header/>
  <div className="container-fluid">
 <div className="search-container">
  <input type="text" className="search-input" onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar..." value={search}/>
  <i className="fa fa-search search-icon" onClick={searchFilter}></i>

</div>
<div className="button-container">
<button  className="btn btn-danger boton" onClick={handleDeleteSelected}>Eliminar</button>
</div>
<div className="table-container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre de Archivo</th>
            <th>Direccion</th>
            <th>Archivo Decencryptado</th>
            <th>EncryptationKey</th>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
                   Seleccionar Todo
            </th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
             <td>{product.id}</td>
              <td>{product.namefile}</td>
              <td>{product.direccion}</td>
              <td>{product.desencriptado}</td>
              <td>{product.encryptationKey}</td>
              <td>
                <input
                  type="checkbox"
                  checked={product.selected || false}
                  onChange={() => handleCheckboxChange(product.id)}
                />
              </td>
              <td><button  className="btn btn-danger" onClick={()=>eliminar(product.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <div className="pagination-container">
    <Pagination>
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
                Anterior
      </Pagination.Prev>

     
        {Array(Math.ceil(filterData.length / ProductsPerPage))
          .fill()
          .map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
           <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(filterData.length / ProductsPerPage)}
      >
         Siguiente
      </Pagination.Next>
      </Pagination>
      </div>
    </div>
    </div>

</>)


}
export default Servidor;