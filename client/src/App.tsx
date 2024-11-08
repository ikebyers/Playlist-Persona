import { Outlet } from 'react-router-dom';
import Nav from "../src/components/Navbar.tsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  return (
    <div>
        <Nav/>
      <main>
      <Outlet/>
      </main>
    </div>
  )
}

export default App;