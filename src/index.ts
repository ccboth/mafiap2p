import Host from "./host";
import Sub from "./sub";
import Peer from "./Peer";

interface Room {
  offer: RTCSessionDescriptionInit;
};


const iceServers = [
	{
		urls: "stun:stun.l.google.com:19302",
	},
  {
    urls: 'turn:numb.viagenie.ca',
    credential: 'muazkh',
    username: 'webrtc@live.com'
  },
];
let peer: Peer;

/**
 * @description Выполняет настройку хоста
 */
async function host() {
  const host = new Host(iceServers);
  await host.createRoom();
  console.log(JSON.stringify(host.localDescription));
  
  peer = host;
  
  document.getElementById("newPeer").onclick = () => {
    const aceptedSDP = prompt("Enter accepted sdp");
    host.acceptPeer(JSON.parse(aceptedSDP));
  }
}

/**
 * @description Выполняет настройку пира
 */
async function sub() {
  const remoteDescr = prompt("Enter offer(sdp):");
  const sub = new Sub(iceServers);
  await sub.connect(JSON.parse(remoteDescr));
  console.log(JSON.stringify(sub.localDescription));
  peer = sub;
}

async function sendMesssage() {
  const text = prompt("Enter you message:", "Hello!!");
  peer.sendMessage(text);
}

window.onload = main;

async function main() {

  document.getElementById("sendMessage").onclick = sendMesssage;
  const isHost = confirm("You host?");
  if (isHost) await host();
  else await sub()
}

