// Define a socket listener for the matchmaking event
var introduction;
socket.on('result', (msg) => {
    console.log(`Got message ${msg}`)
    if (msg == "pass") {
        // redirect
        const url = `/game.html?room=${introduction.room}&name=${introduction.name}`
        window.location.href = url
    } else if (msg == "fail") {
        // Inform user of bad ID
        document.getElementsById("connectionStatus").setAttribute("display", "visible")
        console.log("Connection unsuccessful")
    } else {
        throw `Received unknown code ${msg}`
    }
})

document.getElementById("joinGameBtn").addEventListener("click", (e) => {
    introduction = {
        "name" : document.getElementById("enterName").value,
        "room" : document.getElementById("enterRoomId").value
    }
    socket.emit('matchmaking', introduction)
})

