import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFComponent from './PDFComponent';

function Guia() {

// hola soy tu guia
  return (
    <div>
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <PDFComponent />
      </PDFViewer>
    </div>
  );
}

export default Guia;