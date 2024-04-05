import logo from './logo.svg';
import './App.css';
import Header from "./components/layout/Header";
import main from './public/videos/main.mp4';
import {RecoilRoot} from "recoil";
import styled from "styled-components";

function App() {
  return (
      <RecoilRoot>
    <Wapper>
      <Header/>
      <Video autoPlay loop muted>
        <source src = {main} type='video/mp4'/>
      </Video>
    </Wapper>
      </RecoilRoot>
  );
}

export default App;


const Wapper = styled.div`
    display: flex;
    position: relative;
    padding: 0;
    margin: 0;
    width: 100%;
`
const Video = styled.video`
    //display: flex;
    width: 100%;
    height: 100vh;
    object-fit: fill;
    min-height: 620px;
    
  //max-width: 1160px;
`


