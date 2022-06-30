const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const insertFollowing = async (userId, followingId) => {
    return pool.query('INSERT INTO following VALUES ($1, $2)', [userId, followingId])
}

const isFollowingExists = async (userId, followingId) => {
    const res = await pool.query('SELECT * FROM following WHERE user_id=$1 AND following_id=$2', [userId], followingId)
    return !!res.rowCount
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
    isFollowingExists,
    getTweetBacklog,
    addToBacklog,
    removeFromBacklogById
}
