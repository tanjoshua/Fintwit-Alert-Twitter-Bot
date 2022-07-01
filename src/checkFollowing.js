const { isFollowingExists, insertFollowing, getAllFollowing, removeFollowing } = require("./db/helpers");
const { ACCOUNTS } = require("./utils/constants");
const { generateFollowingTweet, generateUnfollowTweet } = require("./utils/generateTweet");
const { getFollowing, postTweet, getUserFromId } = require("./utils/twit")

const tweetFollowings = async (userId) => {
    let user;
    let followings;
    let storedFollowings
    try {
        storedFollowings = await getAllFollowing(userId);
        followings = await getFollowing(userId);
        user = await getUserFromId(userId);
    } catch {
        return;
    }

    const {screen_name: screenName, name} = user

    // check unfollows
    for (storedFollowing of storedFollowings) {
        storedFollowingId = parseInt(storedFollowing.following_id)
        if (!followings.includes(storedFollowingId)) {
            const unfollowTweet = await generateUnfollowTweet(userId, screenName, storedFollowingId);
            if (unfollowTweet) {
                console.log(unfollowTweet);
                // postTweet(tweet); // can be async
            }
            removeFollowing(userId, storedFollowingId); // can be async
        }
    }
    
    // check following
    for (followingId of followings) {
        const wasProcessed = await isFollowingExists(userId, followingId);
        if (!wasProcessed) {
            // can tweet async
            try {
                const tweet = await generateFollowingTweet(userId, screenName, followingId);
                insertFollowing(screenName, userId, followingId); // can be async
                console.log(tweet)
                // postTweet(tweet); // can be async
            } catch (e) {
                console.log(e)
                console.log("Failed to generate tweet")
            }
        } else {
            // since sorted by recent, can break if already processed
            break;
        }
    }

}

const tweetAllFollowings = async () => {
    for (screenName in ACCOUNTS) {
        userId = ACCOUNTS[screenName];
        tweetFollowings(userId); // can be async
    }
}

module.exports = {tweetFollowings, tweetAllFollowings}
