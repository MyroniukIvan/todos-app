import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const DeleteDocumentButton = ({ collectionName, id, onDelete }) => {
	const handleClick = async () => {
		try {
			const response = await axios.delete(`http://localhost:3000/${collectionName}/${id}`);
			console.log(response.data); // log the server response
			onDelete(id); // Call the onDelete function to remove the deleted document from the state.
		} catch (error) {
			console.log(id)
			console.error(error);
		}
	};

	return (
		<button onClick={handleClick}>
			<FaTrash />
		</button>
	);
};

export default DeleteDocumentButton;


