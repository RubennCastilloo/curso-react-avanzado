import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!) {
        eliminarProducto(id: $id)
    }
`;

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
                id
                nombre
                precio
                existencia
                creado
        }
    }
`;

const Producto = ({producto}) => {

    const { nombre, precio, existencia, id } = producto;

    //Mutation para eliminar productos
    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
        update(cache){
            const { obtenerProductos } = cache.readQuery({
                query: OBTENER_PRODUCTOS
            });

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter( productoActual => productoActual.id !== id)
                }
            });
        }
    });

    const confirmarEliminarProducto = () => {
        Swal.fire({
            title: 'Deseas eliminar a este producto?',
            text: "Esta accion no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3E821C',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, cancelar'
          }).then( async (result) => {
            if (result.value) {
                try {
                    //Eliminar producto de la base de datos
                    const { data } = await eliminarProducto({
                        variables: {
                            id
                        }
                    });
                    console.log(data);

                    Swal.fire(
                        'Correcto',
                        data.eliminarProducto,
                        'success'
                    );
                } catch (error) {   
                    console.log(error);
                }
                

              
            }
          })
    }

    const editarProducto = () => {
        Router.push({
            pathname: "/editarproducto/[id]",
            query: { id }
        })
    }

    return(
        <tr>
            <td className="border px-4 py-2">{nombre}</td>
            <td className="border px-4 py-2">{existencia} Piezas</td>
            <td className="border px-4 py-2">$ {precio}</td>
            <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center item center bg-red-800 py-2 px-4 w-full text-white font-bold rounded text-xs uppercase"
                        onClick={() => confirmarEliminarProducto()}
                    >
                        Eliminar <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 ml-2"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </button>
            </td>
            <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center item center bg-green-600 py-2 px-4 w-full text-white font-bold rounded text-xs uppercase"
                        onClick={() => editarProducto()}
                    >
                        Editar <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 ml-2"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </button>
            </td>
        </tr>
    );
}

export default Producto;