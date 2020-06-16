var firebaseEmailAuth; //파이어베이스 email 인증 모듈 전역변수
var firebaseDatabase; //파이어베이스 db 모듈 전역변수
// var userInfo; //가입한 유저의 정보. object 타입

var firebaseConfig = {
    apiKey: "AIzaSyC9Ra7vCr7SKwYkYi6J96Z6jrdj4XVC_kc",
    authDomain: "sportsaiapp.firebaseapp.com",
    databaseURL: "https://sportsaiapp.firebaseio.com",
    projectId: "sportsaiapp",
    storageBucket: "sportsaiapp.appspot.com",
    messagingSenderId: "659154056759",
    appId: "1:659154056759:web:fee16afc9a6795762471b2",
    measurementId: "G-5KNZ1H11EV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebaseEmailAuth = firebase.auth();
firebaseDatabase = firebase.database();


async function loginBtn() {
    const email = document.getElementById("uid").value;
    const password = document.getElementById("upw").value;

    alert("로그인 버튼 눌렸음" + email + ":" + password);

    //파이어베이스 이메일 로그인 함수
    const promise = firebaseEmailAuth.signInWithEmailAndPassword(email, password);
    promise.then(function (firebaseUser) {
        alert("로그인 성공");
        alert(document.referrer);
        window.location.href = document.referrer;
        // window.location.href = "/index.html";
        // window.history.back();
    });

    firebaseEmailAuth.onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            // User is signed in.
            alert("로그인 유저" + firebaseUser.uid);
        } else {
            // No user is signed in.
            alert("로그인 중");
        }
    });
    promise.catch(e => console.log(e.message));
}
