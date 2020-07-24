import React from "react";
import ReactEmoji from 'react-emoji';

import "./Message.css";

const Message = ({ message: { user, text }, pseudo }) => {
    let isSentByCurrentUser = false;
    const trimedPseudo = pseudo.trim().toLowerCase();
    if ((user === trimedPseudo)) {
        isSentByCurrentUser = true;
    }

    return isSentByCurrentUser ? (
        <div className="messageContainer">
            <p className="sentText pr10">{trimedPseudo}</p>
            <div className="messageBox backgroundCurrent">
                <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
            </div>
        </div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl10">{user}</p>
        </div>
    );
};

export default Message;
