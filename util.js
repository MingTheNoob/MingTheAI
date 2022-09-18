const request = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const {
    URL,
    URLSearchParams
} = require('url');

const {
    chat
} = require('./config.json');

const mainURL = new URL(chat.url);
const urlOptions = {
    bid: chat.brainID,
    key: chat.key,
    uid: null,
    msg: null
};
const handleStatus = (client, status) => {
    client.user.setStatus(status.state);
    client.user.setActivity(status.name, {
        type: status.type
    });
};

const handleTalk = async (msg) => {
    urlOptions.uid = msg.author.id;
    urlOptions.msg = msg.content;
    const params = new URLSearchParams(urlOptions);
    const response = await request(mainURL + '?' + params);
    const json = await response.json();
    msg.channel.sendTyping();
    setTimeout(() => {
        msg.reply(json.cnt);
        allowedMentions: {
            repliedUser: true
        }
    }, msg.content.length * 50);
};

module.exports = {
    handleStatus,
    handleTalk
};