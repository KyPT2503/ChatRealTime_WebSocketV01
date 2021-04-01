let stompClient = null;
let sender = $('#sender');
let content = $('#content');
let messageForm = document.querySelector('#message-form');
messageForm.addEventListener("submit", sendMessage);

function connect() {
    //Create socket to register stomp (STOMP provides some methods to chat realtime: subscribe, send, connect)
    let socket = new SockJS("/ws");
    //Init stompClient by socket created above
    stompClient = Stomp.over(socket);
    //Connect with 3 params, onConnected() will be called when success connect, onError() will be called when any error occurred
    stompClient.connect({}, onConnected, onError);
}

connect();

function onConnected() {
    //Subscribe
    stompClient.subscribe('/topic/publicRoom', onReceiveMessage);
    //Send message to other members know someone joined
    let message = {
        sender: 'New member',
        content: 'Joined!'
    };
    stompClient.send('/app/chat', {}, JSON.stringify(message));
}

function onError() {
    console.log("Error");
}

function onReceiveMessage(payload) {
    let message = JSON.parse(payload.body);
    $('#show-message').append(`<p>${message.sender}: ${message.content}</p>`)
}

function sendMessage(event) {
    let message = {
        sender: sender.val(),
        content: content.val()
    };
    stompClient.send('/app/chat', {}, JSON.stringify(message));
    event.preventDefault();
}
