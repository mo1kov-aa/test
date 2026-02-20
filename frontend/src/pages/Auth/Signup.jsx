import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		username: '',
		password: '',
	});

	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setMessage('');
		setError('');

		try {
			const response = await axios.post(
				'http://localhost:3000/api/auth/signup',
				formData,
			);

			setMessage(response.data.message); // сообщение от сервера
		} catch (err) {
			if (err.response && err.response.data.message) {
				setError(err.response.data.message);
			} else {
				setError('Ошибка сервера');
			}
		}
	};

	return (
		<div>
			<h2>Регистрация</h2>

			{message && <p>{message}</p>}
			{error && <p>{error}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>Имя:</label>
					<br />
					<input type="text" name="name" value={formData.name} onChange={handleChange} />
				</div>

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

				<button type="submit">Отправить</button>
				<button type="button" onClick={() => navigate('/login')}>
					Перейти на страницу логина
				</button>
			</form>
		</div>
	);
};

export default Signup;
