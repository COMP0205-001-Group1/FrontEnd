import React, {useState, useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import VideoPlayer from "./camScreen";
import axios from "axios";

function Cam1() {
  const [jsonData, setJsonData] = useState(null);
  const macAdrress = 'B8-27-EB-84-9A-C2';
  const name = "1층"
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await axios.post('http://210.104.6.82:10001/camconinfo',
      {
        macAddr : {macAdrress}
      });
        console.log('서버 응답 데이터:', response.data);
        console.log("complete")
        setJsonData(response.data);
    } catch (error) {

  };
  }
  const status = jsonData && jsonData[0] ? jsonData[0].status : null;
  const extIP = jsonData && jsonData[0] ? jsonData[0].externalIP : null;
  const port = jsonData && jsonData[0] ? jsonData[0].port : null;

  const url = status ? 'http://'+extIP+':'+port+'/'+macAdrress+'/video.m3u8' : '';
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
      <VideoPlayer src={url} type="m3u8" /> 
    </div>
  );
}

export default Cam1;