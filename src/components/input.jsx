export const Input = ({ label, type, name, error, ...props }) => {
	const getInputClass = (isError) =>
		`
    text-sm rounded-lg block w-full p-2.5 outline-none border
    ${
			isError
				? "bg-red-50 border-red-500 text-red-900 focus:ring-red-600 focus:border-red-600" // Kalo error
				: "bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600" // Kalo normal
		}
    `;

	return (
		<div>
			<label
				htmlFor={name}
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{label}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				className={`${getInputClass(error)}`}
				{...props}
			/>
			{error && (
				<p class="mt-1 text-sm text-red-700 font-semibold">
					<span class="font-medium">{error}</span>
				</p>
			)}
		</div>
	);
};

export default Input;
