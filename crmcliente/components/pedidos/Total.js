import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';

const Total = () => {
    
    //Context resumen total
    const pedidoContext = useContext(PedidoContext);
    const { total } = pedidoContext;

    return(
        <div className="flex itemx-center mt-5 justify-between bg-white p-3 border-2 border-gray-200">
            <h2 className="text-gray-800 text-lg">Total a pagar:</h2>
            <p className="text-gray-800 mt-0">$ {total}</p>
        </div>
    );
}

export default Total;