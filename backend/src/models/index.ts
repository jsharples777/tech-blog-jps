import User = require('./user');
import BlogEntry = require('./blogentry');
import Comment = require('./comment');

User.hasMany(BlogEntry,{foreignKey: 'createdBy'});
User.hasMany(Comment,{foreignKey: 'createdBy'});
BlogEntry.hasMany(Comment, {foreignKey: 'commentOn', onDelete:'cascade'});

BlogEntry.belongsTo(User,{foreignKey: 'createdBy'})

export {User,BlogEntry,Comment};