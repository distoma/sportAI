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

firebaseEmailAuth = firebase.auth();

firebaseEmailAuth.signOut().then(function () {
    alert("로그아웃 되었습니다")
    //메인 페이지로 이동시키고 세션 저장시키기
    window.location.href = document.referrer;
    // history.back();

}).catch(function (error) {
    if (error) {
        alert("로그인 실패");
    }
});