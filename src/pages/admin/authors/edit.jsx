import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAuthor, updateAuthor } from "../../../_services/authors";

export default function AuthorEdit() {
    const { id } = useParams()
	const [formData, setFormData] = useState({
		name: "",
		city: "",
        _method: 'PUT'
	});

	const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const authorData = await showAuthor(id)

            setFormData({
                name: authorData.name,
                city: authorData.city,
                _method: 'PUT'
            })
        }

        fetchData()
    }, [id])

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const payload = new FormData();
			for (const key in formData) {
				payload.append(key, formData[key]);
			}

			await updateAuthor(id, payload);
			navigate("/admin/authors");
		} catch (error) {
			console.log(error);
			alert("Error updating author");
		}
	};

	return (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
					<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
						Edit Author
					</h2>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
							<div className="sm:col-span-2">
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									value={formData.name}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
									placeholder="Author Name"
									required=""
								/>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="city"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									City
								</label>
								<input
									type="text"
									name="city"
									id="city"
									value={formData.city}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
									placeholder="Where he live..."
									required=""
								/>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<button
								type="submit"
								className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
							>
								Save Data
							</button>
							<button
								type="reset"
								className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
							>
								<svg
									className="w-5 h-5 mr-1 -ml-1"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
										clip-rule="evenodd"
									></path>
								</svg>
								Reset
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
