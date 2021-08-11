// const User = require('./user');
// const BlogEntry = require('./blogentry');
// const Comment = require('./comment');
import User = require('./user');
import BlogEntry = require('./blogentry');
import Comment = require('./comment');

User.hasMany(BlogEntry,{foreignKey: 'createdBy'});
User.hasMany(Comment,{foreignKey: 'createdBy'});
BlogEntry.hasMany(Comment, {foreignKey: 'commentOn', onDelete:'cascade'});

BlogEntry.belongsTo(User,{foreignKey: 'createdBy'})


//module.exports = {User, BlogEntry, Comment};
export = {User,BlogEntry,Comment};