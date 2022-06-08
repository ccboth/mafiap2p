// import Host from "./host";
// import Sub from "./sub";
import Peer from "./peer";
// import Connection from "./connection";



const iceServers: RTCIceServer[] = [
	{
		urls: "stun:stun.l.google.com:19302",
	},
  // {
  //   urls: 'turn:numb.viagenie.ca',
  //   credential: 'muazkh',
  //   username: 'webrtc@live.com'
  // },
  {
    urls: "turn:192.168.0.12:6545",
    username: "Pass",
    credential: "pass"
  }
];

const myPeer = new Peer(prompt("What is your name"),iceServers);

window.onload = main;


async function main() {

  document.getElementById("create").onclick = async () => {
    console.log("steadsaf");
    
    console.log(JSON.stringify((await myPeer.openNewRoom())));
    const answer = prompt();
    await myPeer.acceptRoom(JSON.parse(answer));
  }

  document.getElementById("connect").onclick = async () => {
    const offer = prompt("enter offer");
    const answer = (await myPeer.connectToRoom(JSON.parse(offer)));
    console.log(JSON.stringify(answer));
  }

  document.getElementById("send").onclick = () => {
    const message = prompt("Enter message");
    myPeer.sendMessageAll(message);
  }

  myPeer.addListenerDefaultMessageType("message", message => {
    console.log("__________________________________________");
    console.log(message.senderName);
    console.log(message.data);
    console.log("------------------------------------------");
  })
  
}

