let express = require('express')
let router = express.Router()
let db = require('./db')
let slugify =  require('slugify')
let fs = require('fs')
let {handleImageFileUpload,isEmpty} = require('./fileUpload')




router.get("/recent",(req,res)=>{
    let sql = "SELECT * FROM posts WHERE post_type = 'General' ORDER BY post_date desc LIMIT 9"
    db.query(sql,(err, result) =>{
        if(err) throw err
        res.json(result)
    })
    
})

// submitting post comment
router.post("/postComment",(req, res) =>{
    const data = req.body
    let status = false;
    let nameError = emailError = msgError = idError = "";
    if(data.name === "") nameError = "Enter Your Name"
    if(data.email === "") emailError = "Enter Your Email Address"
    if(data.message === "") msgError = "Enter Your Comment"
    if(typeof data.postId !== "number" || data.postId === "") idError = "Wrong Post Comment Sent"
    if(nameError === "" && emailError === "" && msgError === "" && idError === ""){
        const comment = {name:data.name,email:data.email,comment:data.message,date:new Date(),post_id: data.postId}
        let sql = "INSERT INTO post_comments SET ?"
        db.query(sql,comment,(err, result) =>{
            if(err){
                res.json({nameError,emailError,msgError:"Sorry an error occurred and we're notified. We will fix it in due course.Thanks",status})
            }
            res.json({nameError,emailError,status:true,comment})
            console.log(result)
        })
    }
    else{
        res.json({nameError,emailError,msgError,idError,status})
    }
})
// loading post comments 
router.post("/loadMoreComments",(req,res)=>{
    console.log('request more comments arrived')
    console.log(req.body)
    const lastId = req.body.lastId
    const postId = req.body.postId
    if(typeof lastId === 'number' && typeof postId === 'number'){
        let sql = `SELECT * FROM post_comments WHERE comment_id < ? AND post_id = ? ORDER BY comment_id DESC LIMIT 5`
        db.query(sql,[lastId,postId],(err, result) =>{
            console.log(result)
            if(err) throw err
            res.json(result)
        })
    }
    
    
})
// getting all the blog posts
router.get("/posts",(req,res)=>{
    console.log('request arrived')
    let sql = "SELECT * FROM posts ORDER BY post_id desc LIMIT 12;SELECT COUNT(*) as total FROM posts"
    db.query(sql,(err, result) =>{
        if(err) throw err
        if(result.length !== 0){
            res.json({posts:result[0],total:result[1][0].total})
        }
        
    })
    
})
router.post("/loadMorePosts",(req,res)=>{
    console.log('request arrived')
    console.log(req.body)
    const lastId = req.body.lastId
    if(typeof lastId === 'number'){
        let sql = `SELECT * FROM posts WHERE post_id < ${lastId} ORDER BY post_id desc LIMIT 2`
        db.query(sql,(err, result) =>{
            // console.log(result)
            if(err) throw err
            res.json(result)
        })
    }
    
    
})
router.get("/suggested",(req,res)=>{
    let sql = "SELECT * FROM posts WHERE post_type = 'General' ORDER BY post_date desc LIMIT 9"
    db.query(sql,(err, result) =>{
        if(err) throw err
        res.json(result)
    })
    
})
router.get("/featured",(req,res)=>{
    let sql = "SELECT * FROM posts WHERE post_type = 'Featured Post' ORDER BY post_date desc LIMIT 12"
    db.query(sql,(err, result) =>{
        if(err) throw err
        res.json(result)
    })
    
})
router.get("/sponsored",(req,res)=>{
    let sql = "SELECT * FROM posts WHERE post_type = 'Sponsored Post' ORDER BY post_date desc LIMIT 12"
    db.query(sql,(err, result) =>{
        if(err) throw err
        res.json(result)
    })
    
})
// accepting the contact us request
router.post("/contact",(req,res)=>{
    const data = JSON.parse(JSON.stringify(req.body))
    let userError = emailError = subjectError = contentError = "";
    let correct = true;
    console.log(data)
    if(data.username === ""){
        userError = "Please enter your username"
        correct = false;
    }
    if(data.email === ""){
        emailError = "Please enter your email address"
        correct = false
    }
    if(data.subject === ""){
        subjectError = "Please enter the subject"
        correct = false;
    }
    if(data.content === ""){
        contentError = "Please enter the message"
        correct = false
    }
    if(!correct) return res.json({userError,emailError,contentError,subjectError,message:"You can not submit empty form"})
    let sql = "INSERT INTO contact SET ?"
    db.query(sql,req.body,(err, result) =>{
        if(err) throw err
        res.json({correct,message:"Message Sent Successfully, Thanks We Will Get Back To You Shortly."})
    })
    
})

