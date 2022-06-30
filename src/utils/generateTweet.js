const { DESCRIPTIONS } = require("./constants");
const { getUserFromId } = require("./twit")

const generateFollowingTweet = async (userId, followingId) => {
    const user = await getUserFromId(userId);
    const following = await getUserFromId(followingId);
    const userDescription = DESCRIPTIONS[userId] ? `(${DESCRIPTIONS[userId]}) `: ""

    const tweet = `@${user.screen_name} ${userDescription}is now following @${following.screen_name}`
    return tweet
}

module.exports = {generateFollowingTweet}