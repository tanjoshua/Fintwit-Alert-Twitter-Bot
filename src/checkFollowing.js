const { isFollowingExists, insertFollowing, getAllFollowing, removeFollowing } = require("./db/helpers");
const { ACCOUNTS } = require("./utils/constants");
const { generateFollowingTweet, generateUnfollowTweet } = require("./utils/generateTweet");
const { getFollowing, postTweet, getUserFromId } = require("./utils/tweet")

const tweetFollowings = async (userId) => {
    let user;
    let followings;
    let storedFollowings
    try {
        storedFollowings = await getAllFollowing(userId);
        followings = await getFollowing(userId);
        user = await getUserFromId(userId);
    } catch (e) {
        if (e.statusCode == 429) {
            console.log('RATE LIMITED');
        }
        return;
    }

    const {screen_name: screenName, name} = user
    console.log(`Checking for ${screenName}...`)

    const newFollowings = new Set();
    for (let followingId of followings) {
        newFollowings.add(followingId.toString())
    }

    // check unfollowing
    for (let storedFollowing of storedFollowings) {
        const storedFollowingId = storedFollowing.following_id
        if (!newFollowings.has(storedFollowingId)) {
            try {
                const unfollowTweet = await generateUnfollowTweet(userId, screenName, storedFollowingId)  
                removeFollowing(userId, storedFollowingId); // can be async
                postTweet(unfollowTweet); // can be async
            } catch (e) {
                if (e.statusCode == 429) {
                    console.log('RATE LIMITED')
                    return; // return if rate limited
                } else if (e.statusCode == 404) {
                    console.log(`Unfollowing: ${userId} does not exist`)
                    removeFollowing(userId, storedFollowingId)
                }
            }
        }
    }

    // check following
    for (let followingId of followings) {
        newFollowings.add(followingId.toString())
        const wasProcessed = await isFollowingExists(userId, followingId);
        if (!wasProcessed) {
            // can tweet async
            try {
                const tweet = await generateFollowingTweet(userId, screenName, followingId);
                insertFollowing(screenName, userId, followingId); // can be async
                postTweet(tweet); // can be async
            } catch (e) {
                if (e.statusCode == 404) {
                    console.log(`Following: ${followingId} does not exist`)
                }
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
