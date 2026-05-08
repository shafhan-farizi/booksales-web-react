import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { API } from "../_api";

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("userInfo");
		const token = localStorage.getItem("accessToken");

		if (savedUser && token) {
			return JSON.parse(savedUser);
		}

		return null;
	});

	const login = async ({email, password}) => {
		try {
			const { data } = await API.post("/login", { email, password });

			localStorage.setItem("userInfo", JSON.stringify(data.user));
			localStorage.setItem("accessToken", data.token);
			setUser(data.user);

			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const logout = async () => {
		try {
            const currentToken = localStorage.getItem('accessToken')

			const { data } = await API.post(
				"logout",
				{ currentToken },
				{
					headers: {
						Authorization: `Bearer ${currentToken}`,
					},
				},
			);

			return data;
		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("userInfo");
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
