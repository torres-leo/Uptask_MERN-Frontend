import React, { useState } from 'react';
import Alerta from './Alerta';
import useProyectos from '../hooks/useProyectos';

const FormularioColaborador = () => {
	const [emailColaborador, setEmailColaborador] = useState('');

	const { mostrarAlerta, submitColaborador, alerta } = useProyectos();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (emailColaborador === '') {
			mostrarAlerta({ msg: 'Debes ingresar un correo', error: true });
			return;
		}
		submitColaborador(emailColaborador);
	};

	const { msg } = alerta;

	return (
		<>
			<form className='bg-white py-4 px-8 w-full md:w-3/4 lg:w-1/2 rounded-lg shadow' onSubmit={handleSubmit}>
				<p className='text-gray-500 text-sm text-center mt-1 mb-2'>
					Ingresa el correo del colaborador que deseas agregar.
				</p>
				<div className='mb-5'>
					<label htmlFor='colaborador' className='text-gray-900'>
						Correo
					</label>
					<input
						type='email'
						id='colaborador'
						placeholder='ejemplo@correo.com'
						className='border-2 w-full p-2 mt-2 rounded-xl'
						value={emailColaborador}
						onChange={(e) => setEmailColaborador(e.target.value)}
					/>
				</div>

				<div className='flex justify-center'>
					<input
						type='submit'
						className='p-2 bg-sky-600 w-full text-white uppercase text-sm font-medium tracking-wider rounded lg:flex lg:justify-center lg:w-1/2 lg:self-center cursor-pointer hover:bg-sky-700 transition-colors'
						value='Buscar Usuario'
					/>
				</div>
			</form>
			<div className='my-2'>{msg && <Alerta alerta={alerta} />}</div>
		</>
	);
};

export default FormularioColaborador;
