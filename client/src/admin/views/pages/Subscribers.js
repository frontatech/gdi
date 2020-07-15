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
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Badge
} from "reactstrap";
// core components
import GeneralHeader from "../../Headers/GeneralHeader";
import Axios from "axios";
import { MembersContext } from "admin/context/MembersContext";
import GDIMembersTable from "./GDIMembersTable";
import SiteSubscribersTable from "./SiteSubscribersTable";

const Subscribers = () => {
    const {memberState:{totalMembers}} = useContext(MembersContext)
    const [iconPills, setIconPills] = React.useState("1");
    const [pills, setPills] = React.useState("1");
    return (
        <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container fluid>
            <CardHeader><h3 className="text-center">We have {totalMembers} GDI members and 20 Site Subscribers</h3></CardHeader>
          <Row>
          <Col lg="12" xl="12" className="mb-2">
              <Card>
                <CardHeader>
                  <Nav className="justify-content-between" role="tablist" tabs>
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
                        GDI Subscribers
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
                        Site Subscribers
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
                    <Card className="shadow">
                      <GDIMembersTable />
                    </Card>
                    </TabPane>
                    <TabPane tabId="iconPills2">
                      <SiteSubscribersTable />
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

export default Subscribers
