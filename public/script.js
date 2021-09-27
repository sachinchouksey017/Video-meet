let myVideoStream;
const myVideo=document.createElement('video');
const videoGrid=document.getElementById('video-grid')
myVideo.muted=true;
console.log("<%= roomId %>");
if (navigator) {
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
        console.log(stream);
        myVideoStream=stream;
        addVideoStream(myVideo,myVideoStream)
    }).catch(err=>{
        
        console.log("not allowed by user")
    })
}
const addVideoStream=(video,stream)=>{
video.srcObject=stream;
video.addEventListener('loadedmetadata',()=>{
    video.play()
videoGrid.append(video)

})
}