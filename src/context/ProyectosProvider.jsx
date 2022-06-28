import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { clienteAxios } from '../config/clienteAxios';
// import useAuth from '../hooks/useAuth';
import io from 'socket.io-client';

let socket;

const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {
	const [proyectos, setProyectos] = useState([]);
	const [alerta, setAlerta] = useState({});
	const [proyecto, setProyecto] = useState({});
	const [cargando, setCargando] = useState(false);
	const [tarea, setTarea] = useState({});
	const [tareaFormModal, setTareaFormModal] = useState(false);
	const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
	const [colaborador, setColaborador] = useState({});
	const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
	const [buscador, setBuscador] = useState(false);

	const navigate = useNavigate();
	// const { Auth } = useAuth();

	// Si coloco la funcion dentro del useEffect, cuando inicie sesion no me traera los proyectos hasta que recargue la pagina, pero al depender de Auth, este se vuelve ejecutar cuando detecta al usuario
	// useEffect(() => {
	// 	const obtenerProyectos = async () => {
	// 		try {
	// 			const token = localStorage.getItem('token');
	// 			if (!token) return;

	// 			const config = {
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			};

	// 			const { data } = await clienteAxios('/proyectos', config);
	// 			setProyectos(data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	return () => obtenerProyectos();
	// }, [Auth]);

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL);
	}, []);

	const obtenerProyectos = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios('/proyectos', config);
			setProyectos(data);
		} catch (error) {
			console.log(error);
		}
	};

	const mostrarAlerta = (alerta) => {
		setAlerta(alerta);
		setTimeout(() => {
			setAlerta({});
		}, 6000);
	};

	const submitProyecto = async (proyecto) => {
		if (proyecto.id) {
			await editarProyecto(proyecto);
		} else {
			await nuevoProyecto(proyecto);
		}
	};

	const editarProyecto = async (proyecto) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);

			// Sincronizar el state
			const proyectosActualizados = proyectos.map((proyectoState) =>
				proyectoState._id === data._id ? data : proyectoState
			);

			setProyectos(proyectosActualizados);

			// Mostrar la alerta
			setAlerta({
				msg: 'Proyecto Actualizado Correctamente',
				error: false,
			});
			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 2000);

			// Redireccionar
		} catch (error) {
			console.log(error);
		}
	};

	const nuevoProyecto = async (proyecto) => {
		setAlerta({});
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post('/proyectos', proyecto, config);

			setProyectos([...proyectos, data]);

			setAlerta({
				msg: 'Proyecto creado Correctamente',
				error: false,
			});
			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	const obtenerProyecto = async (id) => {
		setCargando(true);
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios(`/proyectos/${id}`, config);
			setProyecto(data);
			// setAlerta({});
		} catch (error) {
			navigate('/proyectos');
			setAlerta({ msg: error.response.data.msg, error: true });
		} finally {
			setCargando(false);
		}
	};

	const eliminarProyecto = async (id) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

			// Sincronizar el state
			const proyectosActualizados = proyectos.filter((proyectoState) => proyectoState._id !== id);
			setProyectos(proyectosActualizados);

			setAlerta({
				msg: data.msg,
				error: false,
			});
			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalTarea = () => {
		setTareaFormModal(!tareaFormModal);
		setTarea({});
	};

	const submitTarea = async (tarea) => {
		if (tarea?.id) {
			await editarTarea(tarea);
		} else {
			await crearTarea(tarea);
		}
	};

	const crearTarea = async (tarea) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post('/tareas', tarea, config);

			setAlerta({
				msg: 'Tarea creada',
				error: false,
			});
			setTimeout(() => {
				setAlerta({});
				setTareaFormModal(false);
			}, 1000);

			// SOCKET IO
			socket.emit('nueva tarea', data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalEditarTarea = (tarea) => {
		setTarea(tarea);
		setTareaFormModal(true);
	};

	const editarTarea = async (tarea) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);

			setAlerta({});
			setTareaFormModal(false);

			// socket
			socket.emit('actualizar tarea', data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalEliminarTarea = (tarea) => {
		setTarea(tarea);
		setModalEliminarTarea(!modalEliminarTarea);
	};

	const eliminarTarea = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config);
			setAlerta({
				msg: data.msg,
				error: false,
			});

			setModalEliminarTarea(false);

			// socket
			socket.emit('eliminar tarea', tarea);

			setTarea({});
			setTimeout(() => {
				setAlerta({});
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	const submitColaborador = async (email) => {
		setAlerta({});
		setCargando(true);
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, config);

			setColaborador(data);
			setAlerta({});
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
			setTimeout(() => {
				setAlerta({});
			}, 4000);
		} finally {
			setCargando(false);
		}
	};

	const agregarColaborador = async (email) => {
		setAlerta({});
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config);

			setAlerta({
				msg: data.msg,
				error: false,
			});
			setColaborador({});
			setTimeout(() => {
				setAlerta({});
			}, 4000);
		} catch (error) {
			setAlerta({ msg: error.response.data.msg, error: true });
		}
	};

	const handleModalEliminarColaborador = (colaborador) => {
		setModalEliminarColaborador(!modalEliminarColaborador);

		setColaborador(colaborador);
	};

	const eliminarColaborador = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				`/proyectos/eliminar-colaborador/${proyecto._id}`,
				{ id: colaborador._id },
				config
			);

			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(
				(colaboradorState) => colaboradorState._id !== colaborador._id
			);

			setProyecto(proyectoActualizado);
			setAlerta({
				msg: data.msg,
				error: false,
			});
			setColaborador([]);
			setModalEliminarColaborador(false);
			setTimeout(() => {
				setAlerta({});
			}, 3000);
		} catch (error) {
			console.log(error.response);
		}
	};

	const completarTarea = async (id) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config);

			setTarea({});
			setAlerta({});

			// socket
			socket.emit('cambiar estado', data);
		} catch (error) {
			console.log(error.response);
		}
	};

	const handleBuscador = () => {
		setBuscador(!buscador);
	};

	// FUNCIONES PARA SOCKET IO
	const submitTareasProyecto = (tarea) => {
		// Agregar tarea al state
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];
		setProyecto(proyectoActualizado);
	};

	const eliminarTareaProyecto = (tarea) => {
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = proyectoActualizado.tareas.filter((tareaState) => tareaState._id !== tarea._id);

		setProyecto(proyectoActualizado);
	};

	const actualizarTareaProyecto = (tarea) => {
		// Sincronizar el state con el nuevo cambio
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
			tareaState._id === tarea._id ? tarea : tareaState
		);
		setProyecto(proyectoActualizado);
	};

	const cambiarEstadoTarea = (tarea) => {
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
			tareaState._id === tarea._id ? tarea : tareaState
		);

		setProyecto(proyectoActualizado);
	};

	const cerrarSesionProyectos = () => {
		setProyectos([]);
		setProyecto({});
		setAlerta({});
	};

	return (
		<ProyectosContext.Provider
			value={{
				proyectos,
				setProyectos,
				mostrarAlerta,
				alerta,
				submitProyecto,
				obtenerProyectos,
				obtenerProyecto,
				proyecto,
				cargando,
				eliminarProyecto,
				tareaFormModal,
				handleModalTarea,
				submitTarea,
				handleModalEditarTarea,
				tarea,
				modalEliminarTarea,
				handleModalEliminarTarea,
				eliminarTarea,
				submitColaborador,
				colaborador,
				agregarColaborador,
				handleModalEliminarColaborador,
				modalEliminarColaborador,
				eliminarColaborador,
				completarTarea,
				buscador,
				handleBuscador,
				submitTareasProyecto,
				eliminarTareaProyecto,
				actualizarTareaProyecto,
				cambiarEstadoTarea,
				cerrarSesionProyectos,
			}}>
			{children}
		</ProyectosContext.Provider>
	);
};

export { ProyectosProvider };
export default ProyectosContext;
