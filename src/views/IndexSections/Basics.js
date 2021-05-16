/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from 'react';
import classnames from "classnames";
// plugin that creates slider
import Slider from "nouislider";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  CustomInput,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  ListGroupItem,
  ListGroup,
  CardFooter,
  UncontrolledTooltip,
  UncontrolledCarousel,
} from "reactstrap";

import Web3 from 'web3';
import simpleStorage from '../../abis/SimpleStorage.json';

const web3 = new Web3(Web3.givenProvider);

// contract address is provided by Truffle migration
const contractAddr = '0x8Bb231a2Ebce40Ae9137862E69401B2b389AdaB1';

const SimpleContract = new web3.eth.Contract(simpleStorage.abi, contractAddr);

export default function Basics() {
  const [inputFocus, setInputFocus] = React.useState(false);
  const [tabs, setTabs] = React.useState(1);
  const slider1 = React.useRef(null);
  const slider2 = React.useRef(null);
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState('0x00');
  const [addr1, setaddr1] = useState(0x00);
  const [addr2, setaddr2] = useState(0x00);
  const [value1, setvalue1] = useState(null);
  const [value2, setvalue2] = useState(null);
  // React.useEffect(() => {
  //   Slider.create(slider1.current, {
  //     start: [40],
  //     connect: [true, false],
  //     step: 1,
  //     range: { min: 0, max: 100 },
  //   });
  //   Slider.create(slider2.current, {
  //     start: [20, 60],
  //     connect: [false, true, false],
  //     step: 1,
  //     range: { min: 0, max: 100 },
  //   });
  // },[]);

  const handleSet = async (e) => {
    e.preventDefault();    
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await SimpleContract.methods.set(number)
                        .estimateGas();
    const result = await SimpleContract.methods.set(number).send({
      from: account,
      gas 
    })
    console.log(result);
  }

  const handleGet = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get().call();
    setGetNumber(result);
    console.log(result);
  }
  
  return (
    <div className="section section-basic" id="basic-elements">
      <img
        alt="..."
        className="path"
        src={require("assets/img/path1.png").default}
      />
      <Container>
      <Row>
              <Col md="10">
                <hr className="line-info" />
                <h1>
                  My{" "}
                  <span className="text-info">Roster</span>
                </h1>
              </Col>
              <Col md="2">
                <Button
                className="btn-simple"
                color="danger"
                type="button"
              >
                Change Roster
            </Button>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/lora.jpg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Point Guard</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pointguard"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pointguard"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pointguard"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Player News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 90241</p>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/james.jpg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Center</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#center"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#center"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#center"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 62723</p>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/mike.jpg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Shooting Guard</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#shootingguard"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#shootingguard"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#shootingguard"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 23571</p>
                  </CardBody>
                </Card>
              </Col>
              </Row>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/ryan.jpg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Small Forward</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#smallforward"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#smallforward"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#smallforward"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 52272</p>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/julie.jpeg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Power Forward</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#powerforward"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#powerforward"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#powerforward"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 845034</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <h1 className="text-center"><strong>VS</strong></h1>
            <Row>
              <Col md="10">
                <hr className="line-danger" />
                <h1>
                  Their{" "}
                  <span className="text-danger">Roster</span>
                </h1>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/lora.jpg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Point Guard</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pointguard"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pointguard"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pointguard"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Player News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 90241</p>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/james.jpg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Center</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#center"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#center"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#center"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 62723</p>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/mike.jpg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Shooting Guard</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#shootingguard"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#shootingguard"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#shootingguard"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 23571</p>
                  </CardBody>
                </Card>
              </Col>
              </Row>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/ryan.jpg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Small Forward</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#smallforward"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#smallforward"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#smallforward"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 52272</p>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/julie.jpeg").default}
                    />
                    <h3 className="title text-center">Name</h3>
                    <h4 className="title text-center">Power Forward</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#powerforward"
                        >
                          Score
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#powerforward"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#powerforward"
                        >
                          News
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">STAT</th>
                              <th className="header">MULTIPLIER</th>
                              <th className="header">POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Serial Num</td>
                              <td>2</td>
                              <td>48,870.75 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>64,53.30 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>18,354.96 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>18,354.96 </td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest Crypto News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                    <p className="text-right">Contract Addr 0x60f80121c31a0d46b5279700f9df786054aa5ee5</p>
                    <br></br>
                    <p className="text-right">Token ID 845034</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
        <Row>
          <Col md="10">
            <hr className="line-success" />
            <h1>
              The{" "}
              <span className="text-success">Demo</span>
            </h1>
          </Col>
          <Col lg="3" sm="6">
              <FormGroup>
                <Input defaultValue="" placeholder="Regular" type="text" />
              </FormGroup>
            </Col>
        </Row>
        <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set addr1:
            <input 
              type="text"
              name="name"
              value={addr1}
              onChange={ e => setaddr1(e.target.value) } />
          </label>
          <label>
            Set addr2:
            <input 
              type="text"
              name="name"
              value={addr2}
              onChange={ e => setaddr2(e.target.value) } />
          </label>
          <label>
            Set values1:
            <input 
              type="text"
              name="name"
              value={value1}
              onChange={ e => setvalue1(e.target.value) } />
          </label>
          <label>
            Set values2:
            <input 
              type="text"
              name="name"
              value={value2}
              onChange={ e => setvalue2(e.target.value) } />
          </label>
          
          <input type="submit" value="Set Setup" />
        </form>
        <br/>
        <button
          onClick={handleGet}
          type="button" > 
          Get Number 
        </button>
        { getNumber }
      </header>
      <br></br>
      <br></br>
      <br></br>
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input 
              type="text"
              name="name"
              value={number}
              onChange={ e => setNumber(e.target.value) } />
          </label>
          <input type="submit" value="Set Number" />
        </form>
        <br/>
        <button
          onClick={handleGet}
          type="button" > 
          Get Number 
        </button>
        { getNumber }
      </header>
        {/* <h3>Buttons</h3>
        <p className="category">Pick your style</p>
        <Row>
          <Col md="10">
            <Button color="primary" type="button">
              Default
            </Button>
            <Button className="btn-round" color="primary" type="button">
              Round
            </Button>
            <Button className="btn-round" color="primary" type="button">
              <i className="tim-icons icon-heart-2" />
              With Icon
            </Button>
            <Button
              className="btn-icon btn-round"
              color="primary"
              type="button"
            >
              <i className="tim-icons icon-heart-2" />
            </Button>
            <Button
              className="btn-simple btn-round"
              color="primary"
              type="button"
            >
              Simple
            </Button>
          </Col>
        </Row>
        <p className="category">Pick your size</p> */}
        {/* <Row>
          <Col md="10">
            <Button color="primary" size="sm">
              Small
            </Button>
            <Button color="primary">Regular</Button>
            <Button color="primary" size="lg">
              Large
            </Button>
          </Col>
        </Row> */}
        {/* <p className="category">Pick your color</p>
        <Row>
          <Col md="12">
            <Button color="default">Default</Button>
            <Button color="primary">Primary</Button>
            <Button color="info">Info</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="danger">Danger</Button>
            <Button className="btn-neutral" color="default">
              Neutral
            </Button>
          </Col>
        </Row> */}
        {/* <br />
        <h3>Links</h3>
        <Row>
          <Col md="8">
            <Button color="link">Default</Button>
            <Button className="btn-link" color="primary">
              Primary
            </Button>
            <Button className="btn-link" color="info">
              Info
            </Button>
            <Button className="btn-link" color="success">
              Success
            </Button>
            <Button className="btn-link" color="warning">
              Warning
            </Button>
            <Button className="btn-link" color="danger">
              Danger
            </Button>
          </Col>
        </Row> */}
        {/* <div className="space-70" />
        <div id="inputs">
          <h3>Inputs</h3>
          <p className="category">Form Controls</p>
          <Row>
            <Col lg="3" sm="6">
              <FormGroup>
                <Input defaultValue="" placeholder="Regular" type="text" />
              </FormGroup>
            </Col>
            <Col lg="3" sm="6">
              <FormGroup className="has-success">
                <Input
                  className="form-control-success"
                  defaultValue="Success"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="3" sm="6">
              <FormGroup className="has-danger">
                <Input
                  className="form-control-danger"
                  defaultValue="Error Input"
                  type="email"
                />
              </FormGroup>
            </Col>
            <Col lg="3" sm="6">
              <InputGroup
                className={classnames({
                  "input-group-focus": inputFocus,
                })}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Left Font Awesome Icon"
                  type="text"
                  onFocus={(e) => setInputFocus(true)}
                  onBlur={(e) => setInputFocus(false)}
                />
              </InputGroup>
            </Col>
            <Col lg="3" sm="6">
              <InputGroup>
                <Input placeholder="Right Nucleo Icon" type="text" />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="tim-icons icon-lock-circle" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </div> */}
        {/* <div className="space-70" />
        <Row id="checkRadios">
          <Col lg="3" sm="6">
            <p className="category">Checkboxes</p>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />
                <span className="form-check-sign" />
                Unchecked
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input defaultChecked type="checkbox" />
                <span className="form-check-sign" />
                Checked
              </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input disabled type="checkbox" />
                <span className="form-check-sign" />
                Disabled Unchecked
              </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input defaultChecked disabled type="checkbox" />
                <span className="form-check-sign" />
                Disabled Checked
              </Label>
            </FormGroup>
          </Col>
          <Col lg="3" sm="6">
            <p className="category">Radios</p>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultValue="option1"
                  id="exampleRadios1"
                  name="exampleRadios"
                  type="radio"
                />
                <span className="form-check-sign" />
                Radio is off
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultChecked
                  defaultValue="option2"
                  id="exampleRadios1"
                  name="exampleRadios"
                  type="radio"
                />
                <span className="form-check-sign" />
                Radio is on
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-radio" disabled>
              <Label check>
                <Input
                  defaultValue="option3"
                  disabled
                  id="exampleRadios2"
                  name="exampleRadios1"
                  type="radio"
                />
                <span className="form-check-sign" />
                Disabled radio is off
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-radio" disabled>
              <Label check>
                <Input
                  defaultChecked
                  defaultValue="option4"
                  disabled
                  id="exampleRadios2"
                  name="exampleRadios1"
                  type="radio"
                />
                <span className="form-check-sign" />
                Disabled radio is on
              </Label>
            </FormGroup>
          </Col>
          <Col lg="3" sm="6">
            <p className="category">Toggle Buttons</p>
            <CustomInput type="switch" id="switch-1" />
            <br />
            <CustomInput type="switch" id="switch-2" label="With label" />
          </Col>
          <Col lg="3" sm="6">
            <p className="category">Sliders</p>
            <div className="slider" ref={slider1} />
            <br />
            <div className="slider slider-info mb-3" ref={slider2} />
          </Col>
        </Row> */}
      </Container>
    </div>
  );
}
