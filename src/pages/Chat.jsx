import { useEffect, useState } from "react";


function Chat() {
    const [message, setMessage] = useState('')
    const [msgHistory, setMsgHistory] = useState([])
    const ws = new WebSocket("ws://localhost:8082")
    // const newMessage = {author: "currentUserId", msg: "", time: new Date()}

    useEffect(() => {
        console.log("Frontend welcomes you in the chat.")
        ws.addEventListener("open", () => {
            console.log("We are connected")

            // ws.send("Hey, how is it going?")
        })
    }, [])


    function handleChange(e) {
        // console.log("---> ", e.target.value)
        setMessage(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        ws.send(message)
        console.log("Message sent")
    }


    ws.addEventListener("message", e => {
        console.log("We received a message: ", e.data)
        setMsgHistory([...msgHistory, e.data])
    })

    return (
        <section>
            <h2>Chat</h2>
            <div>
                {msgHistory.length > 0 ?
                    <ul>
                        {msgHistory.map((element) => {
                            return <li>{element}</li>
                        })}
                    </ul> : <p>... no messages ...</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="msg" onChange={handleChange}></input>
                    <button>send msg</button>
                </form>
            </div>
            <article>
                <h3>WebSocket Data</h3>
            </article>
        </section>
    )
}

export default Chat;