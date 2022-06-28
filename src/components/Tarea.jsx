import React from 'react';
import { formatearFecha } from '../helpers';
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleCheck, faCircleXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Tarea = ({ tarea }) => {
	const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();
	const { nombre, descripcion, prioridad, fechaEntrega, _id, estado } = tarea;

	const admin = useAdmin();

	return (
		<div className='p-4 border-b-8 last:border-0 md:flex md:justify-between md:gap-8 md:items-center'>
			<div>
				<div className='lg:flex lg:items-center gap-1'>
					<p className='text-xl text-gray-900 flex items-center'>{nombre}</p>
					<span className={`text-xs text-white p-1 rounded ${!estado ? 'bg-red-700' : 'bg-green-600'}`}>
						{!estado ? 'Tarea incompleta' : 'Tarea completada'}
					</span>
				</div>
				<p className='mt-1 text-sm'>{descripcion}</p>
				{estado && (
					<p className='text-xs text-gray-600 flex items-center gap-1'>
						Completada por:
						<span className='uppercase tracking-wide italic p-1 roundedtext-black font-medium underline underline-offset-1'>
							{tarea.completado?.nombre}
						</span>
					</p>
				)}
				<p className='mt-1 text-sm text-gray-600'>
					Fecha de Entrega: <span className='text-gray-800'>{formatearFecha(fechaEntrega)}</span>
				</p>
				<p className='mt-1 text-sm uppercase text-gray-600'>
					Prioridad:
					<span
						className={`${
							prioridad === 'Alta' ? 'bg-red-500' : prioridad === 'Media' ? 'bg-orange-500' : 'bg-green-600'
						} p-1 ml-2 rounded text-white font-medium`}>
						{prioridad}
					</span>
				</p>
			</div>

			<div className='flex justify-between md:flex-col md:gap-2 mt-2'>
				{admin && (
					<button
						className='text-gray-600 font-normal flex items-center justify-center gap-1 shadow p-2 rounded hover:bg-green-100 transition-colors'
						onClick={() => handleModalEditarTarea(tarea)}>
						Editar <FontAwesomeIcon icon={faPenToSquare} />
					</button>
				)}

				<button
					className={`${
						!estado ? 'text-sky-500 hover:bg-sky-100' : 'text-red-400 hover:bg-red-100'
					} font-normal flex justify-end items-center gap-2 shadow p-2 rounded  transition-colors`}
					onClick={() => completarTarea(_id)}>
					{!estado ? (
						<>
							{' '}
							<p className='text-sm uppercase font-medium'>Completar</p> <FontAwesomeIcon icon={faCircleCheck} />{' '}
						</>
					) : (
						<>
							<p className='text-xs uppercase font-medium'>
								<span className='block'>Marcar</span> Incompleta
							</p>
							<FontAwesomeIcon icon={faCircleXmark} />
						</>
					)}
				</button>

				{admin && (
					<button
						className='text-red-600 bg-red-100 font-normal flex items-center gap-1 justify-center shadow p-2 rounded hover:bg-red-500 hover:text-white transition-colors'
						title='Eliminar Tarea'
						onClick={() => handleModalEliminarTarea(tarea)}>
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				)}
			</div>
		</div>
	);
};

export default Tarea;
