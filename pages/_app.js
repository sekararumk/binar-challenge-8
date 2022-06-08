import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <div className={styles.header}>
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                        <h2 className={styles.text_style}>Binar</h2>
                    </div>
                    <div className="col-auto">
                        <ul className={`nav-menu list-inline ${styles['ul']}`}>
                            <li className={`list-inline-item ${styles['list']}`}><Link href="/">Home</Link></li>
                            <li className={`list-inline-item ${styles['list']}`}><Link href="/input">Input</Link></li>
                            <li className={`list-inline-item ${styles['list']}`}><Link href="/chart">Chart</Link></li>
                            <li className={`list-inline-item ${styles['list']}`}><Link href="/download">Download</Link></li>
                        </ul>                    
                    </div>
                </div>
            </div>
        </div>
    <Component {...pageProps} />
    </>
  
  )
}

export default MyApp
