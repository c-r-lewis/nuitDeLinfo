window.onload = function() {
    updateGeneralTime();
    setInterval(updateGeneralTime, 1000);

    messages = JSON.parse(localStorage.getItem('messages')) || [];

    if (messages.length === 0) {
        messages.push(gameFlow.find(node => node.id === 1));
        localStorage.setItem("messages", JSON.stringify(messages));
        localStorage.setItem("message-preview", gameFlow.find(node => node.id===1).question);

        localStorage.setItem("currentState", "1");
    }

    if (window.location.pathname.includes('chat.html')) {
        loadMessages();
    }
    else {
        loadMessagePreview();
        if (!localStorage.getItem('startTime')) {
            localStorage.setItem('startTime', new Date());
        }
        startTime = new Date(localStorage.getItem('startTime')); // Retrieve the start time
        updateMessageTime();
        setInterval(updateMessageTime, 1000);
    }


}

function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
    console.log(currentState);
}

