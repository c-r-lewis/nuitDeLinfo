let currentState;
let startTime;
let messages;

const gameFlow = [
    {
        id: 1,
        question: "Hey Alex, long time no see! Wanna catch up tonight at the Luna Bar?",
        user: "Jean",
        options: [
            { option: "Can't tonight, but keep me posted on what happens!", next: 2 }
        ]
    },
    {
        id: 2,
        question: "It's been rough... I’ve been trying to distract myself. You know, casual flings... But I’m careful, I think.",
        user: "Jean",
        options: [
            { option: "What do you mean by careful? Do you use protection and get tested regularly?", next: 3 },
            { option: "Casual flings can be complicated. Are you considering the emotional toll and the risks, like STDs?", next: 4 }
        ]
    },
    {
        id: 3,
        question: "Yeah, I always use protection. But testing... not as often as I should, I guess. It's a hassle.",
        user: "Jean",
        options: [
            {option: "It's really important to get tested. It's the only way to be sure and to keep yourself and others safe."},
            {option: "I can recommend some places for testing if you want. They make it pretty easy."}
        ]
    },
    {
        id: 4,
        question: "I haven't really thought about it that way. I guess it's another way of not dealing with the breakup.",
        user: "Jean",
        options: [
            {option: "It's okay to need distraction, but it's also important to stay safe and think about the consequences."},
            {option: "If you need someone to talk to about the breakup or the risks, I'm here. It's a lot to process.", next: 5}
        ]
    },
    {
        id: 5,
        question: "Thanks buddy! I appreciate it!",
        options: []
    }
];

function handleSelectedOption(selectedOption) {
    const currentNode = gameFlow.find(node => node.id === parseInt(localStorage.getItem("currentState"),10));
    messages = JSON.parse(localStorage.getItem("messages"));
    messages.push({question: selectedOption});
    localStorage.setItem("message-preview", "You: " + selectedOption.slice(0,22)+'...');
    localStorage.setItem("startTime", new Date());
    localStorage.setItem("messages", JSON.stringify(messages));

    const nextState = currentNode
        .options.find(option => option.option === selectedOption)
        .next;

    if (nextState) {
        const node = gameFlow.find(node => node.id === nextState);
        localStorage.setItem("message-preview", node.question.slice(0, 27) + '...');
        localStorage.setItem("currentState", nextState);
        loadNextMessage();
    }
    else {
        currentState = 0;
        loadMessages();
    }
    hideOptions();
}



