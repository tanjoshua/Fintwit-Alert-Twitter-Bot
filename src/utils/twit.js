require('dotenv').config();
const Twit = require('twit');

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const postTweet = async (tweet) => {
    return T.post("statuses/update",  { status: tweet })
}

const getUsers = async (user) => {
    return T.get("users/search", {q: user, count: 5})
}

const getUserId = async (screenName) => {
    return T.get("users/lookup", {screen_name: screenName})
}

const getFollowing = async (userId) => {
    const res = await T.get("friends/ids", {user_id: userId});
    return res?.data?.ids;
}

const getUserFromId = async (userId) => {
    try {
        const res = await T.get("users/lookup", {user_id: userId})
        if (res?.data && res.data.length > 0) {
            return res.data[0];
        } else {
            return null
        }
    } catch {
        return null;
    }
}



module.exports = {postTweet, getUsers, getUserId, getFollowing, getUserFromId}