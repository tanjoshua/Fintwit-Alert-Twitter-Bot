const { tweetFollowings } = require("../src/checkFollowing");
const { ACCOUNTS } = require("../src/utils/constants");

const updateDb = async () => {
    for (let screenName in ACCOUNTS) {
        userId = ACCOUNTS[screenName];
        tweetFollowings(userId, true);
    }
}

updateDb();