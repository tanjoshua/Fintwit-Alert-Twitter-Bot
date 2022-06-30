const { isFollowingExists, insertFollowing } = require("./db/helpers");
const { generateFollowingTweet } = require("./utils/generateTweet");
const { getFollowing, postTweet } = require("./utils/twit")

const checkFollowings = async (userId) => {
    const followings = await getFollowing(userId);
    for (followingId of followings) {
        const wasProcessed = await isFollowingExists(userId, followingId);
        if (!wasProcessed) {
            // can tweet async
            try {
                const tweet = generateFollowingTweet(userId, followingId);
                insertFollowing(userId, followingId); // can be async
                postTweet(tweet); // can be async
            } catch {
                console.log("Failed to generate tweet")
            }
        } else {
            // since sorted by recent, can break if already processed
            break;
        }
    }
}

module.exports = {checkFollowings}
