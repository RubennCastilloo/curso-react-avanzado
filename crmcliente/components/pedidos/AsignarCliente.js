import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const clientes = [
    { id: 1, nombre: 'Ruben' },
    { id: 2, nombre: 'Alexandra' },
    { id: 3, nombre: 'Abisai' }
  ]


const animatedComponents = makeAnimated();


const AsignarCliente = () => {
    const [ cliente, setCliente ] = useState([]);

    useEffect(() => {
        console.log(cliente);
    }, [cliente]);

    const seleccionarCliente = clientes => {
        setCliente(clientes);
    }

    return (
                <Select 
                    options={ clientes }
                    isMulti={true}
                    components={animatedComponents}
                    onChange={ (opcion) => seleccionarCliente(opcion)}
                    getOptionValue={ (opciones) => opciones.id }
                    getOptionLabel={ opciones => opciones.nombre }
                    placeholder="Busque o seleccione el cliente"
                    noOptionsMessage={ () => "No hay resultados"}
                />
    );
}

export default AsignarCliente;