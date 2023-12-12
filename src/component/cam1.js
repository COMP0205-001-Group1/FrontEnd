import React, {useState, useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import VideoPlayer from "./camScreen";
import axios from "axios";
import { json } from "react-router-dom";

function Cam1() {
  /*const [jsonData, setJsonData] = useState(null);
  const [status, setStatus] = useEffect(0);
  const [extIP, setExtIP] = useEffect("210.104.6.82");
  const [port, setPort] = useEffect("8554");
  const macAdrress = "B8-27-EB-84-9A-C2";
  const name = "1층"
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await axios.post('http://210.104.6.82:10001/camconinfo',
      {
        "macAddr" : macAdrress
      });
        console.log('서버 응답 데이터:', response.data);
        console.log("complete")
        if (response.data.length > 0) {
          setJsonData(response.data);
        }
    } catch (error) {
        console.log(0)
  };
  }
  console.log({status})

  const url = status ? 'http://'+extIP+':'+port+'/'+macAdrress+'/video.m3u8' : '';*/
  const [jsonData, setJsonData] = useState(null);
  const [status, setStatus] = useState(1)
  const name = "1층"
  const url = "http://210.104.6.82:10001/camlist"
  const url1 = "http://210.104.6.82:8554/B8-27-EB-84-9A-C2/video.m3u8"
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
    //const statusData = jsonData[0]?.status || '';
    //console.log(statusData)
    //const statusData = 1;
    //const statusData = 1;
  if(status === 0){
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

export default Cam1;