import Connection from "./connection";

export default class Sub extends Connection {

  public async connect (remoteDescription: RTCSessionDescriptionInit) {   
    await this._peerConnection.setRemoteDescription(remoteDescription);  
    this._localDescription = await this.createAnswer();
  }

  private async createAnswer() {
    const promiseLocalDescription = new Promise(this.cecandidator);  
    const answer = await this._peerConnection.createAnswer();
    await this._peerConnection.setLocalDescription(answer);
    return (await promiseLocalDescription);
  }
}