import React from 'react';
import { Link } from 'react-router-dom';
import { formatearFecha } from '../helpers';
import useAuth from '../hooks/useAuth';

const PreviewProyecto = ({ proyecto }) => {
	const { auth } = useAuth();

	const { nombre, _id, cliente, createdAt, fechaEntrega, creador } = proyecto;

	return (
		<div className='border-b-2 p-3 sm:items-center sm:flex sm:justify-between'>
			<div className='flex-1'>
				<p>
					{nombre}
					<span className='text-sm ml-2 rounded text-gray-500 p-1 uppercase font-bold'>{cliente}</span>
				</p>
				<p className='text-xs text-gray-600'>
					Creado: <span className='text-black'>{formatearFecha(createdAt.split('T')[0])}</span>
				</p>
				<p className='italic text-gray-700 text-sm'>
					<span className=''>Entrega del Proyecto:</span>
					<span className='text-sm ml-1 text-black font-normal underline underline-offset-2'>
						{formatearFecha(fechaEntrega)}
					</span>
				</p>
			</div>

			<div className='block text-center lg:flex lg:gap-6 lg:items-center'>
				{auth._id !== creador && (
					<p className='text-xs uppercase p-1 bg-gray-300 italic tracking-wider font-medium text-gray-800 rounded mt-3 mb-1 sm:mb-2 sm:mt-0 lg:mt-0 lg:mb-0'>
						Colaborador
					</p>
				)}
				<Link
					to={`${_id}`}
					className='text-white bg-green-600 p-2 text-center rounded font-bold uppercase inline-block mt-2 w-full sm:flex sm:items-center sm:w-auto sm:mt-0 hover:bg-green-700'>
					Ver Proyecto
				</Link>
			</div>
		</div>
	);
};

export default PreviewProyecto;
