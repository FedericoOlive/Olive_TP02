function getBasePath()
{
    if (window.location.hostname === "federicoolive.github.io")
        return "/Olive_TP02/";
    return "/";
}

const basePath = getBasePath();
const allMessages = [];

const html = {
    messagesList:
    {
        container: document.querySelector("#messagesList")
    },
    messagesForm:
    {
        container: document.querySelector("#form"),
        input: document.querySelector("#inputText"),
        errorText: document.querySelector("#errorText")
    }
}

document.addEventListener("DOMContentLoaded", () =>
{
    fetch(basePath + "Resources/Messages.json")
        .then(res => res.json())
        .then(msg =>
        {
            addMessages(msg.messages);
        });
});

function addMessages(multiplesMessages, isOwn = false)
{
    multiplesMessages.forEach(message =>
    {
        const date = new Date(message.time);
        const hour = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const isoUTC = hour + ':' + minutes;

        allMessages.push(message);
        const ownClass = isOwn ? 'own' : 'other';

        const msg = `
            <div class="message ${ownClass}">
            <span class="name">${message.name}</span>
            <p class="text">${message.content}</p>
            <p class="time">${isoUTC}</p>
            <hr/>
            </div>
            `;
        html.messagesList.container.innerHTML += msg;
    });

    ScrollToBottom();
}

function handleSubmit(event)
{
    event.preventDefault();
    const message = event.target.message.value;
    console.log(message);

    if (!message)
    {
        alert("El mensaje no puede estar vacío");
    }
    else
    {
        const now = new Date();
        const isoUTC = now.toISOString().split('.')[0] + 'Z';

        const singleMessage = {
            id: allMessages.length + 1,
            name: "You",
            content: message,
            time: isoUTC
        };

        allMessages.push(singleMessage);
        addMessages([singleMessage], true);
        console.log(allMessages);
    };
}

function ScrollToBottom()
{
    window.scrollTo(
    {
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

html.messagesList.container.innerHTML = "";
html.messagesForm.container.addEventListener('submit', handleSubmit);