const firebaseConfig = {
    apiKey: "AIzaSyAFigWUIw7McYBTMwCAwmLbMw4f8U-XfdE",
    authDomain: "kwitter2-ba86b.firebaseapp.com",
    databaseURL: "https://kwitter2-ba86b-default-rtdb.firebaseio.com",
    projectId: "kwitter2-ba86b",
    storageBucket: "kwitter2-ba86b.appspot.com",
    messagingSenderId: "28409731236",
    appId: "1:28409731236:web:9bf94c6b1cde682426ee31"
};

firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName");
document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() {
    roomName = document.getElementById("roomName").value;

    firebase.database().ref("/").child(roomName).update({
        purpose: "adicionar nome de sala"
    });

    localStorage.setItem("roomName", roomName);

    window.location = "kwitterPage.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            roomNames = childKey;
            //Início do código
            console.log("Nome da Sala - " + roomNames);
            row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            //Fim do código
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "index.html";
}