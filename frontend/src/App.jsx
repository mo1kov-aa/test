import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Signup, Login, Dashboard, NotFound } from './pages/pages';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
