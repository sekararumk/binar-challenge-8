import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import styles from '../styles/Home.module.css'

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const download = () => {

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
    <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className={styles.padding_top}>
            <center><h4 className={styles.text_style}>Download</h4></center>
              <hr />
              <Worker workerUrl="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js">
                <Viewer fileUrl="./dummy.pdf" plugins={[defaultLayoutPluginInstance]}/>
              </Worker>
          </div>
        </div>
    </div>
    </>
  )
}

export default download