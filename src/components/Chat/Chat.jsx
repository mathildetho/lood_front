import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import Header from "../Header";
import Footer from "../Footer";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
    const [pseudo, setPseudo] = useState("");
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const url = "localhost:2000";

    const pseudoLooder = location.state.pseudo;

    useEffect(() => {
        const { pseudo, room } = queryString.parse(location.search);

        socket = io(url);
        setPseudo(pseudo);
        setRoom(room);

        socket.emit("join", { pseudo, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [url, location.search]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    };

    return (
        <div>
            <Header />
            <div className="outerContainer">
                <div className="container">
                    <InfoBar pseudoLooder={pseudoLooder} room={room} />
                    <Messages messages={messages} pseudo={pseudo} />
                    <Input
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </div>
            </div>
            <Footer name="chat" />
        </div>
    );
};

export default Chat;
