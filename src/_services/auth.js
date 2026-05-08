import { useJwt } from "react-jwt";
import { API } from "../_api";

export const register = async ({ fullname, email, name, password }) => {
	try {
		const {data} = await API.post('/register', {fullname, email, name, password})
		return data
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const useDecodeToken = (token) => {
	const { decodedToken, isExpired } = useJwt(token);

	try {
		if (isExpired) {
			return {
				success: false,
				message: "Token expired",
				data: null,
			};
		}

		return {
			success: true,
			message: "Token valid",
			data: decodedToken,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
			data: null,
		};
	}
};
