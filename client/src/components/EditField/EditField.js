import React, {useState} from 'react';
import {FaEdit} from 'react-icons/fa';
import axios from 'axios';
import Modal from 'react-modal'

Modal.setAppElement('#root');

const EditDocumentButton = ({collectionName, id}) => {
	const [name, setName] = useState('');
	const [done, setDone] = useState('');
	const [image, setImage] = useState();
	const [deadline, setDeadline] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [isModalOpen, setModalIsOpen] = useState(false)

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.set('id', id);
		try {
			const response = await axios.put(`http://localhost:3000/todos/${id}/images`, formData);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}


	const handleClick = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/${collectionName}/${id}`);
			setName(response.data.name);
			setIsEditing(true);
			setModalIsOpen(true)
		} catch (error) {
			console.error(error);
			setModalIsOpen(false)
		}
	};

	const handleSave = async () => {
		try {
			const response = await axios.put(`http://localhost:3000/${collectionName}/${id}`, {
				image,
				name,
				done,
				deadline
			});
			console.log(response.data); // log the server response
			setImage(response.data.image)
			setIsEditing(false);
			setModalIsOpen(false)
		} catch (error) {
			setModalIsOpen(false)
			console.error(error);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	if (isEditing) {
		return (<div>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="flex flex-col">
					<td className="py-2">
						<form action={`http://localhost:3000/todos/${id}/images`} method="POST"
							  encType="multipart/form-data" onSubmit={handleFormSubmit}>
							<input name='image' type="file" accept="image/*"/>
							<button type="submit">Upload</button>
						</form>
					</td>
					<input
						className="w-full rounded border border-gray-400 p-2 mb-2"
						placeholder="enter new name..."
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<select
						className="w-full rounded border border-gray-400 p-2 mb-2"
						placeholder="done?"
						value={done}
						onChange={(e) => setDone(e.target.value)}
					>
						<option>true</option>
						<option>false</option>
					</select>
					<input
						className="w-full rounded border border-gray-400 p-2 mb-2"
						type="date"
						placeholder="enter new name..."
						value={deadline}
						onChange={(e) => setDeadline(e.target.value)}
					/>
					<div className={'flex justify-between'}>
						<button
							className="rounded w-full bg-black text-white py-2 px-4 mr-2"
							onClick={handleSave}
						>
							Save
						</button>
						<button
							className="rounded w-full bg-black text-white py-2 px-4"
							onClick={handleCancel}
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>

		</div>);
	} else {
		return (<button onClick={handleClick}>
			<FaEdit/>
		</button>);
	}
};

export {EditDocumentButton};

