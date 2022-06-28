import React from 'react';
import useProyectos from '../hooks/useProyectos';
import PreviewProyecto from '../components/PreviewProyecto';
import { useEffect } from 'react';

const Proyectos = () => {
	const { proyectos, obtenerProyectos } = useProyectos();
	useEffect(() => {
		obtenerProyectos();
	}, []);

	return (
		<>
			<h1 className='text-4xl font-black'>Proyectos</h1>
			<div className='bg-white mt-8 shadow rounded'>
				{proyectos.length ? (
					proyectos.map((proyecto) => <PreviewProyecto key={proyecto._id} proyecto={proyecto} />)
				) : (
					<p className='text-center text-gray-600 uppercase font-bold tracking-wide p-4'>No hay Proyectos aún</p>
				)}
			</div>
		</>
	);
};

export default Proyectos;
