import React from 'react';
import { postMessagesFromDB } from '../../db/message';

const PostMessageForm = (props) => {
    const postMessagesOnSubmit = (e) => {
        e.preventDefault();

        const messageBody = e.target[0].value;

        postMessagesFromDB(messageBody)
        .then((res) => {
            props.setMessages([ ...props.messages ].concat(res));

            e.target[0].value = '';
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <form onSubmit={postMessagesOnSubmit}>
            <input type="text" placeholder="Type a message"></input>
            <button type="submit">Post Message</button>
        </form>
    )
};

export default PostMessageForm;