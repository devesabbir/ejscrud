const express = require('express');
const router = express.Router();
const {AllStudents, SingleStudent, CreateForm, StudentDataPost, DeleteStudent, StudentEditForm, StudentDataEdit} = require('../controllers/StudentsControllers')
const path = require('path')
const multer = require('multer');

// Multer 
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets/uploads'))
    },
    filename: (req, file, cb) => {
        if(!file){
           cb(null, new Error('Invalid'))
        }else{
            cb(null, Date.now() + '_' + file.originalname);
        }   
    }
})

const studentsMulter = multer({
    storage: diskStorage
}).single('photo')


router.get('/', AllStudents)
router.get('/create', CreateForm)
router.post('/create', studentsMulter, StudentDataPost)
router.post('/edit', studentsMulter, StudentDataEdit)
router.get('/:id', SingleStudent)
router.get('/delete/:id', DeleteStudent)
router.get('/edit/:id', StudentEditForm)


module.exports = router;