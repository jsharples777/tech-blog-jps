const User = require('./user');
const BlogEntry = require('./blogentry');
const Comment = require('./comment');

User.hasMany(BlogEntry);
BlogEntry.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

BlogEntry.hasMany(Comment);
Comment.belongsTo(BlogEntry);

module.exports = {User, BlogEntry, Comment};