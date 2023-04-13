import {useRef, useState} from "react";
import useForm from "../hooks/useForm";

const _ENDPOINT = "http://localhost:3000/todos";

const InputField = () => {
	const [selectValue, setSelectValue] = useState();
	const formElement = useRef();
	const additionalData = {
		sent: new Date().toISOString(),
	};

	const {handleSubmit, status, message} = useForm({
		form: formElement.current, additionalData,
	});

	if (status === "success") {
		return (<>
			<div className="text-2xl">Thank you!</div>
			<div className="text-md">{message}</div>
		</>);
	}

	if (status === "error") {
		return (<>
			<div className="text-2xl">Something bad happened!</div>
			<div className="text-md">{message}</div>
		</>);
	}

	return (<form className={'flex gap-5 pt-5 justify-center'}
				  action={_ENDPOINT}
				  onSubmit={() => handleSubmit}
				  method="POST"
				  target="_blank"
				  ref={formElement}
	>
		<div className="mb-3 pt-0 w-[500px]">
			<input
				type="text"
				placeholder="Name your todo!"
				name="name"
				className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
				required
			/>
		</div>
		<div className="mb-3 pt-0 w-[150px]">
			<select
				onChange={(e) => setSelectValue(e.target.value)}
				value={selectValue}
				placeholder="Set it done!"
				name="done"
				className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
				required
			>
				<option>True</option>
				<option>False</option>
			</select>
		</div>
		<div className="mb-3 pt-0 w-fit">
			<input
				placeholder="Set deadline..."
				name="deadline"
				type="date"
				className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
				required
			/>
		</div>
		{status !== "loading" && (<div className="mb-3 pt-0">
			<button
				className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
				type="submit"
			>
				Create todos!
			</button>
		</div>)}
	</form>);
};

export default InputField;
