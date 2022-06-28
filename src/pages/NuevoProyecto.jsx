import React from 'react';
import FormularioProyecto from '../components/FormularioProyecto';

const NuevoProyecto = () => {
	return (
		<>
			<h1 className='text-3xl font-black uppercase tracking-wider'>Crear Proyecto</h1>
			<div className='mt-4 flex justify-center'>
				<FormularioProyecto />
			</div>
		</>
	);
};

export default NuevoProyecto;
