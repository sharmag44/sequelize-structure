"use strict";

const createPost = async (req, res) => {
    try {
        const post = await db.post.create(req.body);
        return res.status(201).json({
            post
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await db.post.findAll({
            include: [
                {
                    model: db.comment,
                    as: "comments"
                },
                {
                    model: db.user,
                    as: "author"
                }
            ]
        });
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await db.post.findOne({
            where: { id: postId },
            include: [
                {
                    model: db.comment,
                    as: "comments",
                    include: [
                        {
                            model: db.user,
                            as: "author"
                        }
                    ]
                },
                {
                    model: db.user,
                    as: "author"
                }
            ]
        });
        if (post) {
            return res.status(200).json({ post });
        }
        return res.status(404).send("post with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const [updated] = await db.post.update(req.body, {
            where: { id: postId }
        });
        if (updated) {
            const updatePost = await db.post.findOne({ where: { id: postId } });
            return res.status(200).json({ post: updatePost });
        }
        throw new Error("post not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const deleted = await db.post.destroy({
            where: { id: postId }
        });
        if (deleted) {
            return res.status(204).send("post deleted");
        }
        throw new Error("post not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};



module.exports = {
    create: createPost,
    search: getAllPosts,
    get: getPostById,
    update: updatePost,
    remove: deletePost
};
