import Peer from "./Peer";

export default class Sub extends Peer {

  public async connect (remoteDescription: RTCSessionDescriptionInit) {
    console.log(123);
    
    await this._peerConnection.setRemoteDescription(remoteDescription);
    console.log(321);
    
    this._localDescription = await this.createAnswer();
    console.log(1234);
    
  }

  private async createAnswer() {
    const promiseLocalDescription = new Promise(this.cecandidator);  
    const answer = await this._peerConnection.createAnswer();
    await this._peerConnection.setLocalDescription(answer);
    return (await promiseLocalDescription);
  }
}