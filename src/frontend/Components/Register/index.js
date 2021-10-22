import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userService } from '../../Services/UserService/userService'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './RegisterModal.module.scss'

function Register() {
  const dispatch = useDispatch()
  const history = useHistory()

  const onFinish = async values => {
    console.log('Received values of form: ', values)

    return (
      userService
        .register(values)
        .then(response => {
          console.log("user service > register: ", response)
          history.push({
            pathname: '/',
            state: {
              response: response
            }
          })
        })
        .catch(err => {
          //handle err here > create modal pop up 
          console.log('userService err: ', err)
        })
    )
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    console.log("render > register")
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.registerModal}>
        <h2 className={styles.createTitle}>Create Account</h2>

        <Form
          name="basic"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <div>
              <h4 className={styles.inputTitles}>First Name</h4>
              <Input
                className={styles.inputDiscord}
              />
            </div>
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
            <div>
              <h4 className={styles.inputTitles}>Last Name</h4>
              <Input
                className={styles.inputDiscord}
              />
            </div>
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
            <div>
              <h4 className={styles.inputTitles}>Email</h4>
              <Input
                className={styles.inputDiscord}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="user_name"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <div>
              <h4 className={styles.inputTitles}>Username</h4>
              <Input
                className={styles.inputDiscord}
              />
            </div>
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
            <div>
              <h4 className={styles.inputTitles}>Password</h4>
              <Input
                className={styles.inputDiscord}
                type="password"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Continue
            </Button>
          </Form.Item>

          <span className={styles.login}><Link to="/login">Already have an account?</Link></span>
        </Form>
      </div>
    </div>
  )
}

export default Register 