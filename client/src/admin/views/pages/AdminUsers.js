import React, { Fragment, useRef, useContext, useState, useReducer } from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardFooter
} from "reactstrap";
// core components
import GeneralHeader from "../../Headers/GeneralHeader";
import { AdminUsersContext } from "admin/context/AdminUsersContext";
import { UserAuthContext } from "admin/context/UserAuthContext";
import Axios from "axios";
import { BLOCK_ADMIN } from "admin/actions/actions";
import { DELETE_ADMIN } from "admin/actions/actions";
import EditAdminModal from "./EditAdminModal";

const AdminUsers = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [editUser, setEditUser] = useState({})
  const {adminUsers:{admins,totalAdmins}, dispatch} = useContext(AdminUsersContext)
  const {user:{user}} = useContext(UserAuthContext)
  const handleModal = (e, member) =>{
    e.preventDefault()
    setIsOpen(!isOpen)
    setEditUser(member)
  }
    const toggleModal = () =>{
      setIsOpen(!isOpen)
    }
    const handleDeleteMember = async (e, member) =>{
      e.preventDefault()
      alert("Are sure u wanna delete this admin member?")
      try {
        const res = await Axios.delete(`/admin/delete/?user=${JSON.stringify(user)}&member=${JSON.stringify(member)}`)
        console.log(res)
        dispatch({type:DELETE_ADMIN,payload:res.data.member})
      } catch (error) {
        if(error.response){
          console.log(error.response.data)
        }
      }
    }
    const handleBlockAdmin = async (e,member,type) =>{
      e.preventDefault()
      try {
        type === "block" ? member.status = 0 : member.status = 1
        const res = await Axios.patch(`/admin/block/${member.id}`,{member,user})
        if(res.data){
          console.log(res.data.member)
          dispatch({type:BLOCK_ADMIN,payload:res.data.member})
        }
      } catch (error) {
        if(error.response){
          console.log(error.response.data.error)
        }
        else if(error.request){
          console.log(error.request)
        }
        else{
          console.log(error.message)
        }
      }
    }
    
    return (
        <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container fluid>
            <CardHeader><h3 className="text-center">We have  {totalAdmins} Admin Members</h3></CardHeader>
          <Row>

              {admins.map(member => (
                  <Col className="order-xl-2 mb-5 mb-xl-0" xl="4" key={`${member.username}-${member.id}`} className="mb-3">
                  <Card className="card-profile shadow" style={{background: user._id === member.id ? 'aliceblue':null}}>
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                            <Link
                                to={{
                                    pathname: `/admin/profile/${member.username.toLowerCase()}-${member.id}`,
                                    state: {member}
                                }}
                                id="tooltip742438047">
                                <img
                                alt="..."
                                style={{width:100, height: 100, maxWidth: 100}}
                                className="rounded-circle"
                                src={require('../../assets/img/brand/gdi-logo.png')}
                                />                                            
                            </Link>
                        </div>
                      </Col>
                    </Row>
                    <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                      <div className="d-flex justify-content-between">
                        {user.role === "ceo" ?
                                    user._id === member.id ? null : member.status === 1 ? <Button
                                    className="mr-4"
                                    color="danger"
                                    href="#pablo"
                                    onClick={e => handleBlockAdmin(e, member,'block')}
                                    size="sm"
                                    >
                                    Block
                                    </Button>
                                    :
                                    <Button
                                    className="float-right"
                                    color="warning"
                                    href="#pablo"
                                    onClick={e => handleBlockAdmin(e, member, 'unblock')}
                                    size="sm"
                                    >
                                    Unblock
                                    </Button>
                            : 
                            user.role === "super" ? member.role === 'ceo' || member.role === 'super'? null : 
                                user._id === member.id ? null : member.status === 1 ? 
                                    <Button
                                    className="mr-4"
                                    color="danger"
                                    href="#pablo"
                                    onClick={e => handleBlockAdmin(e, member, 'block')}
                                    size="sm"
                                    >
                                    Block
                                    </Button>
                                    :
                                    <Button
                                    className="float-right"
                                    color="warning"
                                    href="#pablo"
                                    onClick={e => handleBlockAdmin(e, member, 'unblock')}
                                    size="sm"
                                    >
                                    Unblock
                                    </Button>
                            :null
                        }
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0 pt-md-4">
                      <Row>
                        <div className="col">
                          <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                            <div>
                              <span className="heading">{member.total_posts}</span>
                              <span className="description">Posts</span>
                            </div>
                          </div>
                        </div>
                      </Row>
                      <div className="text-center">
                        <h3>
                          <Link to="#" className="font-weight-bold mb-0">{member.username} ~ </Link>
                          <span className="font-weight-light">, 
                            <small className="text-lowercase">{member.role}</small>
                          </span>
                        </h3>
                        {user.role === "ceo" ?
                            <div className="container mt-2">
                                <div className="d-flex justify-content-between"> 
                                    {user._id !== member.id ? 
                                      <>
                                        <Link to="#" onClick={(e) =>handleDeleteMember(e,member)}><i className="fa fa-times text-danger" /></Link>
                                        <Link to="#" onClick={e => handleModal(e, member)}><i className="fa fa-edit text-info" />

                                        </Link>
                                        </>
                                    : null
                                    }
                                    
                                    <Link to={{
                                            pathname: `/admin/user-profile`,
                                            state: {member}
                                        }}><i className="fa fa-eye text-success" /></Link>
                                </div>
                            </div>
                        : user.role === "super" ?
                        <div className="container mt-2">
                            <div className="d-flex justify-content-between">
                                {member.role === "ceo" || member.role === "super" ? null :
                                    <> 
                                        {user._id !== member.id ? 
                                            <Link to="#" onClick={(e) =>handleDeleteMember(e,member)}><i className="fa fa-times text-danger" /></Link>
                                        : null
                                        }
                                        <Link to={{
                                                pathname: `/admin/edit-profile/${member.username.toLowerCase()}-${member.id}`,
                                                state: {member}
                                            }}><i className="fa fa-edit text-info" /></Link>
                                        <Link to={{
                                                pathname: `/admin/profile/${member.username.toLowerCase()}-${member.id}`,
                                                state: {member}
                                            }}><i className="fa fa-eye text-success" /></Link>
                                    </>
                                }
                            </div>
                        </div>
                        :null
                        }
                      </div>
                    </CardBody>
                  </Card>
                  </Col>
              ))}
          </Row>
          <EditAdminModal isOpen={isOpen} member={editUser} toggle={toggleModal} user={user} />
        </Container>
      </Fragment>
    )
}

export default AdminUsers
