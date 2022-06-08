
export default class Connection {
  protected _peerConnection: RTCPeerConnection;
	protected _localDescription: RTCSessionDescription;
	protected _channel: RTCDataChannel;
  private   _name: string;
  private   _onDataChannel = function(event:RTCDataChannelEvent) {}

	constructor(iceServers: RTCIceServer[]) {
		this._peerConnection = new RTCPeerConnection({ iceServers: iceServers });

    this._peerConnection.ondatachannel = (event) => {      
      this._channel = event.channel;
      this._onDataChannel(event);
    };
    
    this._peerConnection.oniceconnectionstatechange = (ice) => {
      if (this._peerConnection.iceConnectionState == "failed") {
        throw "Ice connection failed. See devtools";
      }
      else if (this._peerConnection.iceConnectionState == "connected") console.log("ice connect");
      
    };

    this._name = "";

	}

  protected cecandidator = (resolve: (value: RTCSessionDescription | PromiseLike<RTCSessionDescription>) => void, reject: (reason?: any) => void) => {
		this._peerConnection.onicecandidate = (event) => {
			if (!event.candidate) {
				resolve(this._peerConnection.localDescription)
			};
		}

	}

  public async disconnect() {
    this._peerConnection.close();
  }

  public sendMessage(message: string) {
    this._channel.send(message);
  }

  public set onMessage(v : (ev: MessageEvent<any>) => void) {
    if (this._channel)
      this._channel.onmessage = v;
  }

  public set name(v: string) {
    if (v) this._name = v; 
  }

  public set onDataChannel(v: (event:RTCDataChannelEvent) => void) {
    this._onDataChannel = v;
  }

  public get name() {
    return this._name;
  }

  public get localDescription() {
		return this._localDescription;
	}
  
}