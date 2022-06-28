import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from '../components/Alerta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const PRIORIDAD = ['Baja', 'Media', 'Alta'];

const TareaFormModal = () => {
	const [id, setId] = useState('');
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [fechaEntrega, setFechaEntrega] = useState('');
	const [prioridad, setPrioridad] = useState('');

	const params = useParams();

	const { tareaFormModal, handleModalTarea, submitTarea, mostrarAlerta, alerta, tarea } = useProyectos();

	useEffect(() => {
		if (tarea?._id) {
			setId(tarea._id);
			setNombre(tarea.nombre);
			setDescripcion(tarea.descripcion);
			setFechaEntrega(tarea.fechaEntrega?.split('T')[0]);
			setPrioridad(tarea.prioridad);
			return;
		}
		setId('');
		setNombre('');
		setDescripcion('');
		setFechaEntrega('');
		setPrioridad('');
	}, [tarea]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!nombre) {
			const divAlertaNombre = document.getElementById('nombrep');
			const existeErrorNombre = document.querySelector('.error-nombre');
			const inputNombre = document.getElementById('nombre');

			if (!existeErrorNombre) {
				const alertaNombre = document.createElement('div');
				alertaNombre.classList.add('error-nombre', 'text-red-500', 'text-xs', 'mt-1');
				inputNombre.classList.add('border', 'border-red-400');
				alertaNombre.textContent = 'Debes ingresar un nombre a la Tarea.';
				divAlertaNombre.style.setProperty('display', 'block');
				divAlertaNombre.appendChild(alertaNombre);

				setTimeout(() => {
					inputNombre.classList.remove('border-red-400');
					alertaNombre.remove();
				}, 5000);
			}
		} else if (!descripcion) {
			const divAlertaDescripcion = document.getElementById('descripcionp');
			const existeErrorDescripcion = document.querySelector('.error-descripcion');
			const textarea = document.getElementById('descripcion');

			if (!existeErrorDescripcion) {
				const alertaDescripcion = document.createElement('div');
				alertaDescripcion.classList.add('error-descripcion', 'text-red-500', 'text-xs');
				textarea.classList.add('border-red-400');
				alertaDescripcion.textContent = 'Ingresa una descripcion a la tarea que quieres agregar.';
				divAlertaDescripcion.style.setProperty('display', 'block');
				divAlertaDescripcion.appendChild(alertaDescripcion);

				setTimeout(() => {
					textarea.classList.remove('border-red-400');
					alertaDescripcion.remove();
				}, 5000);
			}
		} else if (!fechaEntrega) {
			const divAlertaFecha = document.getElementById('fechap');
			const existeErrorFecha = document.querySelector('.error-fecha');
			const inputFecha = document.getElementById('fecha-entrega');

			if (!existeErrorFecha) {
				const alertaFecha = document.createElement('div');
				alertaFecha.classList.add('error-fecha', 'text-red-500', 'text-xs', 'mt-1');
				inputFecha.classList.add('border-red-400');
				alertaFecha.textContent = 'Selecciona la fecha de entrega de la tarea.';
				divAlertaFecha.style.setProperty('display', 'block');
				divAlertaFecha.appendChild(alertaFecha);

				setTimeout(() => {
					inputFecha.classList.remove('border-red-400');
					alertaFecha.remove();
				}, 5000);
			}
		} else if (!prioridad) {
			mostrarAlerta({
				msg: 'Selecciona la Prioridad de la tarea',
				error: true,
			});
		} else {
			await submitTarea({ id, nombre, descripcion, fechaEntrega, prioridad, proyecto: params.id });

			setId('');
			setNombre('');
			setDescripcion('');
			setFechaEntrega('');
			setPrioridad('');
		}
	};

	const { msg } = alerta;

	return (
		<Transition.Root show={tareaFormModal} as={Fragment}>
			<Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={handleModalTarea}>
				<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
						&#8203;
					</span>

					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
						<div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
							<div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
								<button
									type='button'
									className='bg-white rounded-md text-red-500 hover:text-red-700 focus:outline-none '
									onClick={() => {
										handleModalTarea();
									}}>
									<span className='sr-only'>Cerrar</span>
									<svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' viewBox='0 2 20 20' fill='currentColor'>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
											clipRule='evenodd'
										/>
									</svg>
								</button>
							</div>

							{/* AQUI EMPIEZA TODO EL CONTENIDO QUE TENDRA EL MODAL */}
							<div className='sm:flex sm:items-start'>
								<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
									<Dialog.Title
										as='h2'
										className='text-xl leading-6 font-bold text-gray-700 text-center uppercase tracking-widest underline underline-offset-8'>
										{id ? 'Editar Tarea' : 'Crear Tarea'}
									</Dialog.Title>
									<form className='pt-6 ' onSubmit={handleSubmit} id='formulario'>
										<legend className='text-gray-500 uppercase text-xs tracking-wide m-0 mb-2'>
											Ingresa los Datos de la Tarea
										</legend>
										<div className='mb-2'>
											<label htmlFor='nombre' className='text-gray-700 block font-medium text-md'>
												Nombre
											</label>
											<input
												type='text'
												id='nombre'
												className='border-2 border-gray-300 p-1 rounded-md w-full mt-1 placeholder-gray-400'
												placeholder='ej: agregar datos al footer'
												value={nombre}
												onChange={(e) => setNombre(e.target.value)}
											/>
											<div id='nombrep' className='hidden'></div>
										</div>
										<div className='mb-2'>
											<label htmlFor='descripcion' className='text-gray-700 block font-medium text-md'>
												Descripción
											</label>
											<textarea
												id='descripcion'
												className='border-2 border-gray-300 p-1 rounded-md w-full mt-1 placeholder-gray-400'
												placeholder='Agrega una breve descripción a tu tarea'
												value={descripcion}
												onChange={(e) => setDescripcion(e.target.value)}
											/>
											<div id='descripcionp' className='hidden'></div>
										</div>
										<div className='mb-2'>
											<label htmlFor='fecha-entrega' className='text-gray-700 block font-medium text-md'>
												Fecha de Entrega
											</label>
											<input
												type='date'
												id='fecha-entrega'
												className='border-2 border-gray-300 p-1 rounded-md w-full mt-1 placeholder-gray-400'
												value={fechaEntrega}
												onChange={(e) => setFechaEntrega(e.target.value)}
											/>
											<div id='fechap' className='hidden'></div>
										</div>
										<div className='mb-5'>
											<label htmlFor='prioridad' className='text-gray-700  block font-medium text-md'>
												Selecciona la Prioridad
											</label>
											<select
												id='prioridad'
												className='border-2 border-gray-300 p-1 rounded-md w-full mt-1 placeholder-gray-400 text-center text-gray-800'
												value={prioridad}
												onChange={(e) => setPrioridad(e.target.value)}>
												<option value='' className='text-gray-500'>
													-- Seleccionar --
												</option>
												{PRIORIDAD.map((opcion) => (
													<option key={opcion}>{opcion}</option>
												))}
											</select>
											<div id='prioridadp' className='hidden'></div>
										</div>
										{/* <input
											type='submit'
											className='bg-sky-600 hover:bg-sky-700 w-full text-white p-2 uppercase tracking-widest font-medium cursor-pointer transition-colors rounded text-sm'
											value='Crear Tarea'
										/> */}
										<button
											type='submit'
											className='bg-sky-600 hover:bg-sky-700 w-full flex justify-center gap-3 items-center text-white p-2 uppercase tracking-widest font-bold cursor-pointer transition-colors rounded text-sm'>
											{id ? 'Guardar Cambios' : 'Crear Tarea'}
											<FontAwesomeIcon icon={faFile} className='text-lg' />
										</button>
										{msg && <Alerta alerta={alerta} />}
									</form>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default TareaFormModal;
