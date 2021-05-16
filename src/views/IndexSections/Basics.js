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
import bet from '../../abis/Bet.json';

const web3 = new Web3(Web3.givenProvider);

// contract address is provided by Truffle migration
const contractAddr = '0x752651bde8c23ec1EfFb88137eCbAD956E111845';
const betContractAddr = '0x2C5E32A60EB72769819B3941022FF8dA213dAE05';

const SimpleContract = new web3.eth.Contract(simpleStorage.abi, contractAddr);
const BetContract = new web3.eth.Contract(bet.abi, betContractAddr);

export default function Basics() {
  const [inputFocus, setInputFocus] = React.useState(false);
  const [tabs, setTabs] = React.useState(1);
  const slider1 = React.useRef(null);
  const slider2 = React.useRef(null);
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState('0x00');
  const [valid, setValid] = useState('false');
  const [addr1, setaddr1] = useState('0x43013c8A7601955a47bbDc061c11E26E32b48702');
  const [addr2, setaddr2] = useState('0xD7bBC6478ab1994096dB02D8E874AFb9f6C998B4');
  const [usr1, setusr1] = useState([644, 46, 19, 48, 501]);
  const [usr2, setusr2] = useState([7564, 76, 3035, 236, 78]);
  const [beforeValue1, setBeforeValue1] = useState([[1650000, 119990000, 800000000, 22990000, 2600000],
    [0, 10000, 10000, 10000, 5000],
    [50000000, 460000, 250000, 990000, 18000000],
    [20000, 20000, 10000, 20000, 20000],
    [0, 0, 10000, 0, 0]]);
  const [beforeValue2, setBeforeValue2] = useState([[440000, 120000000, 40000, 6280000, 27990000],
    [0, 5000, 0, 5000, 10000],
    [100000000, 790000, 350000000, 2750000, 990000],
    [20000, 10000, 20000, 10000, 10000],
    [0, 0, 0, 0, 0]]);
  const [afterValue1, setAfterValue1] = useState([[1420000, 132580000, 810000000, 35000000, 3370000],
    [0, 10000, 10000, 10000, 5000],
    [50000000, 460000, 250000, 990000, 18000000],
    [20000, 20000, 10000, 20000, 20000],
    [0, 0, 10000, 0, 0]]);
  const [afterValue2, setAfterValue2] = useState([[320000, 15400000, 40000, 8430000, 42080000],
    [0, 5000, 0, 5000, 10000],
    [100000000, 790000, 350000000, 2750000, 990000],
    [20000, 10000, 20000, 10000, 10000],
    [0, 0, 0, 0, 0]]);
  const [beforeSetupResult, setBeforeSetupResult] = useState();
  const [afterSetupResult, setAfterSetupResult] = useState();
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

  const check = async (e) => {
    e.preventDefault();
    const result = await BetContract.methods.check().call();
    if (JSON.stringify(result) === JSON.stringify('0x0000000000000000000000000000000000000000')) {
      setValid(' This is a valid address');
    }
    console.log(result);
  }

  const beforeSetup = async (e) => {
    e.preventDefault();    
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log(addr1);
    console.log(addr2);
    console.log(usr1);
    console.log(usr2);
    console.log(beforeValue1);
    console.log(beforeValue2);
    const gas = await BetContract.methods.setup(addr1, addr2, usr1, usr2, beforeValue1, beforeValue2).estimateGas();
    const result = await BetContract.methods.setup(addr1, addr2, usr1, usr2, beforeValue1, beforeValue2).send({
      from: account,
      gas 
    })
    // await setBeforeSetupResult(result);
    console.log(result);
  }

  const initialUpdate = async (e) => {
    e.preventDefault();
    const result = await BetContract.methods.initialUpdate().call();
    console.log(result);
  }

  const afterSetup = async (e) => {
    e.preventDefault();    
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log(addr1);
    console.log(addr2);
    console.log(usr1);
    console.log(usr2);
    console.log(afterValue1);
    console.log(afterValue2);
    const gas = await BetContract.methods.setup(addr1, addr2, usr1, usr2, afterValue1, afterValue2)
                        .estimateGas();
    const result = await BetContract.methods.set(addr1, addr2, usr1, usr2, afterValue1, afterValue2).send({
      from: account,
      gas 
    })
    // await setAfterSetupResult(result);
    console.log(result);
  }

  const getWinner = async (e) => {
    e.preventDefault();    
    // const accounts = await window.ethereum.enable();
    // const account = accounts[0];
    // const gas = await BetContract.methods.setup(addr1, addr2, usr1, usr2, beforeValue1, beforeValue2)
    //                     .estimateGas();
    // const result = await BetContract.methods.set(addr1, addr2, usr1, usr2, beforeValue1, beforeValue2).send({
    //   from: account,
    //   gas 
    // })
    console.log('winner chicken dinner');
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
              <Col>
                <h3>
                  My Current Score: <strong>239043</strong>
                </h3>
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
                    <h3 className="title text-center">John</h3>
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
                              <td>501 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>0.5 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>1800 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>2 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>0 </td>
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
                    <h3 className="title text-center">Johnny</h3>
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
                              <td>644 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>0 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>5000 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>2 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>0 </td>
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
                    <h3 className="title text-center">Jonathan</h3>
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
                              <td>48 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>1 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>99 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>2 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>0 </td>
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
                    <h3 className="title text-center">Joe</h3>
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
                              <td>644 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>1 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>46 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>2 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>0 </td>
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
                    <h3 className="title text-center">Rick</h3>
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
                              <td>19 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>1 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>1 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>25 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>1 </td>
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
              <Col md="12">
                <hr className="line-danger" />
                <h1>
                  Their{" "}
                  <span className="text-danger">Roster</span>
                </h1>
              </Col>
              <Col>
                <h3>
                  Their Current Score: <strong>92184</strong>
                </h3>
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
                    <h3 className="title text-center">Jessi</h3>
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
                              <td>7564 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>0 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>6000 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>2 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>0 </td>
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
                    <h3 className="title text-center">Jesse</h3>
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
                              <td>76 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>0.5 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>79 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>1 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>0 </td>
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
                    <h3 className="title text-center">Jess</h3>
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
                              <td>3035 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>0 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>35000 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>275 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>0 </td>
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
                    <h3 className="title text-center">Jester</h3>
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
                              <td>236 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>0.5 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>275 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>1 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>0 </td>
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
                    <h3 className="title text-center">Jessica</h3>
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
                              <td>78 </td>
                            </tr>
                            <tr>
                              <td>Rarity</td>
                              <td>3</td>
                              <td>1 </td>
                            </tr>
                            <tr>
                              <td>Circulation Count</td>
                              <td>4</td>
                              <td>99 </td>
                            </tr>
                            <tr>
                              <td>Set</td>
                              <td>3</td>
                              <td>1 </td>
                            </tr>
                            <tr>
                              <td>Certified Baller Shot</td>
                              <td>1</td>
                              <td>0 </td>
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
        </Row>
        <button
           className="btn-round" 
           color="primary"
           onClick={check}
           type="button"> 
           Check 
        </button>
        { valid }
        <h3>Before</h3>
        <header className="App-header">
         <form onSubmit={beforeSetup}>
          <label>
            Set addr1:
            <Input 
              type="text"
              name="name"
              value={addr1}
              onChange={ e => setaddr1(e.target.value) } />
          </label>
          <label>
            Set addr2:
            <Input 
              type="text"
              name="name"
              value={addr2}
              onChange={ e => setaddr2(e.target.value) } />
          </label>
          <label>
            Set serialnum1:
            <Input 
              type="text"
              name="name"
              value={usr1}
              onChange={ e => setusr1(e.target.value) } />
          </label>
          <label>
            Set serialnum2:
            <Input 
              type="text"
              name="name"
              value={usr2}
              onChange={ e => setusr2(e.target.value) } />
          </label>
          <label>
            Set values1:
            <Input 
              type="text"
              name="name"
              value={beforeValue1}
              onChange={ e => setBeforeValue1(e.target.value) } />
          </label>
          <label>
            Set values2:
            <Input 
              type="text"
              name="name"
              value={beforeValue2}
              onChange={ e => setBeforeValue2(e.target.value) } />
          </label>
          
          <Input className="success" type="submit" value="Setup" />
          {/* Setup result: { beforeSetupResult } */}
        </form>
        <br/>
        <br></br>
        {/* <button
              className="btn-round" 
              color="primary"
              onClick={initialUpdate}
              type="button"> 
              Initial Update
            </button> */}
        {/* <button
           className="btn-round" 
           color="primary"
           onClick={getWinner}
           type="button"> 
           Get Results 
        </button>
        { getNumber } */}
      </header>
      <br></br>
      <h3>After</h3>
        <header className="App-header">
         <form onSubmit={afterSetup}>
          <label>
            Set addr1:
            <Input 
              type="text"
              name="name"
              value={addr1}
              onChange={ e => setaddr1(e.target.value) } />
          </label>
          <label>
            Set addr2:
            <Input 
              type="text"
              name="name"
              value={addr2}
              onChange={ e => setaddr2(e.target.value) } />
          </label>
          <label>
            Set serialnum1:
            <Input 
              type="text"
              name="name"
              value={usr1}
              onChange={ e => setusr1(e.target.value) } />
          </label>
          <label>
            Set serialnum2:
            <Input 
              type="text"
              name="name"
              value={usr2}
              onChange={ e => setusr2(e.target.value) } />
          </label>
          <label>
            Set values1:
            <Input 
              type="text"
              name="name"
              value={afterValue1}
              onChange={ e => setAfterValue1(e.target.value) } />
          </label>
          <label>
            Set values2:
            <Input 
              type="text"
              name="name"
              value={afterValue2}
              onChange={ e => setAfterValue2(e.target.value) } />
          </label>
          
          <Input className="className" type="submit" value="Setup" />
          {/* Setup result: { afterSetupResult } */}
        </form>
        <br/>
        {/* <button
           className="btn-round" 
           color="primary"
           onClick={handleGet}
           type="button"> 
           Get Results 
        </button>
        { getNumber } */}
      </header>
      <br></br>
      <br></br>
      <br></br>
      <header className="App-header">
        
        <form onSubmit={handleSet}>
          <Row>
            <Col md="3">
              <label>
                Set Number:
                <Input
                  defaultValue=""
                  type="text"
                  name="name"
                  value={number}
                  onChange={ e => setNumber(e.target.value) } />
              </label>
              <Input className="btn-success" type="submit" value="Set Number" />
            </Col>
          </Row>
          <button
              className="btn-round" 
              color="primary"
              onClick={handleGet}
              type="button"> 
              Get Number 
            </button>
            { getNumber }
          
        </form>
        <br/>
        
          
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
