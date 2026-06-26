const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const tableName = "reviews";

const addCritic = reduceProperties("review_id", {
  critic_id: ["critic", "critic_id"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
});

async function destroy(reviewId) {
  // TODO: Write your code here
  return db(tableName).where({ review_id: reviewId }).del();
}

async function list(movie_id) {
  return db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.*",
      "c.critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name"
    )
    .where({ movie_id })
    .then(addCritic);
}


async function read(reviewId) {
  // TODO: Write your code here
  return db(tableName).select("*").where({ review_id: reviewId }).first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};