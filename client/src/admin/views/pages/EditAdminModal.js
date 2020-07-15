import React, { useState, useContext } from 'react';
import {Modal, ModalHeader, ModalBody, FormGroup, Col, Form, Button } from 'reactstrap';
import { AdminUsersContext } from 'admin/context/AdminUsersContext';
import LatestPosts from 'components/Blog/LatestPosts';
import Axios from 'axios';
import { EDIT_ADMIN } from 'admin/actions/actions';

const EditAdminModal = ({isOpen, toggle, member, user}) =>{
    console.log(member)
    const [adminRole, setAdminRole] = useState('')
    const [roleError, setRoleError] = useState('')
    const [loader, setLoader] = useState(false)
    const {dispatch} = useContext(AdminUsersContext)
    const handleRoleChange = e =>{
        setRoleError('')
        setAdminRole(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setRoleError('')
        console.log(adminRole)
        let isError = false
        if(adminRole.trim() === "" || adminRole.trim() === "Select Admin") {
            setRoleError("Select Admin Role")
            isError = true;
        }
        if(!isError){
            setLoader(true)
            member.role = adminRole
            Axios.patch(`/admin/update/${member.id}`,{member,user}).then(res =>{
                if(res.data.success){
                    dispatch({type: EDIT_ADMIN,payload:res.data.member})
                    setRoleError(res.data.message)
                    setTimeout(() => {
                        setRoleError('')
                    }, 2000);
                    setLoader(false)
                }
            }).catch(error =>{
                setLoader(false)
                if(error.response){
                    setRoleError(error.response.data.error)
                    setTimeout(() => {
                        setRoleError('')
                    }, 2000);
                }
            })
        }

    }
    return(
            <Modal isOpen={isOpen} backdrop fade modalClassName="col-lg-4 container">
                <ModalHeader toggle={toggle}>
                Edit {`${member.username}'s role`}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Col lg="12">
                            <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="role"
                            >
                                Admin Role
                            </label>
                            <select value={adminRole} onChange={handleRoleChange} className="form-control">
                                <option value="select">Select Admin</option>
                                {user.role === "ceo" ?<option value="super">Super</option>:null}
                                <option value="editor">Editor</option>
                                <option value="author">Author</option>
                            </select>
                            </FormGroup>
                            <br />
                            <p className="text-danger">{roleError}</p>
                            <br />
                        </Col>
                        <Col>
                        {loader ? (<div className="d-block text-center">
                              <div className="spinner-border fast" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                          </div>): null}
                        <div className="pl-lg-4">                        
                        <div className="text-center mt-1">
                                <Button onClick={handleSubmit} color="warning" outline type="submit">
                                    Update Admin Role
                                <i className="far fa-paper-plane" className="ml-2" />
                            </Button>
                        </div>
                    </div>
                        </Col>
                    </Form>
                </ModalBody>
            </Modal>
    )
}

export default EditAdminModal;