let myVideoStream;
const myVideo = document.createElement('video');
const videoGrid = document.getElementById('video-grid')
myVideo.muted = true;
console.log("<%= roomId %>");
var peer = new Peer();
var socket = io();


    navigator.mediaDevices.getUserMedia({ video: false, audio: false }).then(stream => {
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
        video.muted=true
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
    // stream comming from caller 
        call.on('stream', userVideoStream => {
            console.log("remopte str");
            addVideoStream(video, userVideoStream)
        })
});

const connectToNewUser = (userId, stream) => {
    console.log("New User is connected-->", userId, stream);
    const call = peer.call(userId, stream)
    const video = document.createElement('video');
    // stream comming from person which we have call
    call.on('stream', function(remoteStream) {
        console.log("remote stream");
        // Show stream in some video/canvas element.
        addVideoStream(video, remoteStream)

      });
}