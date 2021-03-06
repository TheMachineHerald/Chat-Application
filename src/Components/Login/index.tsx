import React, { ReactElement, useEffect } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userService } from "../../Services/userService"
import { Form, Input, Button } from "antd"
import styles from "./LoginModal.module.scss"

const Login: React.FC = (): ReactElement => {
	const dispatch = useDispatch()
	const history = useHistory()

	const onFinish = (values: LOGIN_FORM): Promise<void> => {
		const { email, password } = values

		return userService
				.login(email, password)
				.then((resolve: LOGIN_ROUTE_RESPONSE): void => {
					const { user, servers, selected_server } = resolve.payload
					dispatch({ type: "SAVE_USER", payload: { ...user, selected_channel_id: selected_server.selected_channel_id }})
					dispatch({ type: "SAVE_SERVERS", payload: servers })
					dispatch({ type: "SAVE_SELECTED_SERVER", payload: selected_server })
					history.push({ pathname: "/" })
				})
				.catch((err: _Error): void => console.log(err))
	}

	const onFinishFailed = (errorInfo: _ValidateErrorEntity<LOGIN_FORM>): void => {
		console.log("Failed:", errorInfo)
	}

	useEffect(() => {
		userService.clearCache()
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
						remember: true
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						name="email"
						rules={[
						{
							required: true,
							message: "Please input your Email Address!"
						}
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
							message: "Please input your Password!"
						}
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