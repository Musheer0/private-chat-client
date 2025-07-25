class usePeer{
    peer:RTCPeerConnection
    constructor(){
        this.peer = new RTCPeerConnection({
            iceServers:[
                {
                    urls:[
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
                }
            ]
        })
    };
    async getOffer(){
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);
        return offer;
    }
   async getAnswer(offer:RTCSessionDescriptionInit){
    await this.peer.setRemoteDescription(offer);
    const ans = await this.peer.createAnswer();
    await this.peer.setLocalDescription(new RTCSessionDescription(ans));
    return ans;
   };
   async setLocalDes(ans:RTCSessionDescriptionInit){
    this.peer.setRemoteDescription(new RTCSessionDescription(ans));
   };

}
export default new usePeer()