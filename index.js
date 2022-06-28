const { tweet } = require("./src/utils/twit");

const test = async () => {
    await tweet("yo");
    console.log('tweeted');
}

test();