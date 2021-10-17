import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './RegisterModal.module.scss'

function RegisterModal() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className={styles.registerModal}>
      <h2 className={styles.createTitle}>Create Account</h2>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="first_name"
          rules={[
            {
              required: true,
              message: 'Please input your First Name!',
            },
          ]}
        >
          <h4 className={styles.inputTitles}>First Name</h4>
          <Input
            className={styles.inputDiscord}
          />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[
            {
              required: true,
              message: 'Please input your Last Name!',
            },
          ]}
        >
          <h4 className={styles.inputTitles}>Last Name</h4>
          <Input
            className={styles.inputDiscord}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email Address!',
            },
          ]}
        >
          <h4 className={styles.inputTitles}>Email</h4>
          <Input
            className={styles.inputDiscord}
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <h4 className={styles.inputTitles}>Username</h4>
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
          <h4 className={styles.inputTitles}>Password</h4>
          <Input
            className={styles.inputDiscord}
            type="password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Continue
          </Button>
        </Form.Item>

        <span className={styles.login}><a href="">Already have an account?</a></span>

      </Form>
    </div>
  )
}

export default RegisterModal