const { getAllFollowing } = require("./src/db/helpers");
const { ACCOUNTS } = require("./src/utils/constants");
const { tweet, getUsers, getUserId, getFollowing, getUserFromId } = require("./src/utils/twit");

const test = async () => {
   // const input = prompt();
   const res = await getUserFromId(ACCOUNTS["BillAckman"]);
   console.log(res);
}

test();