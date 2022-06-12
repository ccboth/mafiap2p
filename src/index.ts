// import Host from "./host";
// import Sub from "./sub";
import { AnswerList } from "telebot";
import Bot from "./botapi";
import Peer from "./peer";
// import Connection from "./connection";

function sleep(miliseconds: number) {
	return new Promise<void>(resolve => {
		setTimeout(() => resolve(), miliseconds);
	})
}

interface Offer {
	roomName: string;
	offer: RTCSessionDescriptionInit;
}

interface Answer {
	roomName: string;
	answer: RTCSessionDescriptionInit;
}

interface PinMessageValue {
	init: boolean;
	answers: Answer[];
	offers: Offer[];
}

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
		credential: "pass",
	},
];

const myPeer = new Peer(prompt("What is your name"), iceServers);
window.onload = main;

function getMessage(text:string, sender:string="") {
	const messageText = document.createElement("div");
		const messageSender = document.createElement("div");
		const message = document.createElement("div");

		messageText.className = "messageText"; messageText.innerHTML = text;
		messageSender.className = "messageSender"; messageSender.innerHTML = sender;
		message.className = "message";
		message.appendChild(messageSender);
		message.appendChild(messageText);
		document.querySelector("div.messageList").appendChild(message);
}

async function host() {
	console.log(JSON.stringify(await myPeer.openNewRoom()));
	const asnwer = prompt("Answer:?");
	myPeer.acceptRoom(JSON.parse(asnwer));

}

async function sub() {
	const answer = await myPeer.connectToRoom(JSON.parse(prompt("Offer:?")), () => console.log("ondata"));

	console.log(JSON.stringify(answer));
	
}

async function main() {
	// const isHost = confirm("You host?");
	// if (isHost) host();
	// else sub();

	document.getElementById("sendMessage").onclick = () => {
		const messageText = (document.getElementById("textMyMessage") as HTMLInputElement).value;
		(document.getElementById("textMyMessage") as HTMLInputElement).value = "";
		myPeer.sendMessageAll(messageText);	
		getMessage(messageText, myPeer.name);
	}

	myPeer.addListenerDefaultMessageType("message", evMessage => {
		getMessage(evMessage.data as string, evMessage.senderName);
		console.log(evMessage);
	})

	// return;
	const listenerBotToken = document.getElementById("BotToken").innerHTML;
	const chatId = parseInt(document.getElementById("chatId").innerHTML);
	const bot = new Bot(listenerBotToken);

	document.getElementById("create").onclick = async () => {
		const roomName = (document.getElementById("roomName") as HTMLInputElement).value;
		let pinMessage = await bot.getPinnedMessage(chatId);
		let pinMessageValue = JSON.parse(pinMessage.text) as PinMessageValue;

		// Если не выполнена инициализация сообщения
		if (!pinMessageValue.init) {
			// Ее нужно выполнить
			
			pinMessageValue.init = true;
			pinMessageValue.answers = [];
			pinMessageValue.offers = [];
		}
		else {
			// Если иницализацию уже кто то проделал, мы проверяем занято ли имя комнаты
			for (const offer of pinMessageValue.offers) {
				if (offer.roomName === roomName) {
					alert("Комната с таким именем уже существует");
					return;
				}
			}
		}

		const localDescription = await myPeer.openNewRoom();
		
		pinMessageValue.offers.push({
			offer: localDescription,
			roomName: roomName
		});
		await bot.editMessageText(chatId, pinMessage.message_id, JSON.stringify(pinMessageValue));
		(document.querySelector("div.popupLogin") as HTMLElement).style.display = "none";
		
		while(true) {
			
			await sleep(1000);
			
			const pinMessageValueUpd = JSON.parse((await bot.getPinnedMessage(chatId)).text) as PinMessageValue;
			
			// Зачем че то делать если все одинаково
			if (JSON.stringify(pinMessageValue) === JSON.stringify(pinMessageValueUpd)) continue;
			
			// А тут можно че то поделать
			pinMessageValue = pinMessageValueUpd;
			console.log(pinMessageValueUpd);
			
			// Ищем нашего любителя
			for (const answer of pinMessageValue.answers) {
				if (answer.roomName == roomName) {
					pinMessageValue.answers.splice(pinMessageValue.answers.indexOf(answer));

					console.log("accept ROOM");
					await myPeer.acceptRoom(answer.answer);
					await myPeer.releasedConnect;
					const localDescription = await myPeer.openNewRoom();

					pinMessageValue.offers.push({
						roomName: roomName,
						offer: localDescription
					});

					await bot.editMessageText(chatId, pinMessage.message_id, JSON.stringify(pinMessageValue));
				}
			}
		}
	};


	document.getElementById("connect").onclick = async () => {
		const roomName = (document.getElementById("roomName") as HTMLInputElement).value;
		const pinMessage = await bot.getPinnedMessage(chatId);
		const pinMessageValue = JSON.parse(pinMessage.text) as PinMessageValue;
		let roomOffer: Offer = null;

		// Ну а вдруг...
		if (!pinMessageValue.init) {
			alert("Комнаты с таким именем не существует");
		}

		// Проверка наличия комнаты
		for (const offer of pinMessageValue.offers) {
			if (offer.roomName == roomName) {
				roomOffer = offer;
				pinMessageValue.offers.splice(pinMessageValue.offers.indexOf(offer));
				bot.editMessageText(chatId, pinMessage.message_id, JSON.stringify(pinMessageValue));
			}
		}

		if (!roomOffer) {
			alert("Комнаты с таким именем не существует");
			return;
		}

		const localDescripion = await myPeer.connectToRoom(roomOffer.offer, () => (document.querySelector("div.popupLogin") as HTMLElement).style.display = "none");
		pinMessageValue.answers.push({
			roomName: roomName, 
			answer: localDescripion
		});
		await bot.editMessageText(chatId, pinMessage.message_id, JSON.stringify(pinMessageValue));


	}
	
}
