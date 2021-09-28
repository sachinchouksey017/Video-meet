let myVideoStream;
const myVideo = document.createElement('video');
const videoGrid = document.getElementById('video-grid')
myVideo.muted = true;
console.log("<%= roomId %>");
var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3000'
});
var socket = io();


    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        console.log(stream);
        myVideoStream = stream;
        addVideoStream(myVideo, myVideoStream)

       

        socket.on('user-connected', function (userId) {
            console.log("user is connected and recieved ", userId);
            connectToNewUser(userId, stream)
        });
        

    }).catch(err => {

        console.log("not allowed by user")
    })

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
        videoGrid.append(video)

    })
}
peer.on('open', (id) => {
    socket.emit('join-room', ROOM_ID, id);

})

peer.on('call', call=> {
    console.log("call rec",call);
    call.answer(myVideoStream); // Answer the call with an A/V stream.
    const video = document.createElement('video');
    video.muted=true
        call.on('stream', userVideoStream => {
            console.log("remopte str");
            addVideoStream(video, userVideoStream)
        })
});

const connectToNewUser = (userId, stream) => {
    console.log("New User is connected-->", userId, stream);
    const call = peer.call(userId, stream)
    const video = document.createElement('video');
    call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        addVideoStream(video, remoteStream)

      });
}