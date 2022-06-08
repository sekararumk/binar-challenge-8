import React, { useRef, useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';
import {useDropzone} from 'react-dropzone';

const input = () => {

  const [formMessage, setFormMessage] = useState('')
  const [showFormMessage, setShowFormMessage] = useState(false)
  const [formMessageType, setFormMessageType] = useState('error')
  const [formIsLoading, setFormIsLoading] = useState(false)

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  const inputFirstName = useRef()
  const inputLastName = useRef()
  const inputLocation = useRef()
  // const inputPhoto = useRef()

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    setFormIsLoading(true)

    const formIsCompleted = false

     // Validasi dan sanitasi
     let firstname = inputFirstName.current.value
     let lastname = inputLastName.current.value
     let location = inputLocation.current.value
 
     firstname = firstname.trim()
     lastname = lastname.trim()
     location = location.trim()

     if ( firstname !== '' && lastname !== '' && location !== ''
    && acceptedFiles.length > 0 ) {
      formIsCompleted = true
    }

    if (formIsCompleted){
      //data setup
      const submittedData = {
        firstname,
        lastname,
        location,
      }

      // membuat object FormData
      const formData = new FormData();

      // memasukkan foto ke form data
      formData.append( 'data', JSON.stringify(submittedData) );
      acceptedFiles.forEach( file => {
        formData.append('files.photo', file, file.path)
      })

      try {
        const res = await axios.post( 'https://fejs-c7-api.herokuapp.com/api/students/', formData );
        if( res.data.data.id )
          setFormMessage('Terima kasih data anda sudah diterima')
          setFormMessageType('success')
          setShowFormMessage(true) 
          inputFirstName.current.value = ''
          inputLastName.current.value = ''
          inputLocation.current.value = ''
          // acceptedFiles = []
      } catch(err) {
        setFormMessage('Maaf koneksi sedang bermasalah')
        setFormMessageType('error')
        setShowFormMessage(true)  
      }
    } else {
      setFormMessage('Harap Mengisi seluruh form')
      setFormMessageType('error')
      setShowFormMessage(true)
    }

    setFormIsLoading(false)

  }

  return (
      <>
        <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className={styles.padding_top}>
                <center><h4 className={styles.text_style}>Form</h4></center>
                <hr />
                { (showFormMessage === true ) && 
                <div>
                  <div className="alert alert-danger" role="alert">
                    { formMessageType === 'error' && `Error: ${formMessage} ` } 
                  </div>
                  <div className="alert alert-success" role="alert">
                    { formMessageType === 'success' && `Success: ${formMessage} `} 
                  </div>
                </div>
                }
                <div style= {{
                  opacity: formIsLoading === true ? '0.3' : '1',
                  pointerEvents: formIsLoading === true ? 'none' : 'all'
                  }}
                >
                <form onSubmit={formSubmitHandler}>
                <div className="mb-3 mt-4">
                  <label className={`form-label ${styles['text_form']}`}>First Name</label>
                  <input type="text" className="form-control" name="firstname" id="firstname" placeholder="Input first name" ref={inputFirstName}/>
                </div>
                <div className="mb-3 mt-3">
                  <label className={`form-label ${styles['text_form']}`}>Last Name</label>
                  <input type="text" className="form-control" name="lastname" id="lastname" placeholder="Input last name" ref={inputLastName}/>
                </div>
                <div className="mb-3 mt-3">
                  <label className={`form-label ${styles['text_form']}`}>Location</label>
                  <input type="text" className="form-control" name="location" id="location" placeholder="Input location" ref={inputLocation}/>
                </div>
                <div className="mb-3">
                  <label className={`form-label ${styles['text_form']}`}>Photo</label>
                  <div className={styles.input_dropzone}>
                    <div {...getRootProps({className: 'dropzone'})}>
                      <input {...getInputProps()} />
                      <p className={styles.text_dropzone}>Drag and drop some files here, or click to select files</p>
                    </div>
                  </div>
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </div>
                <div className="d-grid gap-2 d-md-flex mb-4 justify-content-md-end">
                  <input type="submit" value="SUBMIT" className="btn btn-dark" />
                </div>
                </form>
              </div>
            </div>
            </div>
        </div>
        </>
  )
}

export default input