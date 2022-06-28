import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';
import TareaFormModal from '../components/TareaFormModal';
import EliminarTareaModal from '../components/EliminarTareaModal';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import Tarea from '../components/Tarea';
import Colaborador from '../components/Colaborador';
import Alerta from '../components/Alerta';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlusCircle, faFile, faUsers } from '@fortawesome/free-solid-svg-icons';

// SOCKETIO PARA CAMBIOS EN TIEMPO REAL
import io from 'socket.io-client';
let socket;

const Proyecto = () => {
	const params = useParams();

	const {
		obtenerProyecto,
		proyecto,
		cargando,
		handleModalTarea,
		submitTareasProyecto,
		eliminarTareaProyecto,
		actualizarTareaProyecto,
		cambiarEstadoTarea,
		alerta,
	} = useProyectos();

	const admin = useAdmin();

	const { nombre, descripcion } = proyecto;

	useEffect(() => {
		return () => obtenerProyecto(params.id);
	}, []);

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL);
		socket.emit('abrir proyecto', params.id);
	}, []);

	useEffect(() => {
		socket.on('respuesta', (persona) => {
			console.log(persona);
		});
	});

	useEffect(() => {
		socket.on('mostrando tarea', (tareaNueva) => {
			if (tareaNueva.proyecto === proyecto._id) {
				submitTareasProyecto(tareaNueva);
			}
		});

		socket.on('tarea eliminada', (tareaEliminada) => {
			if (tareaEliminada.proyecto === proyecto._id) {
				eliminarTareaProyecto(tareaEliminada);
			}
		});

		socket.on('tarea actualizada', (tareaActualizada) => {
			if (tareaActualizada.proyecto._id === proyecto._id) {
				actualizarTareaProyecto(tareaActualizada);
			}
		});

		socket.on('nuevo estado', (nuevoEstadoTarea) => {
			if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
				cambiarEstadoTarea(nuevoEstadoTarea);
			}
		});
	});

	if (cargando) return <Spinner />;

	const { msg } = alerta;

	return (
		<>
			<h1 className='font-black text-3xl'>{nombre}</h1>
			<div className='flex flex-col md:flex-row items-center gap-4 mt-3'>
				{admin && (
					<Link
						to={`/proyectos/editar/${params.id}`}
						className='p-2 flex items-center gap-2 rounded w-full md:w-auto text-sm font-medium uppercase text-gray-500 hover:bg-gray-300 hover:text-black transition-colors shadow text-center justify-center'>
						Editar
						<FontAwesomeIcon icon={faPenToSquare} />
					</Link>
				)}

				{admin && (
					<button
						onClick={handleModalTarea}
						type='button'
						className='text-sm p-2 w-full md:w-auto text-indigo-500 rounded font-medium text-center hover:bg-gray-300 transition-colors uppercase flex items-center justify-center gap-2 shadow'>
						Nueva Tarea
						<FontAwesomeIcon icon={faPlusCircle} className='text-lg' />
					</button>
				)}
			</div>

			<div className='mt-4'>
				<p className='text-xl uppercase text-gray-700 underline underline-offset-8 font-normal tracking-wider'>
					Descripción del Proyecto
				</p>
				<p className='text-md font-light tracking-wide mt-2 p-2 sm:leading-5'>{descripcion}.</p>
			</div>

			{/* {msg && <Alerta alerta={alerta} />} */}

			<p className='font-normal text-xl mt-4 uppercase tracking-wider underline underline-offset-8 text-gray-700'>
				Registro de Tareas <FontAwesomeIcon icon={faFile} className='text-gray-600' />
			</p>

			<div className='bg-gray-100 shadow-lg mt-4 rounded-md'>
				{proyecto.tareas?.length ? (
					proyecto.tareas?.map((tarea) => <Tarea key={tarea._id} tarea={tarea} />)
				) : (
					<p className='text-center my-4 p-5 uppercase tracking-wide'>No hay tareas en este Proyecto</p>
				)}
			</div>

			<div className='md:flex md:items-center md:justify-between block mt-6'>
				<p className='font-normal text-xl text-gray-700 tracking-wide uppercase underline underline-offset-8'>
					Colaboradores <FontAwesomeIcon icon={faUsers} />
				</p>
				{admin && (
					<div className='flex'>
						<Link
							to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
							className='text-gray-500 text-sm uppercase shadow p-2 hover:bg-gray-300 hover:text-black font-bold flex items-center justify-start gap-1 mt-3'>
							Agregar <FontAwesomeIcon icon={faPlusCircle} />
						</Link>
					</div>
				)}
			</div>

			<div className='bg-gray-100 shadow-lg mt-4 rounded-md'>
				{proyecto.colaboradores?.length ? (
					proyecto.colaboradores?.map((colaborador) => <Colaborador key={colaborador._id} colaborador={colaborador} />)
				) : (
					<p className='text-center my-4 p-5 uppercase tracking-wide'>No hay Colaboradores en este proyecto</p>
				)}
			</div>

			<TareaFormModal />
			<EliminarTareaModal />
			<ModalEliminarColaborador />
		</>
	);
};

export default Proyecto;
