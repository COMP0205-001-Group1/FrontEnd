import React, {useState, useEffect} from 'react';
import { Container, Row } from "react-bootstrap";
import VideoPlayer from "./camScreen";
import axios from 'axios';
import { json } from "react-router-dom";

function Cam2(){
    const extIP = "210.104.6.82"
    const port = "8554"
    const macAdrress = "E4-5F-01-AF-07-64"
    const name = "2층"
    const url1 = 'http://'+extIP+':'+port+'/'+macAdrress+'/video.m3u8'
    const [jsonData, setJsonData] = useState(null);
    const [status, setStatus] = useState(1)
    const url = "http://210.104.6.82:10001/camlist"
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
    useEffect(()=>{
      if(jsonData){
        const statusData= jsonData[0]?.status || '';
        console.log(statusData)
        console.log("jsonData")
        setStatus(statusData)
        console.log(status)
      }
    }, [])
    if(!status){
        return(
        <div>
            카메라가 꺼져있습니다.
        </div>
        );
    }
    return (
        <div>
        <h2>CAM {name}</h2>
        <VideoPlayer src={url1} type="m3u8" />
        </div>
    );
}

export default Cam2;