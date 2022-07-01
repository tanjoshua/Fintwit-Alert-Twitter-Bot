const { DESCRIPTIONS } = require("./constants");
const { getUserFromId } = require("./twit")

const generateFollowingTweet = async (userId, screenName, followingId) => {
    const following = await getUserFromId(followingId);
    const userDescription = DESCRIPTIONS[userId] ? `(${DESCRIPTIONS[userId]}) `: ""

    const tweet = `🧐 @${screenName} ${userDescription}is now following @${following.screen_name}`
    return tweet
}

const generateUnfollowTweet = async (userId, screenName, followingId) => {
    const following = await getUserFromId(followingId);
    if (!following) {
        // user doesn't exist
        return null;
    }
    const userDescription = DESCRIPTIONS[userId] ? `(${DESCRIPTIONS[userId]}) `: ""

    const tweet = `🤨 @${screenName} ${userDescription} has unfollowed @${following.screen_name}`
    return tweet;
}

module.exports = {generateFollowingTweet, generateUnfollowTweet}