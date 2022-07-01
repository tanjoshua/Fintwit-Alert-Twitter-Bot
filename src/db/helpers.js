const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const insertFollowing = async (screenName, userId, followingId) => {
    return pool.query('INSERT INTO following VALUES ($1, $2, $3)', [screenName, userId, followingId])
}

const removeFollowing = async (userId, followingId) => {
    return pool.query('DELETE FROM following WHERE user_id=$1 AND following_id=$2', [userId, followingId])
}

const isFollowingExists = async (userId, followingId) => {
    const res = await pool.query('SELECT * FROM following WHERE user_id=$1 AND following_id=$2', [userId, followingId])
    return !!res.rowCount
}

const getAllFollowing = async (userId) => {
    const res = await pool.query('SELECT following_id FROM following WHERE user_id=$1', [userId])
    return res.rows;
}

const resetAllFollowing = async () => {
    await pool.query('DELETE FROM following');
}

const getTweetBacklog = async () => {
    const res = await pool.query('SELECT id, tweet FROM backlog')
    return res.rows;
}

const addToBacklog = async (tweet) => {
    await pool.query('INSERT INTO backlog (tweet) VALUES ($1)', [tweet]);  
}

const removeFromBacklogById = async (id) => {
    await pool.query('DELETE FROM backlog WHERE id=$1', [id])
}





module.exports = {
    insertFollowing,
    removeFollowing,
    isFollowingExists,
    getAllFollowing,
    resetAllFollowing,
    getTweetBacklog,
    addToBacklog,
    removeFromBacklogById
}
