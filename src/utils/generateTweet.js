const { DESCRIPTIONS } = require("./constants");
const { getUserFromId } = require("./tweet")

const generateFollowingTweet = async (userId, screenName, followingId) => {
    const following = await getUserFromId(followingId);

    const userDescription = DESCRIPTIONS[userId] ? `(${DESCRIPTIONS[userId]}) `: ""

    const tweet = `🧐 @${screenName} ${userDescription}is now following @${following.screen_name}`
    return tweet
}

const generateUnfollowTweet = async (userId, screenName, followingId) => {
    const following = await getUserFromId(followingId);

    const userDescription = DESCRIPTIONS[userId] ? `(${DESCRIPTIONS[userId]}) `: ""

    const tweet = `🤨 @${screenName} ${userDescription} has unfollowed @${following.screen_name}`
    return tweet;
}

module.exports = {generateFollowingTweet, generateUnfollowTweet}