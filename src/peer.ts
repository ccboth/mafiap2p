import ts = require("typescript");
import Connection from "./connection";
import Host from "./host";
import Sub from "./sub";

type DefaultMessageTypes = "newConnection" | "introduceOffer" | "introduceAnswer" | "disconnect" | "message" | "validatePeerName" | "acceptPeerName";

interface NewConnection {
  newConnectName: string;
  knowledgeable:  string[];
}

interface Message {
  senderName: string;
	type: string;
	data: string | NewConnection;
  newComer?:string;
  lead?:string;
}

export default class Peer {
//private _peerName
//private iceServers
  private _connections: Connection[];
  private _messageListeners: ts.ESMap<string, (message: Message)=> void>;
  private _handlingTypes: string[];
  private _lastRoom: Host;
  private _connectStatus: boolean;

  constructor (private _peerName: string, private _iceServers: RTCIceServer[]) {
    this._lastRoom = null;
    this._connections = [];
    this._messageListeners = new Map<string, (message: Message)=> void>();
    this._handlingTypes = [];
    console.log(this._handlingTypes);
    this._connectStatus = false;
  }

  private _mainMessageHandler = (messageEvent: MessageEvent<string>) => {
    const message = JSON.parse(messageEvent.data) as Message;
    const type = message.type;

    if (type === "newConnection") this._newConnectionHandler(message);
    else if (type === "disconnect") this._disconnectHandler(message);
    else if (type === "validatePeerName") this.acquaintanceAccept(message);
    else if (type === "acceptPeerName") this.acceptNewConnectionName(message);
    else if (type === "introduceOffer") this._introduceOffer(message);
    else if (type === "introduceAnswer") this._introduceAnswer(message);

    if (!(~this._handlingTypes.indexOf(type))) return;
    this._messageListeners.get(type)(message);
  }

  private _newConnectionHandler(message: Message) {
    const intro = (message.data as NewConnection);
    const newComerName = intro.newConnectName;
    const introducing = message.senderName;

    // Проверяем, знакомы ли мы
    let isIntroduct = false;
    for (let i = 0; i < this._connections.length; i ++) {
      if (this._connections[i].name === newComerName) isIntroduct = true;
    }
    if (isIntroduct) {
      // Уже знакомы. Надо познакомить с теми, кто не знаком. Но только первого
      for (let i = 0; i < this._connections.length; i++) {
        if (!(~intro.knowledgeable.indexOf(this._connections[i].name))) {
          intro.knowledgeable.push(this._peerName);
          this.typeSendMessage(this._connections[i].name, {
            senderName: this._peerName,
            type: "newConnection",
            data: intro,
          });
          break;
        }
      }
    }
    else {
      // Не знакомы. Надо бы познакомится
      this._lastRoom = new Host(this._iceServers);
      this._lastRoom.createRoom().then(() => {
        this.typeSendMessage(introducing, {
          senderName: this._peerName,
          type: "introduceOffer",
          data: JSON.stringify(this._lastRoom.localDescription),
          newComer: newComerName
        });
      });
      
    }
  }

  private _introduceOffer(message: Message) {
    if (message.newComer)
      // Я знакомлю
      this.typeSendMessage(message.newComer, {
        senderName: this._peerName,
        data: message.data,
        type: "introduceOffer",
        lead: message.senderName
      });
    else { 
      // Я тот кого привели
      this.connectToRoom(JSON.parse(message.data as string)).then(localDescription => {
        this.typeSendMessage(message.senderName, {
          senderName: this._peerName,
          type: "introduceAnswer",
          data: JSON.stringify(localDescription),
          lead: message.lead
        });
      });
    }
  }

  private _introduceAnswer(message: Message) {
    if (message.lead) {
      // я знакомлю
      this.typeSendMessage(message.lead, {
        senderName: this._peerName,
        type: "introduceAnswer",
        data: message.data,
        
      })

    }
    else {
      // Я одбряю подключение
      this.acceptRoom(JSON.parse(message.data as string));
    }
  }

  private _disconnectHandler(message: Message) {}

  private acquaintanceAccept(message: Message) {
    this._connections[0].name = message.senderName;
    this.sendMessage(message.senderName, "accept", "acceptPeerName");
  }
  private acquaintance(connect: Connection) {
    const message:Message = {
      senderName: this._peerName,
      type:       "validatePeerName",
      data:       "accept"
    }
    connect.sendMessage(JSON.stringify(message));
  }

  private acceptNewConnectionName = (message: Message) => {
    console.log(this._lastRoom);
    if (this._connections.length){
      const firstConnection = this._connections[0].name;
      this.typeSendMessage(firstConnection, {
        senderName: this._peerName,
        data: {
          knowledgeable: [this._peerName],
          newConnectName: message.senderName
        },
        type: "newConnection"
      })
    }
    this._lastRoom.name = message.senderName;
    this._connections.push(this._lastRoom);
    this._lastRoom = null;
  }

  /**
   * New connection. Connect to existing peer
   */
  public async connectToRoom (remoteDescription: RTCSessionDescriptionInit) {
    const connection = new Sub(this._iceServers);
    await connection.connect(remoteDescription);
    connection.onDataChannel = () =>{connection.onMessage = this._mainMessageHandler}
    this._connections.push(connection);
    return connection.localDescription;
  }

  /**
   * Create port to new connection
   */
  public async openNewRoom() {
    this._lastRoom = new Host(this._iceServers);
    await this._lastRoom.createRoom();
    return this._lastRoom.localDescription;
  }

  /**
   * Accept remote peer and init him 
   * @param remoteDescription Remote description
   */
  public async acceptRoom(remoteDescription: RTCSessionDescriptionInit) {
    if (!this._lastRoom) throw "Connect is no created";
    await this._lastRoom.acceptPeer(remoteDescription);
    this._lastRoom.onMessage = this._mainMessageHandler;
    setTimeout(() => this.acquaintance(this._lastRoom), 1000);
  };

  /**
   * ABORT room
   */
  public abortLastRoom() {
    if (!this._lastRoom) return;
    this._lastRoom.disconnect();
    this._lastRoom = null;
  }

  private typeSendMessage(target: string, message: Message) {
    for (let i = 0; i < this._connections.length; i++) {
      const connect = this._connections[i];
      if (!(connect.name == target)) continue;
      connect.sendMessage(JSON.stringify(message));
    }
  }

  public sendMessage(target: string, text: string, type: string) {
    for (let i = 0; i < this._connections.length; i++) {
      const connect = this._connections[i];
      if (!(connect.name == target)) continue;
      const message: Message = {
        senderName: this._peerName,
        type: type,
        data: text
      }
      connect.sendMessage(JSON.stringify(message));
    }
  }
  public sendMessageAll(text: string, type: string = "message") {
    const message: Message = {
      senderName: this._peerName,
      type: type,
      data: text
    }
    const data = JSON.stringify(message);
    this._connections.forEach(con => {
      con.sendMessage(data);
    })
    
  }

  public addListenerMessageType(type: string, listener: (message: Message)=> void) {
    this._messageListeners.set(type, listener);
    this._handlingTypes.push(type);
  }

  public addListenerDefaultMessageType(type: DefaultMessageTypes, listener: (message: Message)=> void) {
    this.addListenerMessageType(type, listener);
  }
 
  public get isConnect() : boolean {
    return this._connectStatus;
  }
  

}