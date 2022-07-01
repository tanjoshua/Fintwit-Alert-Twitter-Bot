const { resetAllFollowing } = require("../src/db/helpers")

const clear = async () => {
    await resetAllFollowing();
}

clear();