// pages/_app.js
import React from 'react';
import '../styles/globals.css'; // Create this file if needed

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
