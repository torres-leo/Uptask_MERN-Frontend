import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { clienteAxios } from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
	const [alerta, setAlerta] = useState({});
	const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

	const params = useParams();
	// console.log(params);
	const { id } = params;
	console.log(id);

	useEffect(() => {
		const confirmarCuenta = async () => {
			try {
				const url = `/usuarios/confirmar/${id}`;
				const { data } = await clienteAxios.get(url);

				setAlerta({
					msg: data.msg,
					error: false,
				});
				setCuentaConfirmada(true);
			} catch (error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};
		// retornaremos por un arrow function para que el componente solo renderice una vez
		confirmarCuenta();
	}, []);

	const { msg } = alerta;

	return (
		<>
			<h1 className='text-4xl font-semibold text-center centro text-white capitalize'>
				Confirma tu cuenta y crea tus{' '}
				<span className='cambio-color borde bg-white px-4 py-2 rounded-xl'>Proyectos</span>
				<span className='cambio-color wave'>Proyectos</span>
			</h1>
			<div className='mt-28 md:mt-24 shadow px-0 py-4 rounded-xl bg-white'>
				{msg && <Alerta alerta={alerta} />}

				{cuentaConfirmada && (
					<Link
						to='/'
						className='text-center my-3 text-gray-900 align-middle flex justify-center items-center rounded-md text-sm font-extrabold mb-0'>
						<span className='py-2 px-4 rounded-md bg-slate-400 hover:bg-slate-500'>Inicia sesión</span>
					</Link>
				)}
			</div>
		</>
	);
};

export default ConfirmarCuenta;
