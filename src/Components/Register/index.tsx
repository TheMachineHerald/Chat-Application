import React, { ReactElement } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userService } from "../../Services/userService"
import { Form, Input, Button } from "antd"
import styles from "./RegisterModal.module.scss"

const Register: React.FC = (): ReactElement => {
	const dispatch = useDispatch()
	const history = useHistory()

	const onFinish = (values: REGISTER_FORM): Promise<void> => {
		return userService
				.register(values)
				.then((resolve: REGISTER_ROUTE_RESPONSE): void => {
					const { user, servers, selected_server } = resolve.payload
					dispatch({ type: "SAVE_USER", payload: { ...user, selected_channel_id: selected_server.selected_channel_id }})
					dispatch({ type: "SAVE_SERVERS", payload: servers })
					dispatch({ type: "SAVE_SELECTED_SERVER", payload: selected_server })
					history.push({ pathname: "/" })
				})
				.catch((err: _Error): void => {
					// handle err here > create modal pop up
					console.log("userService err: ", err)
				})
	}

	const onFinishFailed = (errorInfo: _ValidateErrorEntity<REGISTER_FORM>): void => {
		console.log("Failed:", errorInfo)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.registerModal}>
				<h2 className={styles.createTitle}>Create Account</h2>

				<Form
					name="basic"
					className="login-form"
					initialValues={{
						remember: true
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						name="first_name"
						rules={[
							{
								required: true,
								message: "Please input your First Name!"
							}
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
								message: "Please input your Last Name!"
							}
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
						name="user_name"
						rules={[
							{
								required: true,
								message: "Please input your Username!"
							}
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