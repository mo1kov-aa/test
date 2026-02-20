import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError('');
		setMessage('');

		try {
			const response = await axios.post('http://localhost:3000/api/auth/login', formData);

			const token = response.data.token;

			if (!token) {
				throw new Error('Нет токена');
			}

			localStorage.setItem('token', token);

			navigate('/dashboard'); // редирект только если реально получили токен
		} catch (err) {
			setError(err.response?.data?.message || 'Ошибка авторизации');
		}
	};

	return (
		<div>
			<h2>Логин</h2>

			{message && <p>{message}</p>}
			{error && <p>{error}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>Имя пользователя:</label>
					<br />
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label>Пароль:</label>
					<br />
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>

				<br />

				<button type="submit">Войти</button>
				<button type="button" onClick={() => navigate('/signup')}>
					Перейти к регистрации
				</button>
			</form>
		</div>
	);
};

export default Login;
