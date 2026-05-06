import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, useDecodeToken } from "../../_services/auth";
import Input from "../../components/input";

export default function Register() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		fullname: "",
		email: "",
		name: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const token = localStorage.getItem("accessToken");
	const decodedData = useDecodeToken(token);

	const handleChange = (e) => {
		const { name, value } = e.target;
    console.log(value)
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await register(formData);

			return navigate("/login");
		} catch (error) {
			setError(error?.response?.data);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (token && decodedData && decodedData.success) {
			// navigate("/admin");
		}
	}, [token, decodedData, navigate]);

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create an account
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
								<Input
									label="Your fullname"
									type="text"
									name="fullname"
									error={error?.fullname}
                  placeholder="Aleandre Janrea"
                  value={formData.fullname}
									onChange={handleChange}
								/>
								<Input
									label="Your name"
									type="text"
									name="name"
									error={error?.name}
                  placeholder="Aleandre"
                  value={formData.name}
									onChange={handleChange}
								/>
								<Input
									label="Your email"
									type="email"
									name="email"
									error={error?.email}
                  placeholder="name@example.com"
                  value={formData.email}
									onChange={handleChange}
								/>
								<Input
									label="Your password"
									type="password"
									name="password"
									error={error?.password}
                  placeholder="********"
                  value={formData.password}
									onChange={handleChange}
								/>
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="terms"
											className="font-light text-gray-500 dark:text-gray-300"
										>
											I accept the{" "}
											<Link
												className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
												href="#"
											>
												Terms and Conditions
											</Link>
										</label>
									</div>
								</div>
								<button
									type="submit"
									className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
								>
									{loading ? "Create an account..." : "Create an account"}
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<Link
										to={"/login"}
										className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
									>
										Login here
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
