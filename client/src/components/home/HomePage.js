import React, { useEffect, useState } from 'react';
import { getAllMessagesFromDB } from '../../db/message';
import Message from '../message/Message';
import PostMessageForm from '../message/PostMessageForm';

const HomePage = () => {
    const [messages, setMessages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(async () => {
        const dbMessages = await getAllMessagesFromDB();
        if (!!dbMessages && dbMessages.length !== 0 && !dbMessages.errorMessage) setMessages(dbMessages);
        else if (!!dbMessages.errorMessage) setErrorMessage(dbMessages.errorMessage);
    }, []);
useEffect(() => {console.log(messages)}, [messages])
    return (
        <div>
            <h1>Messages:</h1>

            { messages.length === 0 && errorMessage.length !== 0 && <span>{errorMessage}</span> }
            {
                messages.map((message) => {
                    return <Message message={message.body} />;
                })
            }

            <PostMessageForm messages={messages} setMessages={setMessages} />
        </div>
    )
};

export default HomePage;