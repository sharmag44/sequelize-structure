"use strict";

const createUser = async (req, res) => {
    try {
        const user = await db.user.create(req.body);
        return res.status(201).json({
            user
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await db.user.findAll(req.query);
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await db.user.findOne({
            where: { id: userId }
        });
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).send("user with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const [updated] = await db.user.update(req.body, {
            where: { id: userId }
        });
        if (updated) {
            const updateUser = await db.user.findOne({ where: { id: userId } });
            return res.status(200).json({ user: updateUser });
        }
        throw new Error("user not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await db.user.destroy({
            where: { id: userId }
        });
        if (deleted) {
            return res.status(204).send("user deleted");
        }
        throw new Error("user not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
