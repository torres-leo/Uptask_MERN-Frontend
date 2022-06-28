import React from 'react';
import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
import Busqueda from './Busqueda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
	const { handleBuscador, cerrarSesionProyectos } = useProyectos();
	const { cerrarSesionAuth } = useAuth();

	const handleCerrarSesion = () => {
		cerrarSesionAuth();
		cerrarSesionProyectos();
		localStorage.removeItem('token');
	};

	return (
		<header className='px-4 py-5 bg-gradient-to-b from-slate-900 to-slate-600 bg-colores'>
			<div className='block justify-between items-center md:flex'>
				<h2 className='text-5xl text-white py-2 px-4 rounded font-extrabold text-center tracking-tighter'>
					<Link to='/proyectos'>UpTask</Link>
				</h2>

				<div className='flex justify-center my-4'>
					<button
						type='button'
						placeholder='Busca un proyecto'
						className='rounded-md lg:w-96 p-2 bg-slate-50 text-center text-indigo-500'
						onClick={handleBuscador}>
						Buscar Proyectos
					</button>
				</div>

				<div className='block md:flex items-center gap-2'>
					<div className='flex justify-center'>
						<Link
							to='/proyectos'
							className='font-bold bg-sky-600 hover:bg-sky-700 uppercase text-md p-2 text-white rounded-md tracking-wider mr-2 transition-colors'>
							Proyectos
						</Link>
					</div>
					<div className='flex justify-end'>
						<button
							type='button'
							className='text-xs uppercase text-gray-50 hover:text-black underline-offset-2 p-1 transition-colors rounded-md font-bold flex items-center gap-2'
							onClick={handleCerrarSesion}>
							Cerrar Sesión
							<FontAwesomeIcon icon={faRightFromBracket} />
						</button>
						<Busqueda />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
