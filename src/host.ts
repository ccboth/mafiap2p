
class Host {
	private _peerConnection: RTCPeerConnection;
	/**
	 *
	 * @param roomId unque room identifier
	 */
	constructor(roomId: string) {
		this._peerConnection = new RTCPeerConnection({ iceServers: iceServers });
	}

	public async init() {}
}
