import React,{useState, useRef} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios'
import JoditEditor from "jodit-react";
import HandleRequest from "../functions/HandleRequest";
import { Button } from "reactstrap";
// import CkEditorApp from "./CkEditorApp";
// import JodiEditorApp from "../JodiEditorApp"
const PostForm = ({history}) => {
    const editor = useRef(null)
    const config = {
        readonly: false,
        uploader:{
            insertImageAsBase64URI: true
        }
    }
    // post variables
    const [postTitle, setPostTitle] = useState('')
    const [postAuthor, setPostAuthor] = useState('')
    const [postDescript, setPostDescript] = useState('')
    const [postContent, setPostContent] = useState('') 
    const [postCat, setPostCat] = useState('')
    const [postType, setPostType] = useState('')
    const [postTags, setPostTags] = useState('')
    const [postBg, setPostBg] = useState([])
    // error variables
    const [titleError, setTitleError] = useState('')
    const [authorError, setAuthorError] = useState('')
    const [descriptError, setDescriptError] = useState('')
    const [contentError, setContentError] = useState('')
    const [catError, setCatError] = useState('')
    const [tagError, setTagError] = useState('')
    const [postBgError, setPostBgError] = useState('')
    const [postTypeError, setTypeError] = useState('')
    const [loader, setLoader] = useState(false)
    // event functions
    const handleAuthorChange = (e) =>{
        setAuthorError('')
        setPostAuthor(e.target.value)
    }
    const handleTitleChange = e =>{
        setTitleError('')
        setPostTitle(e.target.value)
    }
    const handleDescriptChange = e =>{
        setDescriptError('')
        setPostDescript(e.target.value)
    }
    const handleContentChange = e =>{
        setContentError('')
        setPostContent(e)   
    }
    const handleCategoryChange = e =>{
        setCatError('')
        setPostCat(e.target.value)
    }
    const handleTypeChange = e =>{
        setCatError('')
        setPostType(e.target.value)
    }
    const handleMetaChange = e =>{
        setTagError('')
        setPostTags(e.target.value)
    }
    const handleImageUpload = e =>{
        setPostBgError('')
        setPostBg(e.target.files)
    }
    const resetFormInputs = () =>{
        setPostAuthor('')
        setPostContent('')
        setPostTitle('')
        setPostDescript('')
        setPostTags('')
        setPostBgError('')
    }

    const handleSubmit = e =>{
        e.preventDefault()
        let isError = false;
        
        if(postAuthor === "") {
            setAuthorError("Enter Post Author")
            isError = true;
        }
        if(postTitle === "") {
            setTitleError("Enter Post Title")
            isError = true;
        }
        if(postDescript === "") {
            setDescriptError("Enter Post Description")
            isError = true;
        }
        if(postContent === "") {
            setContentError("Enter Post Content")
            isError = true;
        }
        if(postType === "" || postType === "Select Post Type") {
            setTypeError("Please Select Post Type")
            isError = true;
        }
        if(postTags === "") {
            setTagError("Please Enter Post Tags")
            isError = true;
        }
        if(postCat === "" || postCat === "Select Category") {
            setCatError("Please Select Post Category")
            isError = true;
        }
        if(postBg.length === 0) {
            setPostBgError("Please Select Post Background Image")
            isError = true;
        }
        if(!isError){
            setLoader(true)
            // postContent = "hello world"
            const formData = new FormData()
            formData.append('fileToUpload', postBg[0])
            formData.append('postAuthor', postAuthor)
            formData.append('postTitle', postTitle)
            formData.append('postCat', postCat)
            formData.append('postDescript', postDescript)
            formData.append('postTags', postTags)
            formData.append('postType', postType)
            formData.append('postContent', 'Hello world')
           console.log('passed validation')
           axios.post('/addpost',formData, {withCredentials: true, headers:{
            'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin':"*"
                }}).then(res =>{
                    console.log('im here')
                    console.log(res)
                    const data =  res.data 
                    setLoader(false)
                    if(data.postStatus){
                        // RESET POST FORM
                        resetFormInputs()
                        return setContentError(data.message)
                    }
                }).catch(error =>{
                    return history.push('/auth/login')
                })




        //    axios.interceptors.response.use(response =>{
        //        console.log(response)
        //        return response
        //    }, error =>{
        //        return new Promise((resolve, reject) =>{
        //            console.log(error)
        //             axios.post('/addpost',formData, {withCredentials: true, headers:{
        //                 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin':"*"
        //             }}).then(res =>{
        //                 console.log('im here')
        //                 console.log(res)
        //                 const data =  res.data 
        //                 setLoader(false)
        //                 // if(data.postStatus){
        //                     // RESET POST FORM
        //                     // resetFormInputs()
        //                     return setContentError(data.message)
        //                 // }
        //             })
        //         })
        //    })
        }
            
    }


    return (
        <MDBContainer>
            <MDBCard>
                <MDBCardBody>
                    <MDBRow>
                    <MDBCol lg="12">
                    <form id="addPostForm" encType="multipart/form-data">
                        <p className="h4 text-center mb-4">Add new post</p>
                        <label htmlFor="postAuthor" className="grey-text">
                        Your Name
                        </label>
                        <input type="text" value={postAuthor} onChange={handleAuthorChange} id="postAuthor" className="form-control" />
                        <br />
                        <small>{authorError}</small>
                        <br />
                        <label htmlFor="postTitle" className="grey-text">
                        Post Title
                        </label>
                        <input type="text" value={postTitle} onChange={handleTitleChange} id="postTitle" className="form-control" />
                        <br />
                        <small>{titleError}</small>
                        <br />
                        <label htmlFor="postBg" className="grey-text">
                        Post Background Image
                        </label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} id="postBg" className="form-control" />
                        <br />
                        <small>{postBgError}</small>
                        <br />
                        <label htmlFor="postDescript" className="grey-text">
                        Post Description
                        </label>
                        <input type="text" value={postDescript} onChange={handleDescriptChange} id="postDescript" className="form-control" />
                        <br />
                        <small>{descriptError}</small>
                        <br />
                        <label htmlFor="postCategory" className="grey-text">
                        Post Category
                        </label><br />
                        <select onChange={handleCategoryChange} id="postCategory" className="form-control">
                            <option>Select Category</option>
                            <option>React</option>
                            <option>Angular</option>
                            <option>Php</option>
                            <option>React Native</option>
                            <option>Flutter</option>
                        </select>
                        <small>{catError}</small>
                        <br />
                        <label htmlFor="postType" className="grey-text">
                        Post Type
                        </label><br />
                        <select onChange={handleTypeChange} id="postCategory" className="form-control">
                            <option>Select Post Type</option>
                            <option>General</option>
                            <option>Featured Post</option>
                            <option>Sponsored Post</option>
                        </select>
                        <br />
                        <small>{postTypeError}</small>
                        <br />
                        
                        <label htmlFor="postMetatags" className="grey-text">
                        Post Meta Tags
                        </label>
                        <input type="text" placeholder="Enter each separated by a spacebar" value={postTags} onChange={handleMetaChange} id="postMetatags" className="form-control" />
                        <br />
                        <small>{tagError}</small>
                        <br />
                        <label htmlFor="postContent" className="grey-text">
                        Post Content
                        </label>
                        <JoditEditor
                            ref={ref => editor = ref}
                            value={postContent}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => handleContentChange(newContent)} 
                            onChange={newContent => {}}
                        />
                        <br />
                        <small>{contentError}</small><br/>
                        {loader ? (<div className="spinner-border fast d-flex justify-content-center" role="status"><span className="sr-only">Loading...</span></div>): null}
                        
                        <div className="text-center mt-4">
                                <Button onClick={handleSubmit} color="warning" outline type="submit">
                                    AddPost
                                <MDBIcon far icon="paper-plane" className="ml-2" />
                            </Button>
                        </div>
                        </form>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>    
        </MDBContainer>
        );
}

export default PostForm


