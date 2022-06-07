

export default class Peer {
  protected _peerConnection: RTCPeerConnection;
	protected _localDescription: RTCSessionDescription;
	protected _channel: RTCDataChannel;

	constructor(iceServers: RTCIceServer[]) {
		this._peerConnection = new RTCPeerConnection({ iceServers: iceServers });

    this._peerConnection.ondatachannel = (event) => {
      this._channel = event.channel;
      this._channel.onmessage = (event) => {
        console.log("MESSAGE: " + event.data);
      };
    };
    
    this._peerConnection.oniceconnectionstatechange = (ice) => {
      if (this._peerConnection.iceConnectionState == "failed") {
        throw "Ice connection failed. See devtools";
      }
      else if (this._peerConnection.iceConnectionState == "connected") console.log("ice connect");
      
    };

	}

  protected cecandidator = (resolve: (value: RTCSessionDescription | PromiseLike<RTCSessionDescription>) => void, reject: (reason?: any) => void) => {
		this._peerConnection.onicecandidate = (event) => {
			if (!event.candidate) {
				resolve(this._peerConnection.localDescription)
			};
		}
	}

  public sendMessage(message: string) {
    this._channel.send(message);
  }

  public set onMessage(v : (this: RTCDataChannel, ev: MessageEvent<any>) => void) {
    this._channel.onmessage = v;
  }

  public get localDescription() {
		return this._localDescription;
	}
  
}