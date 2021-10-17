import React from 'react'
import LoginModal from './Components/LoginModal'
import RegisterModal from './Components/RegisterModal'
import styles from './Login.module.scss'

function Login() {
  const login = false
  return (
    <div className={styles.login}>
      { login ? <LoginModal /> : <RegisterModal/> }
    </div>
  )
}

export default Login