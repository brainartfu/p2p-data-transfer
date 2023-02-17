import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";

import Navigation from './Components/Navigation/Navigation'
import Footer from './Components/Footer/Footer'

import random from 'random-string-alphanumeric-generator';


function App() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [caller, setCaller] = useState("");
  const [receiverID, setReceiverID] = useState('')
  const [message, setMessage] = useState('');
  const [partners, setPartners] = useState([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const socket = useRef();
  const myPeer=useRef();
  const nextPeer = useRef();
  let myId = ""
  let receiveCount = 0;
  let receiveData = "";
  let landingHTML=<>
    <main>
      <div style={{marginTop: 20}}>
        <div className="o-wrapper-l">
            <div className="hero flex flex-column">

                <div>
                    <div className="actionText">Username: {yourID}</div>
                </div>
                <div className="callBox flex">
                    <input type="text" placeholder="Friend ID" value={receiverID} onChange={e => setReceiverID(e.target.value)} className="form-input"/>
                    <button onClick={() => handlePeer(receiverID.toLowerCase().trim())} className="primaryButton">Search</button>
                </div>
                 
            </div>
        </div>
        <div id="send-data" style={{padding: 10}}>
        </div>    
        <div id="receive-data" style={{padding: 10}}>
        </div>      
      </div>
    </main> 
  </>

  useEffect(() => {
    socket.current = io.connect("/");

    socket.current.on("yourID", (id) => {
      console.log(id)
      myId = id;
      setYourID(id);
    })
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socket.current.on("hey", (res) => {
      setCaller(res.from);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        config: {
  
          iceServers: [
              // {
              //     urls: "stun:numb.viagenie.ca",
              //     username: "sultan1640@gmail.com",
              //     credential: "98376683"
              // },
              // {
              //     urls: "turn:numb.viagenie.ca",
              //     username: "sultan1640@gmail.com",
              //     credential: "98376683"
              // }
              {url:'stun:stun01.sipphone.com'},
              {url:'stun:stun.ekiga.net'},
              {url:'stun:stun.fwdnet.net'},
              {url:'stun:stun.ideasip.com'},
              {url:'stun:stun.iptel.org'},
              {url:'stun:stun.rixtelecom.se'},
              {url:'stun:stun.schlund.de'},
              {url:'stun:stun.l.google.com:19302'},
              {url:'stun:stun1.l.google.com:19302'},
              {url:'stun:stun2.l.google.com:19302'},
              {url:'stun:stun3.l.google.com:19302'},
              {url:'stun:stun4.l.google.com:19302'},
              {url:'stun:stunserver.org'},
              {url:'stun:stun.softjoys.com'},
              {url:'stun:stun.voiparound.com'},
              {url:'stun:stun.voipbuster.com'},
              {url:'stun:stun.voipstunt.com'},
              {url:'stun:stun.voxgratia.org'},
              {url:'stun:stun.xten.com'},
              {
              url: 'turn:numb.viagenie.ca',
              credential: 'muazkh',
              username: 'webrtc@live.com'
              },
              {
              url: 'turn:192.158.29.39:3478?transport=udp',
              credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
              username: '28224511:1379330808'
              },
              {
              url: 'turn:192.158.29.39:3478?transport=tcp',
              credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
              username: '28224511:1379330808'
              }
          ]
        },
      });
      myPeer.current = peer
      
      peer.on("signal", data => {
        console.log('signal', myId)
        socket.current.emit("acceptCall", { signal: data, to: res.from, from: myId })
      })

      peer.on("data", data => {
        var string = new TextDecoder().decode(data);
        console.log(res.from + ":" + string);
      });

      peer.on('error', (err)=>{
        // endCall()
        console.log(err)
      })
      peer.on('connect', () => {
        console.log('CONNECT')
        const dataString = random.randomAlphanumeric(50, 'lowercase'); // Math.floor(Math.random() * 5)
        document.getElementById('send-data').innerHTML += "<p>Data to send "+res.from+": "+dataString+"</p>"
        peer.send(dataString)
      })      
      console.log(peer);
      peer.signal(res.signal);

      socket.current.on('close', (error)=>{
        console.log(error)
        // window.location.reload()
      })      
    })
  }, []);

  useEffect(()=>{
    for (var i = 0; i < partners.length; i++) {
      callPeer(partners[i]);
    }
  }, [partners]);
  function handlePeer(ids) {
    const idArr = ids.split(' ');
    console.log(idArr)
    setPartners(idArr);
    setTargetIndex(targetIndex + 1);
    document.getElementById('receive-data').innerHTML = '';
  }
  function callPeer(id) {
    console.log('calling '+ id + "...")
    if(id!=='' && users[id] && id!==yourID){
      const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {
  
          iceServers: [
              // {
              //     urls: "stun:numb.viagenie.ca",
              //     username: "sultan1640@gmail.com",
              //     credential: "98376683"
              // },
              // {
              //     urls: "turn:numb.viagenie.ca",
              //     username: "sultan1640@gmail.com",
              //     credential: "98376683"
              // }
              {url:'stun:stun01.sipphone.com'},
              {url:'stun:stun.ekiga.net'},
              {url:'stun:stun.fwdnet.net'},
              {url:'stun:stun.ideasip.com'},
              {url:'stun:stun.iptel.org'},
              {url:'stun:stun.rixtelecom.se'},
              {url:'stun:stun.schlund.de'},
              {url:'stun:stun.l.google.com:19302'},
              {url:'stun:stun1.l.google.com:19302'},
              {url:'stun:stun2.l.google.com:19302'},
              {url:'stun:stun3.l.google.com:19302'},
              {url:'stun:stun4.l.google.com:19302'},
              {url:'stun:stunserver.org'},
              {url:'stun:stun.softjoys.com'},
              {url:'stun:stun.voiparound.com'},
              {url:'stun:stun.voipbuster.com'},
              {url:'stun:stun.voipstunt.com'},
              {url:'stun:stun.voxgratia.org'},
              {url:'stun:stun.xten.com'},
              {
              url: 'turn:numb.viagenie.ca',
              credential: 'muazkh',
              username: 'webrtc@live.com'
              },
              {
              url: 'turn:192.158.29.39:3478?transport=udp',
              credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
              username: '28224511:1379330808'
              },
              {
              url: 'turn:192.158.29.39:3478?transport=tcp',
              credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
              username: '28224511:1379330808'
              }
          ]
        },
      });

      peer.on("signal", data => {
        socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
      })
  
      peer.on("data", data => {
        var string = new TextDecoder().decode(data);
        document.getElementById('receive-data').innerHTML += "<div><p>Data from "+id+": "+string+"</p></div>"
        receiveData += string;
        receiveCount += 1;
        console.log(receiveCount , partners.length)
        if (receiveCount == partners.length) {
          // window.alert('All data received from '+partners.length+'devices.');
          document.getElementById('receive-data').innerHTML += "<div><textarea rows='20' style='width: 80%;'> "+receiveData+"</textarea></div>"
        }        
      });

      peer.on('error', (err)=>{
        console.log(err)
      })
      socket.current.on("callAccepted", data => {
        if (data.from === id) {
          peer.signal(data.signal);
        }
      })
      socket.current.on('close', ()=>{
        // window.location.reload()
      })

      socket.current.on('rejected', ()=>{
        // window.location.reload()
      })
    } else {
      return
    }
  }
  function endCall(){
    myPeer.current.destroy()
    socket.current.emit('close',{to:caller})
    window.location.reload()
  }
  function sendMessage(e) {
    myPeer.current.send(message);
  }
  function handleMessage(e) {
    console.log(e.target.value);
    setMessage(e.target.value);
  }
  return (
    <>
      <div>
        {landingHTML}

      </div>
    </>
  )
}

export default App;