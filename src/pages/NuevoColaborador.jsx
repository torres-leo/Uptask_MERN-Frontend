import React, { useEffect } from 'react';
import FormularioColaborador from '../components/FormularioColaborador';
import useProyectos from '../hooks/useProyectos';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBack } from '@fortawesome/free-solid-svg-icons';

const NuevoColaborador = () => {
	const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador } = useProyectos();
	const params = useParams();
	useEffect(() => {
		return () => obtenerProyecto(params.id);
	}, []);

	if (!proyecto?._id) return <div className='text-center text-xl text-red-500 uppercase'>Proyecto no encontrado</div>;

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
			{proyecto.nombre && (
				<>
					{' '}
					<h1 className='text-3xl font-black'> {proyecto.nombre}</h1>
					<h2 className='mt-6 text-2xl text-gray-700'>Agregar Colaborador</h2>
					<div className='mt-5 grid place-items-center'>
						<FormularioColaborador />
					</div>
				</>
			)}

			{cargando
				? ''
				: colaborador?._id && (
						<div className='flex justify-center mt-8'>
							<div className='bg-white rounded-md shadow py-4 px-6 w-full md:w-3/4 lg:w-1/2'>
								<h2 className='text-center mb-2 text-xl font-medium border-b-2'>Resultado:</h2>
								<div className='text-center sm:flex sm:items-center sm:justify-between bg-slate-100 rounded p-1'>
									<div className='flex justify-center sm:justify-between gap-1 md:gap-2 lg:gap-4'>
										<p className='p-2'>Usuario: </p>
										<p className='p-2'>{colaborador.nombre}</p>
									</div>
									<div className='sm:mt-0'>
										<button
											type='button'
											className='p-2 bg-slate-500 rounded text-white hover:bg-slate-600 text-sm uppercase'
											onClick={() =>
												agregarColaborador({
													email: colaborador.email,
												})
											}>
											Agregar colaborador
										</button>
									</div>
								</div>
							</div>
						</div>
				  )}
		</>
	);
};

export default NuevoColaborador;
