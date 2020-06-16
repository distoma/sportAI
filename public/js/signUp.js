// Your web app's Firebase configuration
var firebaseEmailAuth;
var firebaseDatabase;
var userUid;

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

async function userSignup() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passwordcheck = document.getElementById("passwordcheck").value;
    var name = document.getElementById("name").value;
    var schoolName = document.getElementById("school").value;
    var gradeName = document.getElementById("grade").value;
    var className = document.getElementById("class").value;

    if (password == passwordcheck) {
        firebaseEmailAuth.createUserWithEmailAndPassword(email, password).then(function (user) {
            userUid = firebaseEmailAuth.currentUser.uid;
            // 데이터 베이스에 가입정보 저장 함수 호출
            writeUserData(userUid, name, schoolName, gradeName, className);

        }, function (error) {
            //에러가 발생했을 때
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    } else {
        alert("비밀번호가 일치하지 않습니다.");
    }
}

async function writeUserData(userUid, name, schoolName, gradeName, className) {
    firebaseDatabase.ref('users/' + userUid).set({
        username: name,
        school: schoolName,
        grade: gradeName,
        class: className
    });
    alert("가입이 완료되었습니다");
    window.location.href = document.referrer;
}