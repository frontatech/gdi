/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import GeneralHeader from "../../Headers/GeneralHeader.js";
import Axios from "axios";
import {NigerianStates} from "../variables/NigerianStates.js";


const AddGDIMember = () =>{
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')
  const [surname, setSurname] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [marital, setMarital] = useState('')
  const [phone, setPhone] = useState(0)
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [passport, setPassport] = useState([])
  const [state, setState] = useState('Abia')
  const [lga, setLga] = useState('Aba North')
  const [defaultLgas, setDefaultLgas] = useState(NigerianStates['Abia'])
  const [nationality, setNationality] = useState('Nigerian')
  const [dob, setDob] = useState('')
  const [father, setFather] = useState('')
  const [primary, setPrimary] = useState('')
  const [primaryQua, setPrimaryQua] = useState('')
  const [primaryDate, setPrimaryDate] = useState('')
  const [secondary, setSecondary] = useState('')
  const [secondaryQua, setSecondaryQua] = useState('')
  const [secondaryDate, setSecondaryDate] = useState('')
  const [tertiaryOne, setTertiaryOne] = useState('')
  const [tertiaryOneQua, setTertiaryOneQua] = useState('')
  const [tertiaryOneDate, setTertiaryOneDate] = useState('')
  const [tertiaryTwo, setTertiaryTwo] = useState('')
  const [tertiaryTwoQua, setTertiaryTwoQua] = useState('')
  const [tertiaryTwoDate, setTertiaryTwoDate] = useState('')
  const [tertiaryThree, setTertiaryThree] = useState('')
  const [tertiaryThreeQua, setTertiaryThreeQua] = useState('')
  const [tertiaryThreeDate, setTertiaryThreeDate] = useState('')
  const [discipline, setDiscipline] = useState('')
  const [ngoOne, setNgoOne] = useState('')
  const [ngoOnePosition, setNgoOnePosition] = useState('')
  const [ngoOneResponsibility, setNgoOneResponsibility] = useState('')
  const [ngoDateOne, setNgoDateOne] = useState('')
  const [ngoTwo, setNgoTwo] = useState('')
  const [ngoTwoPosition, setNgoTwoPosition] = useState('')
  const [ngoTwoResponsibility, setNgoTwoResponsibility] = useState('')
  const [ngoDateTwo, setNgoDateTwo] = useState('')
  // error messages
  const [surnameError, setSurnameError] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [genderError, setGenderError] = useState('')
  const [maritalError, setMaritalError] = useState('')
  const [phoneError, setPhoneError] = useState(null)
  const [emailError, setEmailError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [passportError, setPassportError] = useState([])
  const [stateError, setStateError] = useState('')
  const [lgaError, setLgaError] = useState('')
  const [nationalityError, setNationalityError] = useState('')
  const [dobError, setDobError] = useState('')
  const [fatherError, setFatherError] = useState('')
  const [primaryError, setPrimaryError] = useState('')
  const [primaryQuaError, setPrimaryQuaError] = useState('')
  const [primaryDateError, setPrimaryDateError] = useState('')
  const [secondaryError, setSecondaryError] = useState('')
  const [secondaryQuaError, setSecondaryQuaError] = useState('')
  const [secondaryDateError, setSecondaryDateError] = useState('')
  const [tertiaryOneError, setTertiaryOneError] = useState('')
  const [tertiaryOneQuaError, setTertiaryOneQuaError] = useState('')
  const [tertiaryOneDateError, setTertiaryOneDateError] = useState('')
  const [tertiaryTwoError, setTertiaryTwoError] = useState('')
  const [tertiaryTwoQuaError, setTertiaryTwoQuaError] = useState('')
  const [tertiaryTwoDateError, setTertiaryTwoDateError] = useState('')
  const [tertiaryThreeError, setTertiaryThreeError] = useState('')
  const [tertiaryThreeQuaError, setTertiaryThreeQuaError] = useState('')
  const [tertiaryThreeDateError, setTertiaryThreeDateError] = useState('')
  const [disciplineError, setDisciplineError] = useState('')
  const [ngoOneError, setNgoOneError] = useState('')
  const [positionOneError, setPositionOneError] = useState('')
  const [responsibilityOneError, setResponsibilityOneError] = useState('')
  const [ngoDateOneError, setNgoDateOneError] = useState('')
  const [ngoTwoError, setNgoTwoError] = useState('')
  const [positionTwoError, setPositionTwoError] = useState('')
  const [responsibilityTwoError, setResponsibilityTwoError] = useState('')
  const [ngoDateTwoError, setNgoDateTwoError] = useState('')

  const handleSurnameChange = (e) =>{
    setSurname(e.target.value)
    setSurnameError('')
  }
  const handleFirstnameChange = (e) =>{
    setFirstName(e.target.value)
    setFirstNameError('')
  }
  const handleLastnameChange = (e) =>{
    setLastName(e.target.value)
    setLastNameError('')
  }
  const handleGenderChange = (e) =>{
    setGender(e.target.value)
    setGenderError('')
  }
  const handleMaritalChange = (e) =>{
    setMarital(e.target.value)
    setMaritalError('')
  }
  const handlePhoneChange = (e) =>{
    setPhone(e.target.value)
    setPhoneError('')
  }
  const handleEmailChange = (e) =>{
    setEmail(e.target.value)
    setEmailError('')
  }
  const handleAddressChange = (e) =>{
    setAddress(e.target.value)
    setAddressError('')
  }
  const handlePassportChange = (e) =>{
    setPassport(e.target.files)
    setPassportError('')
  }
  const handleStateChange = (e) =>{
    setDefaultLgas(NigerianStates[e.target.value])
    setLga(NigerianStates[e.target.value][0])
    setState(e.target.value)
    setStateError('')
  }
  const handleLgaChnage = (e) =>{
    setLga(e.target.value)
    setLgaError('')
  }
  const handleNationalityChange = (e) =>{
    setNationality(e.target.value)
    setNationalityError('')
  }
  const handleDobChange = (e) =>{
    setDob(e.target.value)
    setDobError('')
  }
  const handleFatherChange = (e) =>{
    setFather(e.target.value)
    setFatherError('')
  }
  const handlePrimaryChange = (e) =>{
    setPrimary(e.target.value)
    setPrimaryError('')
  }
  const handlePrimaryQuaChange = (e) =>{
    setPrimaryQua(e.target.value)
    setPrimaryQuaError('')
  }
  const handlePrimaryDateChange = (e) =>{
    setPrimaryDate(e.target.value)
    setPrimaryDateError('')
  }
  const handleSecondaryChange = (e) =>{
    setSecondary(e.target.value)
    setSecondaryError('')
  }
  const handleSecondaryQuaChnage = (e) =>{
    setSecondaryQua(e.target.value)
    setSecondaryQuaError('')
  }
  const handleSecondaryDateChange = (e) =>{
    setSecondaryDate(e.target.value)
    setSecondaryDateError('')
  }
  const handleTertiaryOneChange = e =>{
    setTertiaryOne(e.target.value)
    setTertiaryOneError('')
  }
  const handleTertiaryOneQuaChange = e =>{
    setTertiaryOneQua(e.target.value)
    setTertiaryOneError('')
  }
  const handleTertiaryOneDateChange = e =>{
    setTertiaryOneDate(e.target.value)
    setTertiaryTwoDateError('')
  }
  const handleTertiaryTwoChange = e =>{
    setTertiaryTwo(e.target.value)
    setTertiaryTwoError('')
  }
  const handleTertiaryTwoDateChange =  e =>{
    setTertiaryTwoDate(e.target.value)
    setTertiaryOneDateError('')
  }
  const handleTertiaryTwoQuaChange = e =>{
    setTertiaryTwoQua(e.target.value)
    setTertiaryTwoQuaError('')
  }
  const handleTertiaryThreeChange = e =>{
    setTertiaryThree(e.target.value)
    setTertiaryThreeError('')
  }
  const handleTertiaryThreeQuaChange = e =>{
    setTertiaryThreeQua(e.target.value)
    setTertiaryThreeDateError('')
  }
  const handleTertiaryThreeDateChange = e =>{
    setTertiaryThreeDate(e.target.value)
    setTertiaryOneDateError('')
  }
  const handleDisciplineChange = e =>{
    setDiscipline(e.target.value)
    setDisciplineError('')
  }
  const handleNgoOneChange = e =>{
    setNgoOne(e.target.value)
    setNgoOneError('')
  }
  const handleNgoOnePosition = e =>{
    setNgoOnePosition(e.target.value)
  }
  const handleNgoOneDate = e =>{
    setNgoDateOne(e.target.value)
  } 
  const handleNgoOneResponsibility = e =>{
    setNgoOneResponsibility(e.target.value)
  }
  const handleNgoTwo = e =>{
    setNgoTwo(e.target.value)
  }
  const handleNgoTwoPosition = e =>{
    setNgoTwoPosition(e.target.value)
  }
  const handleNgoTwoResponsibility = e =>{
    setNgoTwoResponsibility(e.target.value)
  }
  const handleNgoTwoDate = e =>{
    setNgoDateTwo(e.target.value)
  }
  const resetFormInputs = () =>{
    setSurname('')
    setFirstName('')
    setLastName('')
    setGender('')
    setMarital('')
    setPhone('')
    setEmail('')
    setPassport('')
    setAddress('')
    setDob('')
    setFather('')
    setPrimary('')
    setPrimaryQua('')  
    setPrimaryDate('')
    setSecondary('')
    setSecondaryQua('')
    setSecondaryDate('')
    setTertiaryOne('')
    setTertiaryOneQua('')
    setTertiaryOneDate('')
    setTertiaryTwo('')
    setTertiaryTwoQua('')
    setTertiaryTwoDate('')
    setTertiaryThree('')
    setTertiaryThreeQua('')
    setTertiaryThreeDate('')
    setDiscipline('')
    setNgoOne('')
    setNgoOnePosition('')
    setNgoDateOne('')
    setNgoOneResponsibility('')
    setNgoTwo('')
    setNgoTwoPosition('')
    setNgoTwoResponsibility('')
    setNgoDateTwo('')
  }
  const handleSubmit = e =>{
    e.persist()
    e.preventDefault()
    let isError = false;
    if(surname.trim() === ""){
      setSurnameError('Please enter member surname')
      isError = true
    }
    if(firstName.trim() === ""){
      setFirstNameError('Please enter member first name')
      isError = true
    }
    if(lastName.trim() === ""){
      setLastNameError('Please enter member last name')

    }
    if(gender.trim() === ""){
      setGenderError('Please select  member gender')
      isError = true
    }
    if(marital.trim() === ""){
      setMaritalError('Please select member gender')
      isError = true
    }
    if(phone === null){
      setPhoneError('Please enter member phone number')
      isError = true
    }
    if(address.trim() === ""){
      setAddressError('Please enter member home address')
      isError = true
    }
    if(passport.length === 0){
      setPassportError('Please select a photo file')
      isError = true
    }
    if(state.trim() === ""){
      setStateError('Please select member state')
      isError = true
    }
    if(lga.trim() === ""){
      setLgaError('Please select member LGA')
      isError = true
    }
    if(nationality.trim() === ""){
      setNationalityError('Please select Member Nationality')
      isError = true
    }
    if(dob.trim() === ""){
      setDobError('Please date of birth error')
      isError = true
    }
    if(father.trim() === ""){
      setFatherError("Please enter member's father name")
      isError = true
    }
    if(primary.trim() === ""){
      setPrimaryError("Please enter member's primary")
      isError = true
    }
    if(primaryQua.trim() === ""){
      setPrimaryQuaError("Please enter primary school qualification")
      isError = true
    }
    if(primaryDate.trim() === ""){
      setPrimaryDateError("Please enter primary school graduation date")
      isError = true
    }
    if(secondary.trim() === ""){
      setSecondaryError("Please enter secondary school name")
      isError = true
    }
    if(secondaryQua.trim() === ""){
      setSecondaryQuaError("Please enter secondary qualification")
      isError = true
    }
    if(secondaryDate.trim() === ""){
      setSecondaryDateError("Please enter secondary date")
      isError = true
    }
    if(tertiaryOne.trim() === ""){
      setTertiaryOneError("Please enter first tertiary institution")
      isError = true
    }
    if(tertiaryOneQua.trim() === ""){
      setTertiaryOneQuaError("Please enter first tertiary institution qualification")
      isError = true
    }
    if(tertiaryOneDate.trim() === ""){
      setTertiaryOneDateError("Please enter first tertiary institution date")
      isError = true
    }
    if(discipline.trim() === ""){
      setDisciplineError("Please enter member's discipline")
    }
    if(!isError){
      setLoader(true)
      const formData = new FormData()
      formData.append('surname',surname)
      formData.append('firstName',firstName)
      formData.append('lastName',lastName)
      formData.append('gender',gender)
      formData.append('marital',marital)
      formData.append('phone',phone)
      formData.append('email',email)
      formData.append('address',address)
      formData.append('passport',passport[0])
      formData.append('state',state)
      formData.append('lga',lga)
      formData.append('nationality',nationality)
      formData.append('dob',dob)
      formData.append('father', father)
      formData.append('primary',primary)
      formData.append('primaryQua',primaryQua)
      formData.append('primaryDate',primaryDate)
      formData.append('secondary',secondary)
      formData.append('secondaryQua',secondaryQua)
      formData.append('secondaryDate',secondaryDate)
      formData.append('tertiaryOne',tertiaryOne)
      formData.append('tertiaryOneQua',tertiaryOneQua)
      formData.append('tertiaryOneDate',tertiaryOneDate)
      formData.append('tertiaryTwo',tertiaryTwo)
      formData.append('tertiaryTwoQua',tertiaryTwoQua)
      formData.append('tertiaryTwoDate',tertiaryTwoDate)
      formData.append('tertiaryThree',tertiaryThree)
      formData.append('tertiaryThreeQua',tertiaryThreeQua)
      formData.append('tertiaryThreeDate',tertiaryThreeDate)
      formData.append('discipline',discipline)
      formData.append('ngoOne',ngoOne)
      formData.append('positionOne',ngoOnePosition)
      formData.append('responsibilityOne',ngoOneResponsibility)
      formData.append('ngoDateOne',ngoDateOne)
      formData.append('ngoTwo',ngoTwo)
      formData.append('positionTwo',ngoTwoPosition)
      formData.append('responsiblityTwo',ngoTwoResponsibility)
      formData.append('ngoDateTwo', ngoDateTwo)
      console.log(' request sent');
      Axios.post('/addMember',formData).then(res =>{
        console.log(res)
        setLoader(false)
        if(res.data.isError){
          return setMessage(res.data.error)
        }
        resetFormInputs()
        return setMessage(res.data.message)
      }).catch(error =>{
        setLoader(false)
        if(error.response){
          let err = error.response
          setMessage(err.data.error)
        }
        else if(error.request){
          setMessage('Sorry an error occurred, please try again')
        }
        else{
          setMessage('Sorry an error occurred, try again')
        }
        
      })
    }
  }
    return (
      <>
        <GeneralHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="text-center">Add New GDI Member</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Member Personal Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-surname"
                            >
                              Surname
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-surname"
                              placeholder="surname"
                              type="text"
                              value={surname}
                              onChange={handleSurnameChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{surnameError}</p>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first"
                            >
                              First Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first"
                              placeholder="First name"
                              type="text"
                              value={firstName}
                              onChange={handleFirstnameChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{firstNameError}</p>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last"
                            >
                              Last Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last"
                              placeholder="Last Name"
                              type="text"
                              value={lastName}
                              onChange={handleLastnameChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{lastNameError}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                            <Row>
                                <Col lg="4"><label
                                    className="form-control-label mb-3"
                                    htmlFor="input-gender"
                                    >
                                    Gender
                                    </label></Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                    className="form-control-label mb-3"
                                    htmlFor="input-gender-male"
                                    >
                                    Male
                                    </label>
                                    <Input
                                    className="form-control-alternative ml-5"
                                    id="input-gender-male"
                                    placeholder="First name"
                                    name="gender"
                                    type="radio"
                                    value="male"
                                    onChange={handleGenderChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                    className="form-control-label mb-3"
                                    htmlFor="input-gender-female"
                                    >
                                    Female
                                    </label>
                                    <Input
                                    className="form-control-alternative ml-5"
                                    id="input-gender-female"
                                    name="gender"
                                    value="female"
                                    type="radio"
                                    onChange={handleGenderChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <p className="text-danger">{genderError}</p>
                            </Row>
                        </Col>
                        <Col lg="6">
                            <Row>
                                <Col lg="4"><label
                                className="form-control-label mb-3"
                                htmlFor="input-marital"
                                >
                                Marital Status
                                </label></Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                    className="form-control-label mb-3"
                                    htmlFor="input-marital-married"
                                    >
                                    Married
                                    </label>
                                    <Input
                                    className="form-control-alternative ml-5"
                                    id="input-marital-married"
                                    name="marital"
                                    type="radio"
                                    value="married"
                                    onChange={handleMaritalChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                    className="form-control-label mb-3"
                                    htmlFor="input-marital-single"
                                    >
                                    Single
                                    </label>
                                    <Input
                                    className="form-control-alternative ml-5"
                                    id="input-marital-single"
                                    name="marital"
                                    value="single"
                                    type="radio"
                                    onChange={handleMaritalChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <p className="text-danger">{maritalError}</p>
                            </Row>
                        </Col>
                    </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                            Phone Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-phone"
                              placeholder="e.g 0813839485"
                              type="text"
                              value={phone}
                              onChange={handlePhoneChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{phoneError}</p>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Email Address"
                              type="email"
                              value={email}
                              onChange={handleEmailChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{emailError}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Home Address"
                              type="textarea"
                              value={address}
                              onChange={handleAddressChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{addressError}</p>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-passport"
                            >
                              Passport
                            </label>
                            <Input
                              className="form-control"
                              style={{position: 'inherit',opacity: 1}}
                              type="file" accept="image/*" id="popassport"
                              onChange={handlePassportChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{passportError}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              State
                            </label>
                            <select
                              className="form-control"
                              id="input-state"
                              placeholder="Home Address"
                              onChange={handleStateChange}
                              value={state}
                            >
                              {
                                Object.entries(NigerianStates).map(([key, value]) =>
                                  <option>{key}</option>
                                )
                              }
                            </select>
                          </FormGroup>
                          <p className="text-danger">{stateError}</p>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-lga"
                            >
                              LGA
                            </label>
                            <select
                              className="form-control"
                              id="input-lga"
                              placeholder="Home Address"
                              onChange={handleLgaChnage}
                              value={lga}
                            >
                              {
                                defaultLgas.map(stateLga => (
                                  <option>{stateLga}</option>
                                ))
                              }
                                
                            </select>
                          </FormGroup>
                          <p className="text-danger">{lgaError}</p>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Nationality
                            </label>
                            <select
                              className="form-control"
                              id="input-state"
                              placeholder="Home Address"
                              value={nationality}
                              onChange={handleNationalityChange}
                            >
                                <option>Nigerian</option>
                                <option>Non-Nigerian</option>
                            </select>
                          </FormGroup>
                          <p className="text-danger">{nationalityError}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-dob"
                            >
                              Date of Birth
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-dob"
                              placeholder="dd-mm-yyyy"
                              type="date"
                              value={dob}
                              onChange={handleDobChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{dobError}</p>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-father"
                            >
                              Father's Full Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first"
                              placeholder="Father's Full name"
                              type="text"
                              value={father}
                              onChange={handleFatherChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{fatherError}</p>
                        </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Academic information
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-primary"
                            >
                              Primary School
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-primary"
                              placeholder="Primary School"
                              type="text"
                              value={primary}
                              onChange={handlePrimaryChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{primaryError}</p>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-primary-qualification"
                            >
                              Qualification
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-primary-qualification"
                              placeholder="Qualification"
                              type="text"
                              value={primaryQua}
                              onChange={handlePrimaryQuaChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{primaryQuaError}</p>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-primary-date"
                            >
                              Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-primary-date"
                              placeholder="Date"
                              type="date"
                              value={primaryDate}
                              onChange={handlePrimaryDateChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{primaryDateError}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-secondary"
                            >
                              Secondary School
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-primary"
                              placeholder="Secondary School"
                              type="text"
                              value={secondary}
                              onChange={handleSecondaryChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{secondaryError}</p>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-second-qualification"
                            >
                              Qualification
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-secondary-qualification"
                              placeholder="Qualification"
                              type="text"
                              value={secondaryQua}
                              onChange={handleSecondaryQuaChnage}
                            />
                          </FormGroup>
                          <p className="text-danger">{secondaryQuaError}</p>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-secondary-date"
                            >
                              Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-secondary-date"
                              placeholder="Date"
                              type="date"
                              value={secondaryDate}
                              onChange={handleSecondaryDateChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{secondaryDateError}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-institution1"
                            >
                              Tertiary Institution 1
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tertiary1"
                              placeholder="Tertiary Institution 1"
                              type="text"
                              value={tertiaryOne}
                              onChange={handleTertiaryOneChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{tertiaryOneError}</p>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tertiary1-qualification"
                            >
                              Qualification
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tertiary1-qualification"
                              placeholder="Qualification"
                              type="text"
                              value={tertiaryOneQua}
                              onChange={handleTertiaryOneQuaChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{tertiaryOneDateError}</p>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tertiary1-date"
                            >
                              Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tertiary1-date"
                              placeholder="Date"
                              type="date"
                              value={tertiaryOneDate}
                              onChange={handleTertiaryOneDateChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{tertiaryOneDateError}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-institution2"
                            >
                              Tertiary Institution 2
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tertiary1"
                              placeholder="Tertiary Institution 2"
                              type="text"
                              value={tertiaryTwo}
                              onChange={handleTertiaryTwoChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tertiary2-qualification"
                            >
                              Qualification
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tertiary2-qualification"
                              placeholder="Qualification"
                              type="text"
                              value={tertiaryTwoQua}
                              onChange={handleTertiaryTwoQuaChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tertiary2-date"
                            >
                              Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tertiary2-date"
                              placeholder="Date"
                              type="date"
                              value={tertiaryTwoDate}
                              onChange={handleTertiaryTwoDateChange}
                            />
                          </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-institution3"
                            >
                              Tertiary Institution 3
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tertiary3"
                              placeholder="Tertiary Institution 3"
                              type="text"
                              value={tertiaryThree}
                              onChange={handleTertiaryThreeChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tertiary3-qualification"
                            >
                              Qualification
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tertiary3-qualification"
                              placeholder="Qualification"
                              type="text"
                              value={tertiaryThreeQua}
                              onChange={handleTertiaryThreeQuaChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tertiary3-date"
                            >
                              Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tertiary3-date"
                              placeholder="Date"
                              type="date"
                              value={tertiaryThreeDate}
                              onChange={handleTertiaryThreeDateChange}
                            />
                          </FormGroup>
                        </Col>
                    </Row>
                    
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-discipline"
                            >
                              Discipline
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-displine"
                              placeholder="Discipline"
                              type="text"
                              value={discipline}
                              onChange={handleDisciplineChange}
                            />
                          </FormGroup>
                          <p className="text-danger">{disciplineError}</p>
                        </Col>
                      </Row>
                      
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Experience on NGO Activities
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-ngo-name1"
                            >
                              NGO Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-ngo-name1"
                              placeholder="NGO NAME"
                              type="text"
                              value={ngoOne}
                              onChange={handleNgoOneChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-position1"
                            >
                              Position
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-position1"
                              placeholder="Position"
                              type="text"
                              value={ngoOnePosition}
                              onChange={handleNgoOnePosition}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-responsibility1"
                            >
                              Responsibility
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-responsibility1"
                              placeholder="Responsibility"
                              type="text"
                              value={ngoOneResponsibility}
                              onChange={handleNgoOneResponsibility}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-date1"
                            >
                              Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-date1"
                              placeholder="Date"
                              type="date"
                              value={ngoDateOne}
                              onChange={handleNgoOneDate}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-ngo-name2"
                            >
                              NGO Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-ngo-name2"
                              placeholder="NGO NAME"
                              type="text"
                              value={ngoTwo}
                              onChange={handleNgoTwo}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-position2"
                            >
                              Position
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-position2"
                              placeholder="Position"
                              type="text"
                              value={ngoTwoPosition}
                              onChange={handleNgoTwoPosition}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-responsibility2"
                            >
                              Responsibility
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-responsibilty2"
                              placeholder="Responsibility"
                              type="text"
                              value={ngoTwoResponsibility}
                              onChange={handleNgoTwoResponsibility}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-date2"
                            >
                              Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-date2"
                              placeholder="Date"
                              type="date"
                              value={ngoDateTwo}
                              onChange={handleNgoTwoDate}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="d-block text-center">
                        <div className="text-danger">{message}</div>
                      </div>
                      
                      {loader ? (<div className="d-block text-center">
                              <div className="spinner-border fast" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                          </div>): null}
                    </div>
                    <div className="text-center mt-4">
                            <Button color="warning" onClick={handleSubmit} outline type="submit">
                                Submit
                            <i className="far fa-paper-plane" className="ml-2" />
                        </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default AddGDIMember;
