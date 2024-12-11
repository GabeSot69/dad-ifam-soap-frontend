import './App.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Table from "./components/Table";
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  

  const callSoapService = async () => {
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
  };

  return (
    <>
      <div>
            <h1>SOAP Client Example</h1>
            <button onClick={callSoapService}>Call SOAP Service</button>
            {response && <div>Response: {response}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    </>
  )
}

export default App;