router.post('/login',(req, res)=>{
    let userError,pwdError,message = "";
    let correct = true
    let data = JSON.parse(JSON.stringify(req.body))
    if(data.username === ""){
        userError = "Please enter your username";
        correct = false
    }
    if(data.password === ""){
        pwdError = "Please enter your password";
        correct = false
    }
    if(!correct)return res.json({userError,pwdError,message:"Please verify your credentials"})

    res.json({userError,pwdError,message:"Login Successful"})
    
})

// adding blog post to database
const IMAGE_DIR = "./public/blog-images/";
const IMAGE_FILENAME = "fileToUpload";
const INPUT_SIZE = 7
const acceptImageFile = handleImageFileUpload(IMAGE_DIR,IMAGE_FILENAME,INPUT_SIZE)
router.post('/addpost', async (req,res) =>{
    let postStatus = false
    await acceptImageFile.uploadFile(req,res,(err) =>{
        if(err) return res.json({postStatus,postBgError: "Only .png, .jpg or .jpeg format allowed"})
        const url = req.protocol + '://'+ req.get('host')
        let postBg = url + '/images/' +req.files[0].filename
        console.log(postBg)
        let data = JSON.parse(JSON.stringify(req.body))
        let contentError = titleError = descriptError = authorError = catError = postTypeError = tagError = "";
        if(isEmpty(data))return res.json({postStatus,contentError:"Sorry you are not permitted to add data"})
        if(data.postContent === "") contentError = "Please enter more post content"
        if(data.postTitle === "") titleError = "Please enter post title"
        if(data.postDescript === "") descriptError = "Please enter post description"
        if(data.postAuthor === "") authorError = "Please enter author name" 
        if(data.postType === "" || data.postType === "Select Post Type") postTypeError = "Please select post type"
        if(data.postTags === "") tagError = "Please enter post tags" 
        if(data.postCat === "" || data.postCat === "Select Category") catError = "Please select post category" 
        if(contentError === "" && titleError === "" && authorError === "" && descriptError === ""){
            
            let post_slug = slugify(data.postTitle,{lower:true,strict:true}).trim()
            let post = {post_author: data.postAuthor, post_content: data.postContent, post_descript: data.postDescript, post_title: data.postTitle, post_date: new Date(), post_slug, post_bg: postBg, post_cat: data.postCat, post_type: data.postType, post_tags:data.postTags}
            console.log(post_slug)
            let sql = "INSERT INTO posts SET ?"
            db.query(sql, post, (err, result) =>{
                if(err) throw err
                postStatus = true
                res.json({contentError,titleError,descriptError,authorError,postStatus})
            })
            
        }
        else{
            // else remove the uploaded file
            // fs.unlink('')
            res.json({contentError,titleError,descriptError,authorError,postStatus})
        }
    })
    

})
// getting a particular post
router.get("/comments/:slug",(req,res) =>{
    const slug = req.params.slug
    if(slug === "")return res.json({error: true})
    let sql = `SELECT * FROM posts WHERE post_slug = ?`
    db.query(sql,[slug], (err, result) =>{
        if(err) return res.json({error: true})
            const postId = result[0].post_id
            let query = "SELECT * FROM post_comments WHERE post_id = ? ORDER BY comment_id DESC LIMIT 5; SELECT COUNT(*) as total FROM post_comments WHERE post_id = ?";
            db.query(query, [postId,postId], (err, data) =>{
                console.log(data)
                if(err) return res.json({error: true})
                if(data.length === 0){
                    res.json({comments: [],totalComments: 0})  
                }
                res.json({comments: data[0],totalComments: data[1][0].total})
            })
    })
})
// getting a particular post
router.get("/post_details/:slug",(req,res) =>{
    const slug = req.params.slug
    if(slug === "")return res.json({error: true})
    let sql = `SELECT * FROM posts WHERE post_slug = "${slug}"`
    db.query(sql, (err, result) =>{
        if(err) return res.json({error: true})
            const postId = result[0].post_id
            let query = "SELECT * FROM post_comments WHERE post_id = ? ORDER BY comment_id DESC LIMIT 5; SELECT COUNT(*) as total FROM post_comments WHERE post_id = ?";
            db.query(query, [postId,postId], (err, data) =>{
                console.log(data)
                if(err) return res.json({error: true})
                if(data.length === 0){
                    res.json({post:result, comments: [],totalComments: 0})  
                }
                res.json({post:result, comments: data[0],totalComments: data[1][0].total})
            })
    })
})
// throw mysql error
const fileUploadError = (res,courseUrl,object) =>{
    fs.unlink(courseUrl,(err) =>{
        res.json(object)
    })
}

