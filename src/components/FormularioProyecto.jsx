import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

const FormularioProyecto = () => {
	const [id, setId] = useState(null);
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [fechaEntrega, setFechaEntrega] = useState('');
	const [cliente, setCliente] = useState('');

	const params = useParams();
	const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

	useEffect(() => {
		if (params.id) {
			setId(proyecto._id);
			setNombre(proyecto.nombre);
			setDescripcion(proyecto.descripcion);
			setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
			setCliente(proyecto.cliente);
		}
	}, [params]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
			mostrarAlerta({
				msg: 'Todos los campos son Obligatorios',
				error: true,
			});
			return;
		}
		// Pasar los datos hacia el Provider
		await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

		// Reiniciando los valores del formulario
		setId(null);
		setNombre('');
		setDescripcion('');
		setFechaEntrega('');
		setCliente('');
	};

	const { msg } = alerta;

	return (
		<form className='bg-white py-10 px-5 md:w-10/12 lg:w-7/12 rounded-lg shadow-lg' onSubmit={handleSubmit}>
			<div className='mb-5'>
				<label htmlFor='nombre' className='text-gray-700 text-sm font-semibold'>
					Nombre del Proyecto
				</label>
				<input
					id='nombre'
					type='text'
					className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					placeholder='Nombre del Proyecto'
					value={nombre}
					onChange={(e) => setNombre(e.target.value)}
				/>
			</div>

			<div className='mb-5'>
				<label htmlFor='descripcion' className='text-gray-700 text-sm font-semibold'>
					Descripción del Proyecto
				</label>
				<textarea
					id='descripcion'
					className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					placeholder='Descripcion del Proyecto'
					value={descripcion}
					onChange={(e) => setDescripcion(e.target.value)}
				/>
			</div>

			<div className='mb-5'>
				<label htmlFor='fecha-entrega' className='text-gray-700 text-sm font-semibold'>
					Fecha de entrega del Proyecto
				</label>
				<input
					id='fecha-entrega'
					type='date'
					className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					value={fechaEntrega}
					onChange={(e) => setFechaEntrega(e.target.value)}
				/>
			</div>

			<div className='mb-5'>
				<label htmlFor='cliente' className='text-gray-700 text-sm font-semibold'>
					Nombre del Cliente
				</label>
				<input
					id='cliente'
					type='text'
					className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					placeholder='Nombre del Cliente'
					value={cliente}
					onChange={(e) => setCliente(e.target.value)}
				/>
			</div>
			<input
				type='submit'
				value={id ? 'Guardar Cambios' : 'Crear Proyecto'}
				className='bg-sky-600 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 uppercase tracking-widest transition-colors'
			/>
			{msg && <Alerta alerta={alerta} />}
		</form>
	);
};

export default FormularioProyecto;
