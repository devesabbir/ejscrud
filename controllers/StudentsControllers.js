const fs = require('fs')
const path = require('path')
const Student = require('../models/StudentModel')

//GET ALL STUDENTS 
const AllStudents = async (req, res) => {
    try {
        const students = await Student.find()
        res.render('index', {title:'All Students', students: students}) 
    } catch (error) {
       console.log(error)
    }
}


//Get Single Student 
const SingleStudent = async (req , res) => {
  const id = req.params.id
  try {
     const singleStudent = await Student.findById(id)  
     if(!singleStudent){
        res.status(400).json({message:'Data Not Found'})
     }else{
       res.render('single', {title:singleStudent.name, singleStudent:singleStudent})
     }
  } catch (error) {
     console.log(error);
  }    
 
}

// Create Form 
const CreateForm = (req, res) => {
    res.render('createform', {title:'Student Create Form'})
}

// Student Data Post Form
const StudentDataPost = async (req, res) => {
     try {
         if(!req.file){
           await Student.create({...req.body, photo:''})
           res.redirect('/students')     
         }else{
            await Student.create({...req.body, photo:req.file.filename})
            res.redirect('/students')   
         }   
     } catch(error) {
       console.log(error);  
  }
} 

// Student Edit Form
const StudentEditForm = async (req,res) => {
    const id  = req.params.id
    const editableData = await Student.findById(id)
    res.render('editform',{title:'Edit Form', editdata:editableData})
}

//Edit Student 
const StudentDataEdit = async (req, res) => {
    const id = req.body.id
    const oldPhotoName = req.body.old_photo

    try {
        if(!req.file){
              await Student.findByIdAndUpdate(id,{...req.body,photo:oldPhotoName},{upsert:true})
              res.redirect('/students')               
        }else{

            if(!oldPhotoName){
                await Student.findByIdAndUpdate(id,{...req.body,photo:req.file.filename},{upsert:true})
                res.redirect('/students') 
            }else{
                fs.unlinkSync(path.join(__dirname,'../assets/uploads/'+ oldPhotoName))
                await Student.findByIdAndUpdate(id,{...req.body,photo:req.file.filename},{upsert:true})
                res.redirect('/students')  
            }
           
        }
        
    } catch (error) {
        console.log(error);
    }
   
} 


// const Delete Student
const DeleteStudent = async (req,res) => {
   const id = req.params.id
   try {
    const targetStudent = await Student.findById(id)
    if(!targetStudent){
       res.status(400).json({message:'Student Not Found!'})
    }else{
      await Student.findByIdAndDelete(id)
      if(targetStudent.photo !== ''){
         fs.unlinkSync(path.join(__dirname, `../assets/uploads/${targetStudent.photo}`))
         res.redirect('/students')
      }else{
         res.redirect('/students')
      }
    
      
    } 
   } catch (error) {
      console.log(error);
   }
}



module.exports = {
    AllStudents,
    SingleStudent,
    CreateForm,
    StudentDataPost,
    DeleteStudent,
    StudentEditForm,
    StudentDataEdit
}