// add course to mysql database.
const DIR = "./public/course-images/";
const FILENAME = "courseBanner";
const SIZE = 7
const acceptFile = handleImageFileUpload(DIR,FILENAME,SIZE)
router.post('/addcourse', async (req,res) =>{
    console.log(req.body)
    let postStatus = false
    await acceptFile.uploadFile(req,res,(err) =>{
        if(req.files.length === 0 || !isEmpty(err)){
            let courseBgError = "Please select a file"
            if(err !== undefined) courseBgError = err.error
            return res.json({postStatus,courseBgError})
        }
        const fileurl = req.protocol + '://'+ req.get('host')
        let courseUrl = DIR +req.files[0].filename
        let courseBanner = fileurl + '/public/course-images/' +req.files[0].filename
        console.log(courseBanner)
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        let contentError = titleError = descriptError  = durationError  = tagError = "";
        if(isEmpty(data))return res.json({postStatus,contentError:"Sorry you are not permitted to add a course"})
        if(data.courseContent === "") contentError = "Please enter more course content"
        if(data.courseTitle === "") titleError = "Please enter course title"
        if(data.courseDescript === "") descriptError = "Please enter course description"
        if(data.courseTags === "") tagError = "Please enter course tags" 
        if(data.courseDuration === "" || data.courseDuration === "Select Duration") durationError = "Please select course duration" 
        if(contentError === "" && titleError === "" && durationError === "" && descriptError === "" && tagError === ""){
            
            let courseSlug = slugify(data.courseTitle,{lower:true,strict:true}).trim()
            let course = {courseContent:data.courseContent,courseTitle:data.courseTitle,courseDescript:data.courseDescript,courseTags:data.courseTags,courseDuration:data.courseDuration,courseBanner, courseDate: new Date(), courseSlug}
            console.log(courseSlug)
            let sql = "INSERT INTO courses SET ?"
            db.query(sql, course, (err, result) =>{
                if(err){
                    const data = {contentError:"An error occurred,please try again later",titleError,descriptError,durationError,tagError,postStatus}
                    return fileUploadError(res,fileurl,data)
                }
                postStatus = true
                res.json({contentError,titleError,descriptError,durationError,tagError,postStatus})
            })
            
        }
        else{
            const data = {contentError:"An error occurred,please try again later",titleError,descriptError,durationError,tagError,postStatus}
            return fileUploadError(res,fileurl,data)
            
        }
    })
    

})
// fetching all the courses from the database
router.get("/courses",(req,res)=>{
    let sql = "SELECT * FROM courses"
    db.query(sql,(err, result) =>{
        if(err) console.log(error.message)
        res.json(result)
    })
    
})
// getting a particular course
router.get("/course_details/:slug",(req,res) =>{
    console.log(req.params.slug)
    const slug = req.params.slug
    if(slug === "")return res.json({error: true})
    let sql = `SELECT * FROM courses WHERE courseSlug = "${slug}"`
    db.query(sql, (err, result) =>{
        if(err) return res.json({error: true})
        console.log(result)
        res.json(result)
    })
    
})

// getting suggested courses
router.get("/suggested_courses/:id",(req,res) =>{
    console.log(req.params.id)
    const id = req.params.id
    if(id !== ""){
        if(id === 0)return res.json({error: true})
        let sql = `SELECT * FROM courses WHERE courseId != "${id}" LIMIT 6`
        db.query(sql, (err, result) =>{
            if(err) return res.json({error: true})
            console.log(result)
            res.json(result)
        })
    }
    
    
})

// adding a course to database
router.post('/newsletter', (req,res) =>{
    let emailError = "";
    let status = false;
    let data = JSON.parse(JSON.stringify(req.body))
    if(data.email === "") emailError = "Please enter your email address"
    if(emailError === ""){
        let query = `SELECT * FROM newsletter WHERE email = ?`
    db.query(query, [data.email], (err, result) =>{
        if(err) throw err
        if(result.length === 0){
            let sql = 'INSERT INTO newsletter SET ?'
            db.query(sql, {email:data.email,status:1}, (err, result) =>{
                if(err) return console.log(err)
                res.json({emailError,status:true})
            })
        }
        else{
            res.json({emailError:"Email address already exist",status})
        }
    })
        
        
    }
})
// when making a donation
router.post("/donateNow",(req,res) =>{
    let nameError = emailError = phoneError = amountError = "";
    const data = req.body
    console.log(req.body)
    const name = data.name
    const email = data.email
    const phone = parseInt(data.phone)
    const amount = parseInt(data.amount)
    if(name === "") nameError = "Please enter your name"
    if(email === "") emailError = "Please enter your email address"
    if(phone === "" || typeof phone !== 'number')phoneError = "Please enter a valid phone number"
    if(data.amount === "" || amount < 1000 || typeof amount !== 'number') amountError = "Please enter a valid amount"
    
    if(nameError === "" && emailError === "" && amountError === "" && phoneError === ""){
        console.log("hello am here")
        let sql = "INSERT INTO donations SET ?"
        db.query(sql, {name,email,phone,amount,status:1,date:new Date()},(err,result) =>{
            if(err) throw err
            console.log(result)
        })
    }
})
module.exports = router