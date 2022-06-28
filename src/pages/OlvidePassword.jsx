import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { clienteAxios } from '../config/clienteAxios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Alerta from '../components/Alerta';

const OlvidePassword = () => {
	const [email, setEmail] = useState('');
	const [alerta, setAlerta] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email === '' || email.length < 8) {
			setAlerta({
				msg: 'Introduzca un correo válido. El correo debe contener al menos 8 caracteres.',
				error: true,
			});
			setTimeout(() => {
				setAlerta({});
			}, 6000);
			return;
		}

		try {
			const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
				email,
			});

			setAlerta({
				msg: data.msg,
				error: false,
			});
			setTimeout(() => {
				setAlerta({});
			}, 6000);
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
				Recupera tu contraseña y accede a tus{' '}
				<span className='cambio-color borde bg-white px-4 py-2 rounded-xl'>Proyectos</span>
				<span className='cambio-color wave'>Proyectos</span>
			</h1>

			<form className='mt-24 bg-slate-200 shadow rounded-md px-10 py-5' onSubmit={handleSubmit}>
				<p className='text-gray-500 m-0 p-0 leading-4 text-sm'>
					Ingresa tu correo y en unos minutos estarás recibiendo las instrucciones para reestablecer tu contraseña.
				</p>
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

				<button
					type='submit'
					className='bg-sky-700 w-full py-3 mt-2 mb-5 text-white uppercase font-bold rounded-md tracking-widest hover:bg-sky-800 hover:cursor-pointer transition-colors flex justify-center items-center'>
					Enviar correo
					<FontAwesomeIcon icon={faEnvelope} className='ml-2 text-xl' />
				</button>
				{msg && <Alerta alerta={alerta} />}
			</form>

			<nav className='lg:flex lg:justify-between sm:items-center sm:text-center mt-5'>
				<Link
					to='/registrar'
					className='block text-center text-slate-100 uppercase text-sm font-extrabold hover:text-cyan-300'>
					¿No tienes una cuenta? ¡Regístrate!
				</Link>
				<Link
					to='/'
					className='block text-center my-3 text-slate-100 uppercase text-sm font-extrabold hover:text-cyan-300'>
					¿Ya tienes una cuenta? ¡Inicia sesión!
				</Link>
			</nav>
		</>
	);
};

export default OlvidePassword;
