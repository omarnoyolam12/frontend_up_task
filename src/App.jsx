import { Route, Routes, BrowserRouter } from "react-router-dom";

import {AuthProvider} from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";
import { InteractividadProvider } from "./context/InteractividadProvider";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./paginas/Login";
import Resgistrar from "./paginas/Resgistrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";

import RutaProtegida from "./layouts/RutaProtegida";
import Dashboard from "./paginas/Dashboard";
import Proyectos from "./paginas/Proyectos";
import Tareas from "./paginas/Tareas";
import Proyecto from "./paginas/Proyecto";

function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ProyectosProvider>
            <InteractividadProvider>
              <Routes>
                <Route path="/" element={<AuthLayout/>}>
                  <Route index element={<Login/>}/>
                  <Route path="registrar" element={<Resgistrar/>}/>
                  <Route path="olvide-password" element={<OlvidePassword/>}/>
                  <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
                  <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
                </Route>

                <Route path="/dashboard" element={<RutaProtegida/>}>
                  <Route index element={<Dashboard/>}/>
                  <Route path="proyectos" element={<Proyectos/>}/>
                  <Route path="tareas" element={<Tareas/>}/>
                  <Route path="proyecto/:id" element={<Proyecto/>}/>
                </Route>
              </Routes>
            </InteractividadProvider>
          </ProyectosProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
