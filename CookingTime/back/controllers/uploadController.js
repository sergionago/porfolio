const recipeRepository = require('../repositories/recipeRepository');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Multer configuration
const multer_storage = (recipeId) => {
    let dir;
    return multer.diskStorage({
        destination: (req, file, cb) => {
            // If the name of the image field is finalImage, it will create a directory with the value of recipeId
            // Else, if will create a subdirectory 'steps' in the recipeId directory
            if (file.fieldname === 'finalImage') {
                dir = path.join(__dirname, '..', 'public', 'uploads', 'images', recipeId);
            } else if (file.fieldname.startsWith('step')) {
                dir = path.join(__dirname, '..', 'public', 'uploads', 'images', recipeId, 'steps');
            }
            fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            // If the field name of the file starts with step, it will catch the number on that (ex: step[1]) and put it as the file name
            // Else it will uses the name of the filed as the image name
            if (file.fieldname.startsWith('step')) {
                const stepNumber = file.fieldname.match(/\d+/)[0];
                cb(null, stepNumber + path.extname(file.originalname));
            } else {
                cb(null, file.fieldname + path.extname(file.originalname));
            }
        }

    })
}

// Creates and object with the path information of the already uploaded images
const createPathObject = (recipeId, uploadedFiles) => {
    let pathObject = {
        recipeId: '',
        finalImage: '',
        steps: []
    };
    pathObject.recipeId = recipeId;
    uploadedFiles.forEach((file) => {
        if (file.fieldname === 'finalImage') {
            pathObject.finalImage = file.path.split('back')[1].replaceAll('\\', '/')
        } else {
            let newStep = { id: parseInt(file.filename.match(/\d+/)[0]), image: file.path.split('back')[1].replaceAll('\\', '/') }
            pathObject.steps.push(newStep);
        }
    })
    return pathObject;
}

const uploadImages = async (req, res) => {
    try {
        // Get the id of the empty recipe
        const recipeInfo = await recipeRepository.createRecipe({});
        const recipeId = recipeInfo.insertedId.toString();
        let pathObject;

        // Management of the files that I need to upload
        const upload = multer({ storage: multer_storage(recipeId) }).any();
        upload(req, res, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al cargar los archivos' });
            }
            // Creates an object with the images paths
            pathObject = createPathObject(recipeId, req.files);
            res.status(200).json({ imagesPath: pathObject });
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error interno al subir las imágenes' })
    }
}

module.exports = { uploadImages };