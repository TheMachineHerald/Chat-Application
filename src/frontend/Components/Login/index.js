import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userService } from '../../Services/UserService/userService'
import { save_user } from '../../actions/user_actions'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { convertLegacyProps } from 'antd/lib/button/button'
import styles from './LoginModal.module.scss'

const default_state = {
  email: '',
  password: ''
}

function Login(props) {
  const dispatch = useDispatch()
  const history = useHistory()

  const onFinish = async values => {
    console.log('Received values of form: ', values)
    const { email, password } = values

    return (
      userService
        .login(email, password)
        .then(response => {
          console.log("user service response: ", response)
          history.push({
            pathname: '/',
            state: {
              response: response
            }
          })
        })
        .catch(err => console.log(err))
    )
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    userService.logout()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginModal}>
        <h2>Welcome back!</h2>
        <h3 className={styles.fontSilver}>We're so exicted to see you again!</h3>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <div>
              <h4 className={styles.inputTitles}>Email</h4>
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
              <a className={styles.link} href="">
                Forgot password?
              </a>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Log in
            </Button>
          </Form.Item>

          <p className={styles.needAccount}>Need an account?
            <span className={styles.register}><Link to="/register">Register</Link></span>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Login 


// import { connect } from 'react-redux'

// const mapStateToProps = (state, ownProps) => ({
//   dialpad: state.dialpad,
//   worker: state.dialpad.worker,
//   activeCall: state.dialpad.activeCall
// })

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   saveWorker: (worker) => dispatch(saveWorker(worker))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)