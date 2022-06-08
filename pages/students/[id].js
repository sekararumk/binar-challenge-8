import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import axios from 'axios';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Student = () => {

  const router = useRouter()
  const { id } = router.query

  const [students, setStudents] = useState(null)

  useEffect(() => {
      axios.get(
        `https://fejs-c7-api.herokuapp.com/api/students/${id}?populate=*`
      ).then(res => {
        setStudents(res.data.data)
        console.log(res)
      })
    }, [])
      
    return (
        <div>
            { students && (
                <>
                <div className={styles.padding_top}>
                  <center>
                  <div className={`card ${styles['card']}`}>
                    { students.attributes.photo.data !== null &&
                        <Zoom><img src={students.attributes.photo.data.attributes.url} className="card-img-top" width="200" /></Zoom>
                      }
                        <div className="card-body">
                          <center><h4 className={`card-title ${styles['card_title']} ${styles['text_style']}`}>Data Form</h4></center>
                          <h5 className={styles.text_student}>First Name : {students.attributes.firstname}</h5>
                          <h5 className={styles.text_student}>Last Name : {students.attributes.lastname}</h5>
                          <h5 className={styles.text_student}>Location : {students.attributes.location}</h5>
                        </div>
                      </div>
                  </center>              
                </div>
                </>
            )}
        </div>
    )
}

export default Student