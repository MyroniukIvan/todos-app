import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dir = './images/'
		cb(null, dir)
	},
	filename: (req, file, cb) => {
		console.log(file)
		const fileName = Date.now() + path.extname(file.originalname);
		req.newFileName = fileName;
		cb(null, fileName);
	}
})

const upload = multer({storage: storage})


export {
	upload
}
