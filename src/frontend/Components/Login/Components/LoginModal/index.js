import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './LoginModal.module.scss'

function LoginModal() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className={styles.loginModal}>
      <h2 className={styles.fontLighter}>Welcome back!</h2>
      <h3 className={styles.fontSilver}>We're so exicted to see you again!</h3>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email Address!',
            },
          ]}
        >
          <Input
            className={styles.inputDiscord}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            className={styles.inputDiscord}
            type="password"
          />
          <a className={styles.link} href="">
            Forgot password?
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Log in
          </Button>
        </Form.Item>

        <p className={styles.fontDark}>Need an account?
          <span className={styles.register}><a href="">Register</a></span>
        </p>
      </Form>
    </div>
  )
}

export default LoginModal