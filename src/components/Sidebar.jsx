import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
	const { auth } = useAuth();
	const { nombre } = auth;

	return (
		<aside className='md:w-76 lg:w-1/5 px-10 md:px-5 py-6 bg-gray-300'>
			<p className='text-lg font-medium text-center'>
				Bienvenido(a), <span className=''>{nombre}</span>
			</p>
			<Link
				to='crear-proyecto'
				className='bg-sky-600 w-full p-3 text-white font-bold flex justify-center items-center mt-2 md:mt-6 gap-6 rounded-lg uppercase hover:bg-sky-700 transition-colors'>
				Nuevo Proyecto
				<FontAwesomeIcon icon={faPlusSquare} className='text-2xl' />
			</Link>
		</aside>
	);
};

export default Sidebar;
