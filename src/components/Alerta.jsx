import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Alerta = ({ alerta }) => {
	return (
		<div
			className={`${
				alerta.error ? 'text-red-500' : 'text-green-500'
			} text-center font-medium text-sm mt-4 mb-0 flex justify-center uppercase items-center tracking-wider`}>
			{alerta.msg}
			{alerta.error && <FontAwesomeIcon icon={faCircleExclamation} className='ml-1 text-lg m-0' />}
			{!alerta.error && <FontAwesomeIcon icon={faCircleCheck} className='ml-2 text-xl m-0' />}
		</div>
	);
};

export default Alerta;
