
function updateGeneralTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById("time").textContent = `${hours}:${minutes}`;
}

function updateMessageTime() {
    const now = new Date();
    if (now - startTime < 60000) {
        document.getElementById("timestamp").textContent = "Just now";
    }
    else {
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById("timestamp").textContent = `${hours}:${minutes}`;
    }
}

function loadMessagePreview() {
    let slice = 27;
    if (window.innerWidth > 870) {
        slice = 33;
    }
    else if (window.innerWidth < 680) {
        slice = 24;
    }
    //document.getElementById("message-preview").textContent = localStorage.getItem("message-preview").slice(0,slice) + '...';
    document.getElementById("message-preview").textContent = localStorage.getItem("message-preview");
}

function loadMessages() {
    let counter  = 0;
    let messageTypes = ["user-message", "personal-message"];
    const containerPreviousMessages = document.getElementById("previous-messages");
    containerPreviousMessages.innerHTML = '';
    messages = JSON.parse(localStorage.getItem("messages"));
    messages.forEach((node)=>{
        let newDiv = document.createElement("div");
        newDiv.innerHTML = node.question;
        newDiv.classList.add(messageTypes[counter%2]);
        counter++;
        containerPreviousMessages.appendChild(newDiv);
    });
}

function loadNextMessage() {
    localStorage.setItem("startTime", new Date());
    messages = JSON.parse(localStorage.getItem("messages"));
    messages.push(gameFlow.find(node => node.id === parseInt(localStorage.getItem("currentState"), 10)));
    localStorage.setItem("messages", JSON.stringify(messages));
    loadMessages();
}


function showOptions() {
    if (currentState !== 0) {
        const gameOptions = gameFlow.find(node => node.id === parseInt(localStorage.getItem("currentState"),10)).options;
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = ''; // Clear existing options if needed

        gameOptions.forEach((option) => {
                let newDiv = document.createElement("div");
                newDiv.innerHTML = option.option;
                newDiv.onclick = function() {
                    handleSelectedOption(option.option);
                }
                optionsContainer.appendChild(newDiv);
            });

        optionsContainer.style.display = 'block';
    }
}

function hideOptions() {
    const option = document.getElementById("options");
    option.style.display = "none";
}