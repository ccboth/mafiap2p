import Connection from "./connection";


export default class Host extends Connection {

	private async createOffer() {
		this._channel = this._peerConnection.createDataChannel("dasasg");
		this._channel.onmessage = (ev) => console.log(ev.data);
		const promiseLocalDescription = new Promise<RTCSessionDescription>(this.cecandidator);
		const offer = await this._peerConnection.createOffer();
		await this._peerConnection.setLocalDescription(offer);
		return (await promiseLocalDescription);
	}

	/**
	 * Create room. 
	 */
	 public async createRoom() {
		this._localDescription = await this.createOffer();
	}

	public acceptPeer(remoteDescription: RTCSessionDescriptionInit) {
		return this._peerConnection.setRemoteDescription(remoteDescription);
	}
	
}
