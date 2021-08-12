"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var debug_1 = __importDefault(require("debug"));
var index_1 = require("../models/index");
var moment_1 = __importDefault(require("moment"));
var SocketManager_1 = __importDefault(require("../util/SocketManager"));
var router = express_1.default.Router();
var rDebug = debug_1.default('api');
/* Comments API -
*    comments are retrieved with the tech blog entries, but we need to supply
*    API calls for creating and deleting.
* */
router.post('/comment', function (req, res) {
    rDebug('Creating a Comment');
    var changedOn = parseInt(moment_1.default().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    rDebug(req.body);
    index_1.Comment.create(req.body)
        .then(function (comment) {
        // @ts-ignore
        var message = { type: "create", objectType: "Comment", data: comment, user: req.user.id, };
        SocketManager_1.default.sendMessage(message);
        res.json(comment);
    })
        .catch(function (err) {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.put('/comment/:id', function (req, res) {
    rDebug("Updating Comment with id " + req.params.id);
    var changedOn = parseInt(moment_1.default().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    rDebug(req.body);
    index_1.Comment.update(req.body, {
        where: { id: req.params.id }
    }).then(function (comment) {
        // @ts-ignore
        var message = { type: "update", objectType: "Comment", data: comment, user: req.user.id, };
        SocketManager_1.default.sendMessage(message);
        res.json(comment);
    })
        .catch(function (err) {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.delete('/comment/:id', function (req, res) {
    rDebug("Deleting Comment with id " + req.params.id);
    // find the comment first
    index_1.Comment.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (comment) {
        // @ts-ignore
        index_1.Comment.destroy({ where: { id: comment.id }
        }).then(function (result) {
            // @ts-ignore
            var message = { type: "delete", objectType: "Comment", data: comment, user: req.user.id, };
            SocketManager_1.default.sendMessage(message);
            res.json({ result: true });
        })
            .catch(function (err) {
            rDebug(err);
            res.status(400).json(err);
        });
    })
        .catch(function (err) {
        rDebug(err);
        res.status(400).json(err);
    });
});
/*
  Tech Blog entries API - CRUD
*/
router.get('/blog', function (req, res) {
    rDebug('Getting all blog entries, their creators and any comments');
    index_1.BlogEntry.findAll({
        include: [index_1.User, index_1.Comment],
        order: ['id', 'changedOn']
    })
        .then(function (blog) {
        res.json(blog);
    })
        .catch(function (err) {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.post('/blog', function (req, res) {
    rDebug('Creating a blog entry');
    rDebug(req.body);
    var changedOn = parseInt(moment_1.default().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    index_1.BlogEntry.create(req.body)
        .then(function (blog) {
        // @ts-ignore
        rDebug("Created new blog entry with id " + blog.id + " need full object now");
        // @ts-ignore
        index_1.BlogEntry.findOne({ include: [index_1.User, index_1.Comment], where: { id: blog.id }
        })
            .then(function (blog) {
            // @ts-ignore
            var message = { type: "create", objectType: "BlogEntry", data: blog, user: req.user.id, };
            SocketManager_1.default.sendMessage(message);
            res.json(blog);
        })
            .catch(function (err) {
            rDebug(err);
            res.status(400).json(err);
        });
    })
        .catch(function (err) {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.put('/blog/:id', function (req, res) {
    rDebug("Updating blog entry with id " + req.params.id);
    rDebug(req.body);
    var changedOn = parseInt(moment_1.default().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    index_1.BlogEntry.update(req.body, {
        where: { id: req.params.id }
    })
        .then(function (blog) {
        // @ts-ignore
        rDebug("Updated new blog entry with id " + blog.id + " need full object now");
        index_1.BlogEntry.findOne({
            include: [index_1.User, index_1.Comment],
            where: {
                id: req.params.id
            }
        })
            .then(function (blog) {
            // @ts-ignore
            var message = { type: "update", objectType: "BlogEntry", data: blog, user: req.user.id, };
            SocketManager_1.default.sendMessage(message);
            res.json(blog);
        })
            .catch(function (err) {
            rDebug(err);
            res.status(400).json(err);
        });
    })
        .catch(function (err) {
        rDebug(err);
        res.status(400).json(err);
    });
});
router.delete('/blog/:id', function (req, res) {
    rDebug("Deleting blog entry with id " + req.params.id);
    index_1.BlogEntry.destroy({
        where: { id: req.params.id }
    })
        .then(function (result) {
        // @ts-ignore
        var message = { type: "delete", objectType: "BlogEntry", data: { id: parseInt(req.params.id) }, user: req.user.id, };
        SocketManager_1.default.sendMessage(message);
        res.json({ result: true });
    })
        .catch(function (err) {
        rDebug(err);
        res.status(400).json(err);
    });
});
/*
  User entries API - Read only, for ids and names
*/
router.get('/users', function (req, res) {
    rDebug('Getting all user entries');
    index_1.User.findAll({ attributes: ['id', 'username'] })
        .then(function (users) {
        // be sure to include its associated Products
        res.json(users);
    })
        .catch(function (err) {
        rDebug(err);
        res.status(400).json(err);
    });
});
module.exports = router;
module.exports = router;
//# sourceMappingURL=api.js.map