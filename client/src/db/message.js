import Axios from 'axios';

const url = 'http://ec2-34-245-150-90.eu-west-1.compute.amazonaws.com';

export const getAllMessagesFromDB = async () => {
    try {
        const res = await Axios.get(url + '/message/get-all');
        return [ ...res.data ];
    } catch (err) {
        if (err.response?.status === 404) {
            return({ errorMessage: 'No messages found' });
        }
    };
};

export const postMessagesFromDB = async (messageBody) => {
    try {
        const res = await Axios.post(url + '/message/post', { body: messageBody });
        return res.data;
    } catch (err) {
        if (err.response?.status === 400) {
            return({ errorMessage: 'Unable to post message' });
        }
    };
};