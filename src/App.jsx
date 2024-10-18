import React,{ useState } from 'react'
import axios from 'axios';
import './App.css'
import { errorOp, succesOp } from './alertas';

function App() {
  const [sandwich,setSandwich] = useState('')
  const [agregado,setAgregado] = useState('')
  const [cantidad,setCantidad] = useState(0)

  const [nombreCliente,setNombreCliente] = useState('')
  const [direccion,setDireccion] = useState('')
  const [telefono,setTelefono] = useState('')
  const [totalPedido,setTotalPedido] = useState(0)
  const [pedidos, setPedidos] = useState([]);

  
  function agregarPedido(){
    const nuevoPedido = {
      sandwich,
      agregado,
      cantidad,
    };
    const valorSandwich = 800;
    const valorAgregado = (nuevoPedido.agregado == 'Nada')? 0: 200;
    setTotalPedido(totalPedido + ((valorSandwich+valorAgregado)*cantidad))
    setPedidos([...pedidos, nuevoPedido]);
  };


  const handleSubmit = () => {
    const pedido = {
      pedidos,
      nombreCliente,
      direccion,
      telefono
    };

    
    axios.post('http://localhost:3001/api/pedido', pedido)
      .then(response => {
        succesOp('Datos enviados correctamente','');
        
      })
      .catch(error => {
        errorOp('Error al enviar el pedido:',error);
      });
  };


  return (
    <>
      <div className='container divTodo'>
        <div className='row'>
          <div className='col-12'>
            <div className='text-start divTitulo'>
              <h1 className='tituloDatosPedido'>Datos del pedido</h1>
            </div>
          </div>
          
          <div className='col-12 d-flex'>
            <div className='nombreOpciones mt-3 align-items-center'>
              <h2 className='opcionTag my-2'>Sandwich:</h2>
              <h2 className='opcionTag mt-4'>Agregado:</h2>
              <h2 className='opcionTag mt-4'>Cantidad:</h2>
            </div>
            

          
            <div className='mt-3 align-items-center'>
              
              <select className="form-select opcionSelect" onChange={(e)=>{setSandwich(e.target.value)}}>
                <option value="0">Seleccionar</option>
                <option value="Barros Luco">Barros Luco</option>
                <option value="Italiano">Italiano</option>
                <option value="Barros Jarpa">Barros Jarpa</option>
              </select>
            
              <select className="form-select opcionSelect my-1" onChange={(e)=>{setAgregado(e.target.value)}}>
                <option value="0">Seleccionar</option>
                <option value="Nada">No aplica</option>
                <option value="Palta">Palta</option>
                <option value="Cebolla">Cebolla</option>
                <option value="Mayonesa Casera">Mayonesa Casera</option>
              </select>
            
              <input type="number" className='inputnumber my-1' onChange={(e)=>{setCantidad(e.target.value)}}/>
              
            </div>
          </div>
          <div className='col-12 divBtn'>
            <button className='btn btn-warning' onClick={agregarPedido}>Agregar</button>
          </div>
          <div className='col-12 my-4'>
            <table className='table table-striped text-center' border="2" cellPadding="5" cellSpacing="0">
              <thead className=''>
                <tr className='tablaHead'>
                  <th>Sandwich</th>
                  <th>Agregado</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido, index) => (
                    <tr key={index}>
                      <td>{pedido.sandwich}</td>
                      <td>{pedido.agregado}</td>
                      <td>{pedido.cantidad}</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>Total: {totalPedido} (800 cada sandwich y 200 cada agregado)</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className='col-12'>
            <div className='text-start divTituloEntrega'>
              <h1 className='tituloDatosPedido'>Datos de la entrega</h1>
            </div>
          </div>
          
          <div className='col-12 d-flex'>
            <div className='nombreOpciones mt-3 align-items-center'>
              <h2 className='opcionTag my-2'>Nombre:</h2>
              <h2 className='opcionTag mt-4'>Direccion:</h2>
              <h2 className='opcionTag mt-4'>Telefono:</h2>
            </div>
            

          
            <div className='mt-3 align-items-center d-grid'>
              
              <input type="text" value={nombreCliente} onChange={(e)=>{setNombreCliente(e.target.value)}}/>
              <input type="text" value={direccion} onChange={(e)=>{setDireccion(e.target.value)}}/>
              <input type="number" value={telefono} placeholder='Ej: 912345678' onChange={(e)=>{setTelefono(e.target.value)}}/>
            
              
            </div>
          </div> 
          <div className='col-12 divBtn'>
            <button className='btn btn-warning' onClick={handleSubmit}>Ingresar</button>
            <button className='btn btn-warning mx-4'>Borrar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
