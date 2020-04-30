import Layout from '../components/Layout';
import Link from 'next/link';

const Pedidos = () => (
    <div>
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

            <Link href="/nuevopedido">
                <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
                    Nuevo Pedido
                </a>
            </Link>
        </Layout>
    </div>
)

export default Pedidos;