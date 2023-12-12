import React, {useState} from 'react';
import { Container, Row } from "react-bootstrap";
import VideoPlayer from "./camScreen";
import axios from 'axios';

function Cam2(){
    const status = 0;
    const extIP = "210.104.6.82"
    const port = "8554"
    const macAdrress = "E4-5F-01-AF-07-64"
    const name = "2층"
    const url = 'http://'+extIP+':'+port+'/'+macAdrress+'/video.m3u8'
    if(status){
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

export default Cam2;