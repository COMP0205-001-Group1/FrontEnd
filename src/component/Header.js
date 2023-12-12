import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Form, Button, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo119 from "../assets/logo.png";
import axios from 'axios';
import Cam1 from './cam1';

const url = "http://210.104.6.82:10001/camlist";
let cam = "error"
function Navigation(){
    const [jsonData, setJsonData] = useState(null);
    const [cam, setCam] = useState('Cam (OFF)');
    const [cam1, setCam1] = useState('Cam1 (OFF)');
    const [cam2, setCam2] = useState('Cam2 (OFF)');

    useEffect(() => {
        fetchDataHome();
    }, []);

    const fetchDataHome = async () => {
        try {
            const response = await axios.get(url);
            console.log(response.data); // 불러온 JSON 데이터 콘솔에 출력
            setJsonData(response.data); // 데이터를 useState를 통해 저장
        } catch (error) {
            console.error('데이터 가져오기 실패:', error);
            alert('error');
        }
    };

    useEffect(() => {
        if (jsonData) {
            const statusData1 = jsonData[0]?.status || '';
            const statusData2 = jsonData[1]?.status || '';

            if (statusData1 === 1 || statusData2 === 1) {
                setCam('Cam (ON)');
                const a = "cam on"
                console.log({a},{ statusData1 }, { statusData2 }, {cam});
                if(statusData1 ===1){
                    setCam1('Cam1 (ON)');
                }
                if(statusData2 === 1){
                    setCam2('Cam2 (ON)');
                }
            } else {
                setCam('Cam (OFF)');
                const b = "cam off"
                console.log({b},{ statusData1 }, { statusData2 }, {cam});
            }
        }
    }, [jsonData]);
    

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Fire Soulution</Navbar.Brand>
            <div className="Headlogo">
                <div className="Headmonitor">
                    <img src={logo119} alt='logo' width={80} height={40} />
                </div>
            </div>
            <Container fluid>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title = {cam} id = "basic-nav-dropdown">
                        <NavDropdown.Item href="/Cam1">{cam1}</NavDropdown.Item>
                        <NavDropdown.Item href="/Cam2">{cam2}</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;