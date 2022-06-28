import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { clienteAxios } from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const NuevoPassword = () => {
	const [password, setPassword] = useState('');
	const [passwordModificado, setPasswordModificado] = useState(false);
	const [tokenValido, setTokenValido] = useState(false);
	const [alerta, setAlerta] = useState({});

	const params = useParams();
	const { token } = params;

	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await clienteAxios(`/usuarios/olvide-password/${token}`);
				setTokenValido(true);
			} catch (error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};
		return () => comprobarToken();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password.length < 6) {
			setAlerta({
				msg: 'La contraseña debe contener al menos 6 caracteres',
				error: true,
			});
			setTimeout(() => {
				setAlerta({});
			}, 6000);
			return;
		}

		try {
			const url = `/usuarios/olvide-password/${token}`;

			const { data } = await clienteAxios.post(url, { password });

			setAlerta({
				msg: data.msg,
				error: false,
			});
			setPasswordModificado(true);
			setTimeout(() => {
				setAlerta({});
			}, 6000);
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const { msg } = alerta;

	return (
		<>
			<h1 className='text-4xl font-semibold text-center centro text-white capitalize'>
				Reestablece tu contraseña y no pierdas acceso a tus{' '}
				<span className='cambio-color borde bg-white px-4 py-2 rounded-xl'>Proyectos</span>
				<span className='cambio-color wave'>Proyectos</span>
			</h1>

			{tokenValido ? (
				<form className='mt-20 bg-slate-200 shadow rounded-md px-10 py-5' onSubmit={handleSubmit}>
					<div className='my-5'>
						<label htmlFor='email' className=' text-gray-700 block font-bold text-lg'>
							Nueva contraseña
						</label>
						<input
							type='password'
							id='password'
							placeholder='Ingresa tu nueva contraseña '
							className='w-full mt-1 p-2 rounded-md bg-gray-50'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<input
						type='submit'
						value='Actualizar contraseña'
						className='bg-sky-700 w-full py-3 mt-2 mb-5 text-white uppercase font-bold rounded-md tracking-wider hover:bg-sky-800 hover:cursor-pointer transition-colors'
					/>
					{msg && <Alerta alerta={alerta} />}
				</form>
			) : (
				alerta.error && (
					<div className='mt-20'>
						<Alerta alerta={alerta} />{' '}
					</div>
				)
			)}
			{passwordModificado && (
				<Link
					to='/'
					className='text-center my-3 text-gray-900 align-middle flex justify-center items-center rounded-md text-sm font-extrabold mb-0'>
					<span className='py-2 px-4 rounded-md bg-slate-400 hover:bg-slate-500'>Inicia sesión</span>
				</Link>
			)}
		</>
	);
};

export default NuevoPassword;
