const Poll = require("./Poll");
const Option = require("./Option");
const Vote = require("./Vote");

// Define as associações entre os modelos
Poll.hasMany(Option, { foreignKey: "pollId", onDelete: "CASCADE" });
Option.belongsTo(Poll, { foreignKey: "pollId" });

Option.hasMany(Vote, { foreignKey: "optionId", onDelete: "CASCADE" });
Vote.belongsTo(Option, { foreignKey: "optionId" });
