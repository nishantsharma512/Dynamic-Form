import { Table } from '@mui/material';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Form from './Components/Form/Form';
import Home from './Components/Home';
import Navigation from './Components/Navigation';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>}>
            <Route path='/table' element={<Table/>}></Route>
            <Route path='/form' element={<Form/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
