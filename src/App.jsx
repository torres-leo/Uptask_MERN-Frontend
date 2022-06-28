import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';

import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import Proyectos from './pages/Proyectos';
import NuevoProyecto from './pages/NuevoProyecto';
import NuevoColaborador from './pages/NuevoColaborador';
import Proyecto from './pages/Proyecto';
import EditarProyecto from './pages/EditarProyecto';

import { AuthProvider } from './context/AuthProvider';
import { ProyectosProvider } from './context/ProyectosProvider';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProyectosProvider>
					<Routes>
						<Route path='/' element={<AuthLayout />}>
							<Route index element={<Login />} />
							<Route path='registrar' element={<Registrar />} />
							<Route path='olvide-password' element={<OlvidePassword />} />
							<Route path='nuevo-password/:token' element={<NuevoPassword />} />
							<Route path='confirmar-cuenta/:id' element={<ConfirmarCuenta />} />
						</Route>

						{/* Grupo de rutas Privadas */}
						<Route path='/proyectos' element={<RutaProtegida />}>
							<Route index element={<Proyectos />}></Route>
							<Route path='crear-proyecto' element={<NuevoProyecto />}></Route>
							<Route path='nuevo-colaborador/:id' element={<NuevoColaborador />}></Route>
							<Route path=':id' element={<Proyecto />}></Route>
							<Route path='editar/:id' element={<EditarProyecto />}></Route>
						</Route>
					</Routes>
				</ProyectosProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
