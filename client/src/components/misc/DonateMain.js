/*eslint-disable*/
import React, {useState} from "react";
// reactstrap components
import { Container, Card, CardBody, Row,Col, FormGroup, Input,CardFooter, Button, CardTitle, Label, CardHeader } from "reactstrap";
import axios from 'axios'
import { validateEmail } from "./helper";
function DonateMain({paidFor}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(0)
  const [amount, setAmount] = useState(0)
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
      setPhone(0)
      setAmount(0)
      
  }
  const verifyPayment = async (response) =>{
    try {
      const result = await axios.post("/donateNow",response)
      console.log(result.data)
      const data = result.data
      setLoader(false)
      setMessage(data.message)
      resetFormInputs()
    } catch (error) {
      setLoader(false)
      setMessage("Sorry an error occured")
    }
  }
  const payWithPaystack = (credentials) =>{
     try {
         // eslint-disable-next-line no-undef
      var handler = PaystackPop.setup({
          key: process.env.REACT_APP_PAYKEY,
          email: credentials.email,
          first_name:credentials.username,
          phone: "0"+credentials.phone,
          amount: credentials.getNairaAmount*100,
          currency: "NGN",
          ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
          metadata: {
             custom_fields: [
                {
                    display_name: "GDI Charity Donation",
                    variable_name: "We need Your Support",
                    first_name: credentials.username,
                    value: "0"+credentials.phone,
                }
             ]
          },
          callback: function(response){
              verifyPayment({...response,...credentials});
          },
          onClose: function(){}
        });
        handler.openIframe();
     } catch (error) {
         console.log(error.message)
     }
      
  }

  const handleSubmit = e =>{
      e.preventDefault()
      let isValid = true;
      if(username.trim() === ""){
        setUserError("Please enter your full name")
        isValid = false;
      }
      if(!validateEmail(email)){
        setEmailError("Please enter your email address")
        isValid = false;
      }
      if(isNaN(phone) || phone.toString().length < 10){
        setPhoneErrror("Please enter a valid phone number")
        isValid = false;
      }
      if(isNaN(amount) || amount < 500){
        setAmountError("Enter amount from 500 Naira & Above")
        isValid = false;
      }
      if(isValid){
          setLoader(true)
          payWithPaystack({getNairaAmount:amount,paidFor:paidFor.paidFor,username,email,amount:parseInt(amount),phone:parseInt(phone)})
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
          <div className="brand">
            <img
              alt="gdi logo"
              className="n-logo"
              src={require("assets/img/gdi-logo.png")}
            ></img>
          </div>
          
          <Row className="d-flex justify-content-center">
          <Card>
            <CardHeader><h2 className="text-dark">{paidFor.mainTitle}</h2></CardHeader>
          <FormGroup>
              <CardBody>
                <Container>
                  <Row>
                    
                    <Col lg="6" sm="6">
                  <Label className="text-dark">Full name</Label>
                  <Input
                    defaultValue=""
                    placeholder="Enter Your Full Name"
                    type="text"
                    value={username}
                    onChange={handleNameChange}
                    className="mb-4"
                  ></Input>
                  <span className="text-red">{userError}</span>
                  </Col>
                  <Col lg="6" sm="6">
                  <Label className="text-dark">Email Address</Label>
                  <Input
                    defaultValue=""
                    placeholder="Enter Email Address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                     className="mb-4"
                  ></Input>
                  <span className="text-red">{emailError}</span>
                  </Col>
                  
                  <Col lg="6" sm="6">
                  <Label className="text-dark">Enter Your Phone Number</Label>
                  <Input
                    placeholder="Enter Your Phone number"
                    type="number"
                     className="mb-4"
                     value={phone}
                     onChange={handlePhoneChange}
                  ></Input>
                  <span className="text-red">{phoneError}</span>
                  </Col>
                  <Col lg="6" sm="6">
                  <Label className="text-dark">Enter Amount</Label>
                  <Input
                    placeholder="Enter Amount"
                    type="number"
                     className="mb-4"
                     value={amount}
                     onChange={handleAmountChange}
                  ></Input>
                  <span className="text-red">{amountError}</span>
                  
              </Col>
            
                </Row>
                {message.trim() !== "" ? <div className="alert alert-info"><h5>{message}</h5></div>:null}
                </Container>
              </CardBody>
              <CardFooter className="text-center">
                  <Button
                    className="btn-round"
                    type="submit"
                    onClick={handleSubmit}
                    size="sm"
                    color="danger"
                    // onClick={handlePayClick}
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
