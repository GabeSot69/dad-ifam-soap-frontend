import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import BasicModal from './components/EditModal';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <>
      <div className='backg'>
        <div className='tabela'>
          <Header/>
          <Table data={produtos}/>
        </div>
        <BasicModal/>
      </div>
    </>
  );
}

export default App;
