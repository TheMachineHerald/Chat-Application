import React from 'react'
import { Button } from 'antd'
import styles from './LoginModal.module.scss'

function LoginModal() {
  return (
    <div className={styles.loginModal}>
      <h2 className={styles.fontLight}>Welcome back!</h2>
      <h3 className={styles.fontLight}>We're so exicted to see you again!</h3>

      <h4 className={styles.fontLight}>EMAIL</h4>
      <input />

      <h4 className={styles.fontLight}>Password</h4>
      <input />
      <p className={styles.fontBlue}>Forgot your password?</p>

      <Button className={styles.button}>Login</Button>

      <p className={styles.fontDark}>Need an account? <span className={styles.fontBlue}>Register</span></p>
    </div>
  )
}

export default LoginModal