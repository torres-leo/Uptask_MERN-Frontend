import React, { useEffect } from 'react';
import useProyectos from '../hooks/useProyectos';
import { useParams, Link } from 'react-router-dom';
import FormularioProyecto from '../components/FormularioProyecto';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faArrowRotateBack } from '@fortawesome/free-solid-svg-icons';

const EditarProyecto = () => {
	const params = useParams();
	const { obtenerProyecto, proyecto, cargando, eliminarProyecto } = useProyectos();

	const { nombre } = proyecto;

	useEffect(() => {
		return () => obtenerProyecto(params.id);
	}, []);

	const handleClickEliminar = () => {
		if (confirm('¿Deseas Eliminar este Proyecto?')) {
			eliminarProyecto(params.id);
		} else {
			console.log('No');
		}
	};

	if (cargando) return <Spinner />;

	return (
		<>
			<div className='flex justify-start mb-4'>
				<Link
					to={`/proyectos/${proyecto._id}`}
					className='p-2 bg-green-500 rounded-lg text-white font-medium flex gap-1 justify-start items-center'>
					<FontAwesomeIcon icon={faArrowRotateBack} />
					Volver
				</Link>
			</div>
			<div className='flex justify-between items-center'>
				<h1 className='font-black text-3xl text-gray-700 md:leading-relaxed'>
					Editar Proyecto: <span className='underline underline-offset-8 text-gray-900'>{nombre}</span>
				</h1>
				<div>
					<button
						className='p-2 bg-red-600 flex items-center gap-2 rounded-xl text-lg font-black uppercase transition-colors hover:bg-red-700 text-white'
						onClick={handleClickEliminar}>
						Eliminar
						<FontAwesomeIcon icon={faTrashCan} className='text-2xl' />
					</button>
				</div>
			</div>

			<div className='mt-10 flex justify-center'>
				<FormularioProyecto />
			</div>
		</>
	);
};

export default EditarProyecto;
