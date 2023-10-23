import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 20,
   
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    
  },
});

// hola
const PDFComponent = () => (
  <Document>
    <Page size="A4" style={styles.page}>
    <View style={styles.section}>
          <Text>Guía para usar la aplicación web de R ArchivoRD</Text>
          <Text>Tecnología utilizada: React, Node.js, Express,mysql,phpMyAdmin </Text>
          <Text>Librerías utilizadas: @iota/core, CryptoJSpara encriptar y desencriptar archivos,sequelie orm</Text>
        </View>

        <View style={styles.section}>
          <Text>1. Presionar el botón "Generar dirección"</Text>
          <Text>2. Introducir la clave para encriptar el archivo</Text>
          <Text>3. Subir archivo o arrastrar y soltar</Text>
          <Text>4. Presionar el botón "Encriptar"</Text>
          <Text>5. Presionar el botón "Enviar archivo encriptado"</Text>
          <Text>6. (Opcional) Presionar el botón "Verificar saldo"</Text>
        </View>

        <View style={styles.section}>
          <Text>Entorno local</Text>
          <Text>Frontend:</Text>
          <Text>cd pruebadeconceptos</Text>
          <Text>npm install</Text>
          <Text>cd App-PruebaDeConceptos</Text>
          <Text>npm run dev</Text>

          <Text>Backend:</Text>
          <Text>cd pruebadeconceptos</Text>
          <Text>npm install</Text>
          <Text>cd server</Text>
          <Text>npm run dev o npm start</Text>
        </View>
    </Page>
  </Document>
);


export default PDFComponent;
