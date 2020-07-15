let express = require('express')
let adminRouter = express.Router()
let {fileUploadError,handleImageFileUpload,isEmpty,validateEmail,} = require('./appFunctions')
let auth = require('./authVerify')
let fs = require('fs')
let slugify =  require('slugify')
let db = require('./db')

// adding blog post to database
// const IMAGE_DIR = "./public/blog_images/";
// const IMAGE_FILENAME = "fileToUpload";
// const INPUT_SIZE = 7
// const acceptImageFile = handleImageFileUpload(IMAGE_DIR,IMAGE_FILENAME,INPUT_SIZE)
// adminRouter.post('/addpost',auth.protectedRoute, (req,res) =>{
//     let postStatus = false
//     acceptImageFile.uploadFile(req,res,(err) =>{
//         if(err) return res.json({postStatus,postBgError: "Only .png, .jpg or .jpeg format allowed"})
//         const url = req.protocol + '://'+ req.get('host')
//         let postBg = url + '/blog_images/' +req.files[0].filename
//         let data = JSON.parse(JSON.stringify(req.body))
//         let message = "";
//         let isError = false;
//         if(isEmpty(data))return res.json({postStatus,message:"Sorry you are not permitted to add data"})
//         if(data.postContent === "") isError = true
//         if(data.postTitle === "") isError = true
//         if(data.postDescript === "")isError = true
//         if(data.postAuthor === "")isError = true
//         if(data.postType === "" || data.postType === "Select Post Type") isError = true
//         if(data.postTags === "")isError = true
//         if(data.postCat === "" || data.postCat === "Select Category") isError = true
//         if(isError){
//             // else remove the uploaded file
//             return fileUploadError(res,fileurl,{message:"An Error Occurred,Ensure You Fill All Fields",postStatus})
//         }
//             let post_slug = slugify(data.postTitle,{lower:true,strict:true}).trim()
//             let post = {post_author: data.postAuthor, post_content: data.postContent, post_descript: data.postDescript, post_title: data.postTitle, post_date: new Date(), post_slug, post_bg: postBg, post_cat: data.postCat, post_type: data.postType, post_tags:data.postTags}
//             let sql = "INSERT INTO posts SET ?"
//             db.query(sql, post, (err, result) =>{
//                 if(err)return fileUploadError(res,fileurl,{message:"An error occured",postStatus:false})
//                 res.json({message:"Post Added Successfully",postStatus:true})
                
//             })
//     })
    

// })

// // add course to mysql database.
// const DIR = "./public/course_images/";
// const FILENAME = "courseBanner";
// const SIZE = 7
// const acceptFile = handleImageFileUpload(DIR,FILENAME,SIZE)
// adminRouter.post('/addcourse', async (req,res) =>{
//     let postStatus = false
//     await acceptFile.uploadFile(req,res,(err) =>{
//         if(req.files.length === 0 || !isEmpty(err)){
//             let courseBgError = "Please select a file"
//             if(err !== undefined) courseBgError = err.error
//             return res.json({postStatus,courseBgError})
//         }
//         const fileurl = req.protocol + '://'+ req.get('host')
//         let courseUrl = DIR +req.files[0].filename
//         let courseBanner = fileurl + '/public/course_images/' +req.files[0].filename
//         let data = JSON.parse(JSON.stringify(req.body))
//         let isError = false
//         if(isEmpty(data))return res.json({postStatus,contentError:"Sorry you are not permitted to add a course"})
//         if(data.courseContent === "") isError = true
//         if(data.courseTitle === "") isError = true
//         if(data.courseDescript === "") isError = true
//         if(data.courseTags === "") isError = true 
//         if(data.courseDuration === "" || data.courseDuration === "Select Duration") isError = true 
//         if(!isError){
//             let courseSlug = slugify(data.courseTitle,{lower:true,strict:true}).trim()
//             let course = {courseContent:data.courseContent,courseTitle:data.courseTitle,courseDescript:data.courseDescript,courseTags:data.courseTags,courseDuration:data.courseDuration,courseBanner, courseDate: new Date(), courseSlug}
//             let sql = "INSERT INTO courses SET ?"
//             db.query(sql, course, (err, result) =>{
//                 if(err){
//                     const data = {message:"An error occurred, try again",postStatus:false}
//                     return fileUploadError(res,fileurl,data)
//                 }
//                 postStatus = true
//                 res.json({contentError,titleError,descriptError,durationError,tagError,postStatus})
//             })
            
//         }
//         else{
//             const data = {message:"An error occurred,please try again later",postStatus}
//             return fileUploadError(res,fileurl,data)
            
//         }
//     })
    

// })
module.exports = adminRouter