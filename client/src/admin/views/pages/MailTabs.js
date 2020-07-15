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
  CardFooter,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap";
// core components
import GeneralHeader from "../../Headers/GeneralHeader";
import { AdminPostsContext } from "admin/context/AdminPostsContext";
// import mjml2html from 'mjml'
import MailTemplateOne from "../mail-templates/NewsletterTemplate";
import { useEffect } from "react";
import Axios from "axios";
import { NewsletterContext } from "admin/context/NewsletterContext";
import NewsletterTemplate from "../mail-templates/NewsletterTemplate";

const MailTabs = ({location:{state:{template}}}) => {
    const {templates:{newsletterTheme}} = useContext(NewsletterContext)
    console.log(newsletterTheme)
    const [iconPills, setIconPills] = React.useState("1");
    const [pills, setPills] = React.useState("1");
    const [mailTemp, setMailTemp] = useState('')
    const {postState:{posts,totalPosts}, dispatch} = useContext(AdminPostsContext)
    // const {templates:{templates}} = useContext(NewsletterContext)
    // console.log(templates)
    const handleDeleteMember = (e, id) =>{
        e.preventDefault()
    }
    const handleTemplate = (temp) =>{

    }
    const htmlToMarkup = (data) =>{
        return {__html:data}
    }
    return (
        <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container fluid>
            <CardHeader><h3 className="text-center">Create newsletter below!</h3></CardHeader>
            
          <Row>
            <Col lg="6" xl="6" className="mb-2">
                {template.name === "newsletter" ? <NewsletterTemplate /> : null}
            </Col>
          <Col lg="6" xl="6" className="mb-2">
              <Card>
                <CardHeader>
                  <Nav className="justify-content-center" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconPills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setIconPills("1");
                        }}
                      >
                        <i className="now-ui-icons objects_umbrella-13"></i>
                        Preview
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconPills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setIconPills("2");
                        }}
                      >
                        <i className="now-ui-icons shopping_cart-simple"></i>
                        Posts
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconPills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setIconPills("3");
                        }}
                      >
                        <i className="now-ui-icons shopping_shop"></i>
                        Events
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconPills === "4" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setIconPills("4");
                        }}
                      >
                        <i className="now-ui-icons ui-2_settings-90"></i>
                        Subscribers
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"iconPills" + iconPills}
                  >
                    <TabPane tabId="iconPills1">
                      {newsletterTheme !== "" ? <div dangerouslySetInnerHTML={htmlToMarkup(newsletterTheme)} />: <div><h1 className="heading">Nothing to preview</h1><p className="description">Your newsletter preview will show here as soon as you hit preview button</p></div>}
                    </TabPane>
                    <TabPane tabId="iconPills2">
                      <p>
                        I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at.
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at.
                      </p>
                    </TabPane>
                    <TabPane tabId="iconPills3">
                      <p>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                    </TabPane>
                    <TabPane tabId="iconPills4">
                      <p>
                        "I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at."
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>      
          </Col>
          </Row>
          
        </Container>
      </Fragment>
    )
}

export default MailTabs
