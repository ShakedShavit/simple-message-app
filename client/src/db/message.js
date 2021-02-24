import Axios from 'axios';

export const getAllMessagesFromDB = async () => {
    try {
        const res = await Axios.get('/message/get-all');
        return [ ...res.data ];
    } catch (err) {
        if (err.response?.status === 404) {
            return({ errorMessage: 'No messages found' });
        }
    };
};

export const postMessagesFromDB = async (messageBody) => {
    try {
        const res = await Axios.post('/message/post', { body: messageBody });
        return res.data;
    } catch (err) {
        if (err.response?.status === 400) {
            return({ errorMessage: 'Unable to post message' });
        }
    };
};