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
const rtcConnect = new RTCPeerConnection({ iceServers: iceServers });
let chanal: RTCDataChannel;

rtcConnect.ondatachannel = (event) => {
	console.log("ondatachanall");
	chanal = event.channel;
	chanal.onmessage = (event) => {
		console.log("MESSAGE: " + event.data);
	};
};

rtcConnect.onconnectionstatechange = (event) => {
	console.log("onconnectionstatechange" + rtcConnect.connectionState);
};

rtcConnect.oniceconnectionstatechange = (ice) => {
	console.log("ICECONNECTION ", rtcConnect.iceConnectionState);
};

function cecandidator(resolve: (value: RTCSessionDescription | PromiseLike<RTCSessionDescription>) => void, reject: (reason?: any) => void) {
  rtcConnect.onicecandidate = (event) => {
    if (!event.candidate) {
      resolve(rtcConnect.localDescription)
    };
  }
}

/**
 * @description Создает оффер и канал данных
 * @param {string} label Идентификатор канала данных
 * @returns {RTCSessionDescription} local descripton
 */
async function createOffer(label: string = "dasasg") {
  chanal = rtcConnect.createDataChannel(label);
  chanal.onmessage = (ev) => console.log(ev.data);
  const promiseLocalDescription = new Promise<RTCSessionDescription>(cecandidator);
  const offer = await rtcConnect.createOffer();
  await rtcConnect.setLocalDescription(offer);
  return (await promiseLocalDescription);
}

async function acceptRemoteOffer(offer: RTCSessionDescriptionInit) {
  await rtcConnect.setRemoteDescription(offer);  
}

async function createAnswer() {
  const promiseLocalDescription = new Promise(cecandidator);  
  const answer = await rtcConnect.createAnswer();
  await rtcConnect.setLocalDescription(answer);
  return (await promiseLocalDescription);
}

async function acceptAnswer(asnwer: RTCSessionDescriptionInit) {
  await rtcConnect.setRemoteDescription(asnwer);
}

/**
 * @description Выполняет настройку хоста
 */
async function host() {
  const localDescripton = await createOffer();
  console.log(JSON.stringify(localDescripton));
  const acceptedAnswer = prompt("Enter peer connect");
  await acceptAnswer(JSON.parse(acceptedAnswer));
}

/**
 * @description Выполняет настройку пира
 */
async function sub() {
  const offer = prompt("Enter offer(fully):");
  await acceptRemoteOffer(JSON.parse(offer));
  const localDescripton = await createAnswer();
  console.log(JSON.stringify(localDescripton));

}

async function sendMesssage() {
  const text = prompt("Enter you message:", "Hello!!");
  chanal.send(text);
}

window.onload = main;

async function main() {

  document.getElementById("sendMessage").onclick = sendMesssage;
  console.log(rtcConnect.getConfiguration().iceServers);
  const isHost = confirm("You host?");
  if (isHost) await host();
  else await sub()
}

