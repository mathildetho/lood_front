import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Header from './Header';
import Footer from './Footer';

let socket;

const Chat = ({location}) => {
    const [pseudo, setPseudo] = useState('');
    const [room, setRoom] = useState('');

    const url = 'localhost:2000';

    useEffect(() => {
        const { pseudo, room } = queryString.parse(location.search);

        socket = io(url);
        setPseudo(pseudo);
        setRoom(room);

        socket.emit('join', {pseudo, room}, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [url, location.search]);

    return (
        <div>
            <Header />
            <p>chat</p>
            <Footer name='chat'/>
        </div>
    )
}

export default Chat;