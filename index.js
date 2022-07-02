const { getAllFollowing, insertFollowing } = require("./src/db/helpers");
const { ACCOUNTS } = require("./src/utils/constants");
const { tweet, getUsers, getUserId, getFollowing, getUserFromId } = require("./src/utils/twit");

const test = async () => {
   // const input = prompt();
   let res = await getFollowing(ACCOUNTS["BillAckman"]);
   console.log(res);
   res = await insertFollowing("BillAckman", ACCOUNTS["BillAckman"], "934388323518267392")
   console.log(res)
   

}

test();