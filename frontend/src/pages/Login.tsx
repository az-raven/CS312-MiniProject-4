import { useState, type SubmitEvent } from "react";

export default function Login() {
	const [error, setError] = useState("")
	const [result, setResult] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault()

		const body = { username, password }
		const result = await fetch("/api/v1/sessions", {
			body: JSON.stringify(body),
			headers: {
				"content-type": "application/json"
			},
			method: "POST"
		})

		const json = await result.json()

		if (!json.success) {
			setResult("")
			setError(json.message)
			return;
		}

		setError("")
		setResult(json.message)
	}

	return (
		<form onSubmit={onSubmit} className="block">
			{
				error != ""
					? (<p className="error-box">{error}</p>)
					: null
			}
			{
				result != ""
					? (<p className="error-box">{result}</p>)
					: null
			}
      		<h1>Log In</h1>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<input type="submit" value="Log In" id="login-submit"></input>
		</form>
	);
}
