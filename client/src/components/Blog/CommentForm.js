import React,{useState} from 'react'
import {Container, Row, Col, InputGroup, Input, Button, InputGroupAddon, InputGroupText} from 'reactstrap'
import axios from 'axios'
import { validateEmail } from 'components/misc/helper';
const CommentForm = ({postId,updateCommment}) => {
    const [firstFocus, setFirstFocus] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);
    const [username, setUsername] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [msgError, setMsgError] = useState('')
    const [message, setMessage] = useState('')
    const [loader, setLoader] = useState(false)
    const updateName = (e) =>{
        setUsername(e.target.value)
        setNameError('')
    }
    const updateEmail = (e) =>{
        setUserEmail(e.target.value)
        setEmailError('')
    }
    const updateMsg = (e) =>{
        setMessage(e.target.value)
        setMsgError('')
    }
    const resetFormInputs = () =>{
        setUsername('')
        setUserEmail('')
        setMessage('')
    }
    const resetFormInputErrors = (data) =>{
        setMsgError(() => data.msgError === "" && data.idError !== "undefined" ? data.idError : data.setMsgError)
        setNameError(data.nameError)
        setEmailError(data.emailError)
    }
    const handleSubmit = (e) =>{
        if(username === "") setNameError("Enter Your Name")
        if(message === "") setMsgError("Enter Your Comment")
        if(userEmail === "") setEmailError("Enter Your Email Address")
        if(!validateEmail(userEmail)) {
          setEmailError("Enter A Valid Email Address")
          return
        }
        if(username.trim() !== "" && userEmail.trim() !== "" && message.trim() !== ""){
            setLoader(true)
            resetFormInputErrors({emailError:'',nameError: '',msgError: ''})
            axios.post('/postComment',{name:username,email:userEmail,message,postId}).then(res =>{
                const data =  res.data
                setLoader(false)
                if(data.status){
                    resetFormInputs()
                    updateCommment([data.comment])
                    return setMsgError("Comment Posted Successfully")
                }
                resetFormInputErrors(data)
            }).catch(error =>{
                setMsgError("An error occurred, try again!")
                setLoader(false)
            })
        }
    }

    return (
        <div className="section section-contact-us text-center">
          <Container>
            <h2 className="title">Comment Below</h2>
            <p className="description">We promise to never publicize your email address.</p>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8" sm="12">
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText style={{padding:'none'}}>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username..."
                    type="text"
                    onChange={updateName}
                    value={username}
                  ></Input>                  
                </InputGroup>
                <span className="text-red">{nameError}</span>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="text"
                    onChange={updateEmail}
                    value={userEmail}
                  ></Input>                  
                </InputGroup>
                <span className="text-red">{emailError}</span>
                <div className="textarea-container">
                  <textarea
                    cols="50"
                    name="name"
                    placeholder="Type a comment..."
                    rows="4"
                    type="textarea"
                    onChange={updateMsg}
                    value={message}
                    className="form-control"
                ></textarea>
                </div><br/>
                <span className="text-red">{msgError}</span>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="success"
                    onClick={handleSubmit}
                    size="sm"
                  >
                    Send Message
                  </Button>
                </div>
            </Col>
        </Row>
        </Container>
        </div>
    )
}

export default CommentForm
