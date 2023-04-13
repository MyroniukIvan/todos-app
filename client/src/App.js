import DeleteDocumentButton from "./components/DeleteField/DeleteField";
import {EditDocumentButton} from './components/EditField/EditField'
import {useEffect, useState} from "react";
import axios from "axios";
import InputField from "./components/InputField/InputField";
import {FaSpinner} from "react-icons/fa";

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const getTodos = () => {
		axios.get("http://localhost:3000/todos")
			.then((response) => {
				setData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	// sadasasfas


	useEffect(() => {
		getTodos();
	}, [data]);

	const handleDelete = (id) => {
		setData(data.filter((item) => item._id !== id));
	};

	return (<div className="p-10 font-mono bg-white rounded-md shadow-md flex items-center m-20 justify-center ">
		{loading ? (<div className="flex justify-center items-center h-screen">
			<FaSpinner className="animate-spin text-4xl"/>
		</div>) : (<div className="w-full p-25 h-full">
			<h1 className="text-center text-3xl">CREATE YOUR TODOS!</h1>
			<InputField/>
			<table className="table w-full h-full ">
				<thead>
				<tr>
					<th className={'text-left'}>Image</th>
					<th className="text-left">Name</th>
					<th className="text-left">Done</th>
					<th className="text-left">Deadline</th>
					<th className="text-left">Actions</th>
				</tr>
				</thead>
				<tbody className="divide-y divide-gray-300 ">
				{data.map((item) => {
					return (<tr key={item._id}>
						<td className="py-2 pr-5 w-[100px]">
							{item.image &&
								<img src={item.image} alt=""/>
							}
						</td>

						<td className="py-2">{item.name}</td>
						<td className="py-2">{item.done}</td>
						<td className="py-2">{item.deadline}</td>
						<td className="py-2 flex gap-5">
							<DeleteDocumentButton
								collectionName="todos"
								id={item._id}
								onDelete={handleDelete}
							/>
							<EditDocumentButton
								collectionName={'todos'}
								id={item._id}
							/>
						</td>
					</tr>);
				})}
				</tbody>
			</table>
		</div>)}
	</div>);
}

export default App;



