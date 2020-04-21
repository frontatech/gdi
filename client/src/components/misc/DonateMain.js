/*eslint-disable*/
import React, {useState} from "react";
// reactstrap components
import { Container, Card, CardBody, Row,Col, FormGroup, Input,CardFooter, Button, CardTitle } from "reactstrap";
import axios from 'axios'
function DonateMain() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState()
    const [amount, setAmount] = useState()
    const [message,setMessage] = useState('')
    const [loader, setLoader] = useState(false)
    // declaring error vairaibles
    const [userError, setUserError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneErrror] = useState('')
    const [amountError, setAmountError] = useState('')

    const handleNameChange = e =>{
        setUserError('')
        setMessage('')
        setUsername(e.target.value)
    }
    const handleEmailChange = e =>{
        setEmailError('')
        setMessage('')
        setEmail(e.target.value)
    }
    const handlePhoneChange = e =>{
        setPhoneErrror('')
        setMessage('')
        setPhone(e.target.value)
    }
    const handleAmountChange = e =>{
        setAmountError('')
        setMessage('')
        setAmount(e.target.value)
    }
    const resetFormInputs = () =>{
        setUsername('')
        setEmail('')
        setPhone('')
        setAmount('')
        
    }

    const resetErrors = () =>{
        setPhoneErrror('')
        setAmountError('')
        setEmailError('')
        setUserError('')
    }

    
    const handleSubmit = e =>{
        e.preventDefault()
        if(username === ""){
          setUserError("Please enter your full name")
        }
        if(email === ""){
          setEmailError("Please enter your email address")}
        if(parseInt(phone).length < 10 || typeof parseInt(phone) !== "number" || phone === ""){
          setPhoneErrror("Please enter a valid phone number")}
        if(typeof parseInt(amount) !== "number" || parseInt(amount) < 1000 || amount === ""){
          setAmountError("Enter amount from 1000")}
        if(userError === "" && emailError === "" && phoneError === "" && amountError === ""){
            setLoader(true)
            axios.post("/donateNow",{username,email,amount:parseInt(amount),phone:parseInt(phone)}).then(res =>{
                console.log(res.data)
                const data = res.data
                if(data.hasOwnProperty('userError')) setUserError(data.userError)
                if(data.hasOwnProperty('emailError')) setEmailError(data.emailError)
                if(data.hasOwnProperty('phoneError')) setPhoneErrror(data.phoneError)
                if(data.hasOwnProperty('amountError')) setContentError(data.amountError)
                if(data.hasOwnProperty("message"))setMessage(data.message)
                if(data.correct) {
                    setLoader(false)
                    resetFormInputs()
                }
            }).catch(error => {
                setLoader(false)
                setMessage("Sorry an error occured")
            })
        }
    }








  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        
        <Container>
          <div className="brand" style={{top: '100%'}}>
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/now-logo.png")}
            ></img>
            <h1 className="h1-seo text-white">Grassroots Development Initiative</h1>
            <h3>Please make your donation by filing the form below.</h3>
          </div>
          
          <Row className="d-flex justify-content-center">
          <Card className="col-lg-4">
          <CardTitle className="title-up" tag="h3">Donation Information</CardTitle>
          <FormGroup>
              <CardBody>
                    <Row>
                    <Container>
                    <Col lg="12" sm="6">
                
                  <Input
                    defaultValue=""
                    placeholder="Enter Your Full Name"
                    type="text"
                    value={username}
                    onChange={handleNameChange}
                    className="mb-4"
                  ></Input>
                  <span className="text-red">{userError}</span>
                  
                  <Input
                    defaultValue=""
                    placeholder="Enter Email Address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                     className="mb-4"
                  ></Input>
                  <span className="text-red">{emailError}</span>
                  <Input
                    placeholder="Enter Your Phone number"
                    type="number"
                     className="mb-4"
                     value={phone}
                     onChange={handlePhoneChange}
                  ></Input>
                  <span className="text-red">{phoneError}</span>
                  <Input
                    placeholder="Enter Amount"
                    type="number"
                     className="mb-4"
                     value={amount}
                     onChange={handleAmountChange}
                  ></Input>
                  <span className="text-red">{amountError}</span>
                  
              </Col>
            </Container>
                </Row>
              </CardBody>
              <CardFooter className="text-center">
                  <Button
                    className="bg-green btn-round"
                    type="submit"
                    onClick={handleSubmit}
                    size="lg"
                  >
                    Donate Now
                  </Button>
                </CardFooter>
                </FormGroup>
              
          </Card>
          </Row>
          
        </Container>
      </div>
    </>
  );
}

export default DonateMain;
