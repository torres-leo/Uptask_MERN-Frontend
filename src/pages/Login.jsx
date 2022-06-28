import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Alerta from '../components/Alerta';
import { clienteAxios } from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alerta, setAlerta] = useState({});

	const { setAuth } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([email, password].includes('')) {
			setAlerta({
				msg: 'Todos los campos son Obligatorios',
				error: true,
			});
			setTimeout(() => {
				setAlerta({});
			}, 6000);
			return;
		}

		try {
			const { data } = await clienteAxios.post('/usuarios/login', { email, password });
			setAlerta({});

			localStorage.setItem('token', data.token);
			setAuth(data);
			navigate('/proyectos');
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
			setTimeout(() => {
				setAlerta({});
			}, 6000);
		}
	};

	const { msg } = alerta;

	return (
		<>
			<h1 className='text-4xl font-semibold text-center centro text-white capitalize'>
				Inicia sesión y Administra tus{' '}
				<span className='cambio-color borde bg-white px-4 py-2 rounded-xl'>Proyectos</span>
				<span className='cambio-color wave'>Proyectos</span>
			</h1>

			<form className='mt-28 bg-slate-200 shadow rounded-md px-10 py-5' onSubmit={handleSubmit}>
				<div className='my-5'>
					<label htmlFor='email' className=' text-gray-700 block font-bold text-lg'>
						Correo
					</label>
					<input
						type='email'
						id='email'
						placeholder='ejemplo@ejemplo.com'
						className='w-full mt-1 p-2 rounded-md bg-gray-50'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='my-5'>
					<label htmlFor='email' className=' text-gray-700 block font-bold text-xl'>
						Contraseña
					</label>
					<input
						type='password'
						id='password'
						placeholder='Ingresa tu contraseña '
						className='w-full mt-1 p-2 rounded-md bg-gray-50'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button
					type='submit'
					className='bg-sky-700 w-full py-3 mt-2 mb-5 text-white uppercase font-bold rounded-md tracking-widest hover:bg-sky-800 hover:cursor-pointer transition-colors flex justify-center items-center'>
					Iniciar Sesión
					<FontAwesomeIcon icon={faRightToBracket} className='ml-2 text-xl' />
				</button>

				{msg && <Alerta alerta={alerta} />}
			</form>

			<nav className='sm:flex sm:justify-between sm:items-center sm:text-center mt-5'>
				<Link
					to='registrar'
					className='block text-center text-slate-100 uppercase text-sm font-extrabold hover:text-cyan-300'>
					¿No tienes una cuenta? ¡Regístrate!
				</Link>
				<Link
					to='olvide-password'
					className='block text-center text-slate-100 uppercase text-sm font-extrabold hover:text-cyan-300'>
					Olvidé mi Contraseña
				</Link>
			</nav>
		</>
	);
};

export default Login;
