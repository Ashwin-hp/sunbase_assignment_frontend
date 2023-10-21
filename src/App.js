import './App.css';
import Table from './Table';
import AddCustomer from './AddCustomer';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Table />} /> 
          <Route path="/add-customer" element={<AddCustomer />} /> 
        </Routes>
      </div>
  );
}

export default App;
