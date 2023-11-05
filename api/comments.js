"use strict";

const createComment = async (req, res) => {
    try {
        const post = await db.post.create(req.body);
        return res.status(201).json({
            post
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const posts = await db.comment.findAll(req.query);
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getCommentById = async (req, res) => {
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

const updateComment = async (req, res) => {
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

const deleteComment = async (req, res) => {
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
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
};
