"use strict";

const create = async (req, res) => {
    try {
        const post = await db.post.create(req.body);
        return res.status(201).json({
            post
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const search = async (req, res) => {
    try {
        const posts = await db.comment.findAll(req.query);
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const get = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await db.comment.findOne({
            where: { id: commentId }
        });
        if (comment) {
            return res.status(200).json({ comment });
        }
        return res.status(404).send("comment with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const update = async (req, res) => {
    try {
        const { commentId } = req.params;
        const [updated] = await db.post.update(req.body, {
            where: { id: postId }
        });
        if (updated) {
            const updateComment = await db.comment.findOne({ where: { id: commentId } });
            return res.status(200).json({ comment: updateComment });
        }
        throw new Error("post not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const remove = async (req, res) => {
    try {
        const { commentId } = req.params;
        const deleted = await db.comment.destroy({
            where: { id: commentId }
        });
        if (deleted) {
            return res.status(204).send("comment deleted");
        }
        throw new Error("post not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    create,
    search,
    get,
    update,
    remove
};
