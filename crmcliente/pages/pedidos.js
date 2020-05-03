import Layout from '../components/Layout';
import Pedido from '../components/Pedido';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';

const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor{
            id
            pedido {
                id
                cantidad
                nombre
            }
            cliente {
                id
                nombre
                apellido
                email
                telefono
            }
            vendedor
            total
            estado
        }
    }
`;

const Pedidos = () => {

    const { data, loading, error } = useQuery(OBTENER_PEDIDOS);
    console.log(data);

    if(loading) return 'Cargando...';

    const { obtenerPedidosVendedor } = data;



    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
    
                <Link href="/nuevopedido">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
                        Nuevo Pedido
                    </a>
                </Link>
                { obtenerPedidosVendedor.length === 0 ? (
                    <p className="mt-5 text-center text-2xl">No hay pedidos para mostrar</p>
                ) : (
                    obtenerPedidosVendedor.map(pedido => (
                        <Pedido 
                            key={pedido.id}
                            pedido={pedido}
                        />
                    ))
                )}
            </Layout>
        </div>
    );
}

export default Pedidos;