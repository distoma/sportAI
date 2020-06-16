const URL = "https://teachablemachine.withgoogle.com/models/f58LUeTcw/";
let model, webcam, ctx, labelContainer, maxPredictions;
var countNumber = 0;
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    //                 Convenience function to setup a webcam
    const size = document.getElementById("camcanvas").offsetWidth;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);
    //                 append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
    document.getElementById("startBtn").style.display = "none";
}
async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}
var status = "straight"
var count = 0
async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const {
        pose,
        posenetOutput
    } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    if (prediction[1].probability.toFixed(2) == 1.00) {
        if (status == "bent") {
            count++
            countNumber = count
        }
        status = "straight"
    } else if (prediction[0].probability.toFixed(2) == 1.00) {
        status = "bent"
    } else if (prediction[2].probability.toFixed(2) == 1.00) {
        if (status == "bent") {
            status = "bent"
        } else {
            status = "error"
        }
    }
    var mybar01 = document.getElementById("myBar01");
    var txtcountnum = document.getElementById("countNum");
    txtcountnum.innerHTML = count + "회";
    mybar01.style.width = count % 10 * 10 + "%";
    //                for (let i = 0; i < maxPredictions; i++) {
    //                    const classPrediction =
    //                        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //                    labelContainer.childNodes[i].innerHTML = classPrediction;
    //                }
    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

async function saveSportData() {
    var firebaseEmailAuth; //파이어베이스 email 인증 모듈 전역변수
    var firebaseDatabase; //파이어베이스 db 모듈 전역변수
    var userId; //가입한 유저의 정보. object 타입

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
    firebaseEmailAuth = firebase.auth();
    firebaseDatabase = firebase.database();

    alert(firebaseEmailAuth.currentUser.Uid);

    var loginCheck = document.getElementById("loginmenu").textContent;

    var sportName = "팔굽혀펴기";

    if (loginCheck == "로그아웃") {

        userId = firebaseEmailAuth.currentUser.Uid

    } else {
        alert("로그인을 하세요!")
    }
    
}