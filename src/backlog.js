const { getTweetBacklog, removeFromBacklogById } = require("./db/helpers");
const {postTweet} = require("./utils/twit")

const clearBacklog = async () => {
    const tweetBacklog = await getTweetBacklog();

    if (tweetBacklog.length > 0) {
        console.log(`${tweetBacklog.length} tweets in backlog, tweeting now`);
        for (let data of tweetBacklog) {
            const tweet = data.tweet
            const backlogId = data.id

            try {
                await postTweet(tweet);
                removeFromBacklogById(backlogId);
                console.log(`TWEETED: ${tweet}`);
            } catch {
                console.log("Failed to tweet, leave in backlog");
                break;
            }
        }
    } else {
        console.log('No tweets in backlog');
    }
}

module.exports = {clearBacklog}