import Connection from "./connection";


export default class Host extends Connection {
	private _onConnectionStateOpen = (event?:Event) => {};

	private async createOffer() {
		this._channel = this._peerConnection.createDataChannel("dasasg");
		this._channel.onmessage = (ev) => console.log(ev.data);
		const promiseLocalDescription = new Promise<RTCSessionDescription>(this.cecandidator);
		const offer = await this._peerConnection.createOffer();
		this._peerConnection.onconnectionstatechange = (ev) => {
			console.log(this._peerConnection.connectionState);
			if (this._peerConnection.connectionState == "connected") this._onConnectionStateOpen(ev);
		}
		await this._peerConnection.setLocalDescription(offer);
		return (await promiseLocalDescription);
	}

	/**
	 * Create room. 
	 */
	public async createRoom() {
		this._localDescription = await this.createOffer();
	}

	public readyStateChange() {
		return new Promise<string>(resolve => {
			const int = setInterval(() => {
				if (this._channel.readyState as string === "open") {
					clearInterval(int);
					resolve(this._channel.readyState);	
				}
			}, 50)
		})
	}

	public acceptPeer(remoteDescription: RTCSessionDescriptionInit) {
		return this._peerConnection.setRemoteDescription(remoteDescription);
	}

	public set onConnectionStateOpen(callback: (event?:Event) => void) {
		this._onConnectionStateOpen = callback;
	}
	
}
