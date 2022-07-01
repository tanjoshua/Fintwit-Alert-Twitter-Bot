const { resetAllFollowing, insertFollowing } = require("../src/db/helpers");
const { ACCOUNTS } = require("../src/utils/constants");
const { getFollowing } = require("../src/utils/twit");

const init = async () => {
    await resetAllFollowing();
    for (screenName in ACCOUNTS) {
        userId = ACCOUNTS[screenName];
        followings = await getFollowing(userId);
        for (followingId of followings) {
            insertFollowing(screenName, userId, followingId);
        }
    }
}

init();