import './App.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Table from "./components/Table";
import { useState } from 'react';
import Modal from './components/EditModal';
import axios from 'axios';
import Header from './components/Header';
import soap from 'soap-everywhere';

function App() {
  /* const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const callSoapService = () => {
    const wsdlUrl = 'http://localhost:8088/produtos?wsdl';

    soap.createClient(wsdlUrl, (err, client) => {
        if (err) {
            setError('Erro ao criar cliente SOAP: ' + err.message);
            return;
        }

        const args = { param1: 'value1', param2: 'value2' };
        client.listar((err, result) => {
            if (err) {
                setError('Erro ao chamar o método SOAP: ' + err.message);
            } else {
                setResponse(result);
            }
        });
    });
  }

  const callSoapService2 = async () => {
      const soapEndpoint = 'http://localhost:8088/produtos?wsdl';
      const soapAction = 'listarRequest'; // Set this based on the WSDL or API docs

      const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.jaxwscrudservice.fourcatsdev.com/">
                            <soapenv:Header/>
                            <soapenv:Body>
                                <ser:listar/>
                            </soapenv:Body>
                          </soapenv:Envelope>`;       

      try {
          const response = await axios.post(soapEndpoint, soapRequest, {
              headers: {
                  'Content-Type': 'text/xml',
                  'SOAPAction': 'listarRequest'
              }
          });

          // Parse the XML response
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, 'text/xml');
          const result = xmlDoc.getElementsByTagName('YourResultTag')[0].textContent;
          console.log(result)
          setResponse(result);
      } catch (err) {
          console.error('SOAP Request Error:', err);
          setError('Failed to fetch data from the SOAP service.');
      }
  }; */

  return (
    <>
      <div className='backg'>
        <div className='tabela'>
          <Header/>
          <Table/>
        </div>
        <Modal/>

      </div>
    </>
  )
}

export default App;
