import React from 'react';
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Colaborador = ({ colaborador }) => {
	const { handleModalEliminarColaborador } = useProyectos();
	const { nombre, email } = colaborador;
	const admin = useAdmin();

	return (
		<div className='flex items-center p-5 border-b justify-between'>
			<div>
				<p className='text-lg'>{nombre}</p>
				{admin && <p className='text-sm text-gray-600'>{email}</p>}
			</div>
			{admin && (
				<div>
					<button
						className='text-red-600 bg-red-100 font-normal flex items-center gap-1 justify-center shadow p-2 rounded hover:bg-red-500 hover:text-white transition-colors'
						title='Eliminar Colaborador'
						type='button'
						onClick={() => handleModalEliminarColaborador(colaborador)}>
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				</div>
			)}
		</div>
	);
};

export default Colaborador;
