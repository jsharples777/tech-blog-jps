const express = require('express');
const debug = require('debug')('api');
const {User,BlogEntry,Comment} = require('../models');
const moment = require('moment');
const socketManager = require('../util/SocketManager');

const router = express.Router();

/* Comments API -
*    comments are retrieved with the tech blog entries, but we need to supply
*    API calls for creating and deleting.
* */
router.post('/comment', (req,res) => {
    debug('Creating a Comment');

    const changedOn = parseInt(moment().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    debug(req.body);
    Comment.create(req.body)
    .then((comment) => {
        const message = {
            type:"create",
            objectType: "Comment",
            data:comment,
            user:req.user.id,
        }
        socketManager.sendMessage(message);
        res.json(comment);
    })
    .catch((err) => {
        debug(err);
        res.status(400).json(err);
    });
});

router.put('/comment/:id', (req,res) => {
    debug(`Updating Comment with id ${req.params.id}`);

    const changedOn = parseInt(moment().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    debug(req.body);
    Comment.update(req.body,
    {
        where: {id: req.params.id}
    }).then((comment) => {
        const message = {
            type:"update",
            objectType: "Comment",
            data:comment,
            user:req.user.id,
        }
        socketManager.sendMessage(message);

        res.json(comment);
    })
    .catch((err) => {
        debug(err);
        res.status(400).json(err);
    });
});

router.delete('/comment/:id', (req,res) => {
    debug(`Deleting Comment with id ${req.params.id}`);
    // find the comment first
    Comment.findOne({
        where: {
            id: req.params.id
        }
    })
    .then ((comment) => {
        Comment.destroy({
            where: {id: comment.id}
        }).then((result) => {
            const message = {
                type:"delete",
                objectType: "Comment",
                data:comment,
                user:req.user.id,
            }
            socketManager.sendMessage(message);
            res.json({result:true});
        })
        .catch((err) => {
            debug(err);
            res.status(400).json(err);
        });

    })
    .catch((err) => {
        debug(err);
        res.status(400).json(err);
    });


});

/*
  Tech Blog entries API - CRUD
*/
router.get('/blog', (req,res) => {
    debug('Getting all blog entries, their creators and any comments');

    BlogEntry.findAll({
        include: [User, Comment],
        order: ['id','changedOn']
    })
        .then((blog) => {
            res.json(blog);
        })
        .catch((err) => {
            debug(err);
            res.status(400).json(err);
        });
});

router.post('/blog', (req,res) => {
    debug('Creating a blog entry');


    debug(req.body);
    const changedOn = parseInt(moment().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    BlogEntry.create(req.body)
        .then((blog) => {
            debug(`Created new blog entry with id ${blog.id} need full object now`);
            BlogEntry.findOne({
                include: [User, Comment],
                where: {
                    id: blog.id
                }
            })
            .then((blog) => {
                const message = {
                    type:"create",
                    objectType: "BlogEntry",
                    data:blog,
                    user:req.user.id,
                }
                socketManager.sendMessage(message);
                res.json(blog);
            })
            .catch((err) => {
                debug(err);
                res.status(400).json(err);
            });
        })
        .catch((err) => {
            debug(err);
            res.status(400).json(err);
        });
});

router.put('/blog/:id', (req,res) => {
    debug(`Updating blog entry with id ${req.params.id}`);

    debug(req.body);
    const changedOn = parseInt(moment().format("YYYYMMDDHHmmss"));
    req.body["changedOn"] = changedOn;
    BlogEntry.update(req.body,
        {
            where: {id: req.params.id}
        })
        .then((blog) => {
            debug(`Updated new blog entry with id ${blog.id} need full object now`);
            BlogEntry.findOne({
                include: [User, Comment],
                where: {
                    id: req.params.id
                }
            })
                .then((blog) => {
                    const message = {
                        type:"update",
                        objectType: "BlogEntry",
                        data:blog,
                        user:req.user.id,
                    }
                    socketManager.sendMessage(message);
                    res.json(blog);
                })
                .catch((err) => {
                    debug(err);
                    res.status(400).json(err);
                });
        })
        .catch((err) => {
            debug(err);
            res.status(400).json(err);
        });
});

router.delete('/blog/:id', (req,res) => {
    debug(`Deleting blog entry with id ${req.params.id}`);
    BlogEntry.destroy({
        where: {id: req.params.id}
    })
        .then((result) => {
            const message = {
                type:"delete",
                objectType: "BlogEntry",
                data:{ id: parseInt(req.params.id) },
                user:req.user.id,
            }
            socketManager.sendMessage(message);
            res.json({result:true});
         })
        .catch((err) => {
            debug(err);
            res.status(400).json(err);
        });
});

/*
  User entries API - Read only, for ids and names
*/
router.get('/users', (req,res) => {
    debug('Getting all user entries');
    User.findAll({attributes: ['id','username']})
        .then((users) => {
            // be sure to include its associated Products
            res.json(users);
        })
        .catch((err) => {
            debug(err);
            res.status(400).json(err);
        });
});

module.exports = router;