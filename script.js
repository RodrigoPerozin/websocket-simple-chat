var chatDiv = document.getElementById("messagesChat");
var name = "STRANGER"
var name = getName()
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:9000');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('Connected to the WS Server!')
});

// Connection closed
socket.addEventListener('close', function (event) {
    console.log('Disconnected from the WS Server!')
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server:', event.data);

    if (event.data.at(0) == "[") {
        var dataJSON = JSON.parse(event.data)

        for(var i=0;i< dataJSON.length;i++){
            chatDiv.innerHTML = chatDiv.innerHTML+"<span class='histMsg'><p><b>HIST: </b>"+dataJSON[i]+"</p></span>";
        }

    }else{
        chatDiv.innerHTML = chatDiv.innerHTML+"<span class='strangeMsg'><p><b>STRANGE: </b>"+event.data+"</p></span>";
    }
});

function sendMsgToChat(){
    var msg = document.getElementById("msgTxtToSend").value
    socket.send(msg);

    if(msg!="$_GETHIST"){
        chatDiv.innerHTML = chatDiv.innerHTML+"<span class='youMsg'><p>"+msg+"</span>";
    }
    document.getElementById("msgTxtToSend").value = "";
}

function getName (){
    
}