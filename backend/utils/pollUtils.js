const Poll = require("../models/Poll");
const Option = require("../models/Option");
const Vote = require("../models/Vote");

async function getResults(pollId) {
  const options = await Option.findAll({ where: { PollId: pollId } });
  const results = {};

  for (const option of options) {
    const voteCount = await Vote.count({ where: { OptionId: option.id } });
    results[option.id] = {
      text: option.text,
      votes: voteCount,
    };
  }

  return results;
}

module.exports = { getResults };
