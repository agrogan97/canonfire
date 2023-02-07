class Chatbox {
    constructor() {
        this.chatbox = document.getElementsByClassName("chatbox")[0]
        // Define a messages container div
        this.messagesDiv = document.createElement("div");
        this.messagesDiv.classList.add("messagesDiv");
        // Add it to the main chatbox parent
        this.chatbox.appendChild(this.messagesDiv);
        // Add text input field
        this.newInputBox()
        // Define some storage
        this.messages = {};
    }

    newInputBox() {
        // Create a container div
        const inputDiv = document.createElement("div")
        inputDiv.classList.add("inputDiv")

        // Create a text input field
        this.inputBox = document.createElement("input");
        this.inputBox.setAttribute("type", "text");
        this.inputBox.setAttribute("placeholder", "New Message");
        this.inputBox.classList.add("input")

        // Create a send button
        const sendBtn = document.createElement("button");
        sendBtn.classList.add("sendBtn");
        sendBtn.textContent = "Send";
        
        // Add each child to parents
        inputDiv.appendChild(this.inputBox)
        inputDiv.appendChild(sendBtn)
        this.chatbox.appendChild(inputDiv);

        // Attach an event listener to the send button
        sendBtn.addEventListener("click", (e) => {
            const msgContent = this.inputBox.value;
            let msg = {
                "text" : msgContent,
                "sender" : "A",
                "isMe" : true,
                "time" : Date.now()
            }
            if (msgContent != ''){
                this.newMessage(msg);
            }
            // Move scroll view to bottom of div
            this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
            this.inputBox.value = '';
        })

        // Also attach event listener for the enter key
        document.addEventListener("keypress", (e) => {
            if (e.key == "Enter") {
                const msgContent = this.inputBox.value;
                let msg = {
                    "text" : msgContent,
                    "sender" : "A",
                    "isMe" : true,
                    "time" : Date.now()
                }
                if (msgContent != ''){
                    this.newMessage(msg);
                }
                this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
                this.inputBox.value = '';
            }
        })
    }

    newMessage(message) {
        /* Create a div to represent a chat bubble and populate it with a message
            Input:
                    - message: A message object with keys:
                        - text: the text content of the message
                        - sender: The ID of the sender
                        - isMe: if this message is from `me`
                        - time: the epoch time that the message was sent
        */
        // Create a message and icon wrapper
        let bubbleDiv = document.createElement("div");
        bubbleDiv.classList.add("bubbleDiv");
        // Create an icon div
        let icon = document.createElement("div");
        icon.classList.add("icon");
        let iconText = document.createTextNode(message.sender[0].toLocaleUpperCase())
        icon.appendChild(iconText);
        // Create a message container div
        let bubbleBody = document.createElement("div")
        bubbleBody.classList.add("bubble");
        message.isMe? bubbleBody.classList.add("me") : bubbleBody.classList.add("you");
        // Create a text node
        let textNode = document.createTextNode(message.text);
        
        
        // Add children to parent
        bubbleBody.appendChild(textNode)
        bubbleDiv.appendChild(icon);
        bubbleDiv.appendChild(bubbleBody);
        this.messagesDiv.appendChild(bubbleDiv);
    }

}