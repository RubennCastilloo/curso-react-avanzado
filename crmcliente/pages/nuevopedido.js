import React from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';


  


const Pedidos = () => {

    

    return(
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear nuevo Pedido</h1>

            <AsignarCliente />
            <AsignarCliente />
            <AsignarCliente />
        </Layout>

        
    );
}

export default Pedidos;