"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.BlogEntry = exports.User = void 0;
var User = require("./user");
exports.User = User;
var BlogEntry = require("./blogentry");
exports.BlogEntry = BlogEntry;
var Comment = require("./comment");
exports.Comment = Comment;
User.hasMany(BlogEntry, { foreignKey: 'createdBy' });
User.hasMany(Comment, { foreignKey: 'createdBy' });
BlogEntry.hasMany(Comment, { foreignKey: 'commentOn', onDelete: 'cascade' });
BlogEntry.belongsTo(User, { foreignKey: 'createdBy' });
//# sourceMappingURL=index.js.map