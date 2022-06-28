import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { clienteAxios } from '../config/clienteAxios.js';
import Alerta from '../components/Alerta';

const Registrar = () => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [alerta, setAlerta] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([nombre, email, password, repetirPassword].includes('')) {
			setAlerta({
				msg: 'Todos los campos son Obligatorios',
				error: true,
			});
			setTimeout(() => {
				setAlerta({ msg: '', error: false });
			}, 5000);

			return;
		}

		if (password !== repetirPassword) {
			setAlerta({
				msg: 'Las contraseñas no son iguales',
				error: true,
			});
			setTimeout(() => {
				setAlerta({ msg: '', error: false });
			}, 5000);
			return;
		}

		if (password.length < 6) {
			setAlerta({
				msg: 'La contraseña debe contener al menos 6 caracteres',
				error: true,
			});
			setTimeout(() => {
				setAlerta({ msg: '', error: false });
			}, 5000);
			return;
		}

		setAlerta({});

		// Crear el usuario en la API
		try {
			const { data } = await clienteAxios.post(`/usuarios`, {
				nombre,
				email,
				password,
			});

			setAlerta({
				msg: data.msg,
				error: false,
			});

			setTimeout(() => {
				setAlerta({});
				setNombre('');
				setEmail('');
				setPassword('');
				setRepetirPassword('');
			}, 5000);
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
				Crea tu cuenta y administra tus{' '}
				<span className='cambio-color borde bg-white px-4 py-2 rounded-xl'>Proyectos</span>
				<span className='cambio-color wave'>Proyectos</span>
			</h1>

			<form className='mt-24 bg-slate-200 shadow rounded-md px-10 py-5' onSubmit={handleSubmit}>
				<div className='my-5'>
					<label htmlFor='nombre' className=' text-gray-700 block font-bold text-lg'>
						Nombre
					</label>
					<input
						type='text'
						id='nombre'
						placeholder='Ingresa tu nombre'
						className='w-full mt-1 p-2 rounded-md bg-gray-50'
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>

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
					<label htmlFor='password' className=' text-gray-700 block font-bold text-lg'>
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

				<div className='my-5'>
					<label htmlFor='password2' className=' text-gray-700 block font-bold text-lg'>
						Repetir contraseña
					</label>
					<input
						type='password'
						id='password2'
						placeholder='Ingresa nuevamente tu contraseña'
						className='w-full mt-1 p-2 rounded-md bg-gray-50'
						value={repetirPassword}
						onChange={(e) => setRepetirPassword(e.target.value)}
					/>
				</div>

				<input
					type='submit'
					value='Crear cuenta'
					className='bg-sky-700 w-full py-3 mt-2 mb-1 text-white uppercase font-bold rounded-md tracking-wider hover:bg-sky-800 hover:cursor-pointer transition-colors'
				/>
				{msg && <Alerta alerta={alerta} />}
			</form>

			<nav className='sm:flex sm:justify-center sm:items-center sm:text-center mt-5'>
				<Link
					to='/'
					className='block text-center my-3 text-slate-100 uppercase text-sm font-extrabold hover:text-cyan-300'>
					¿Ya tienes una cuenta? ¡Inicia sesión!
				</Link>
			</nav>
		</>
	);
};

export default Registrar;
