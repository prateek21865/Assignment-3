import { Request, Response } from 'express';
import db from '../db'; // Adjust the path according to your project structure
import { User } from '../models/user'; // Import the User model

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { first_name, middle_name, last_name, email, phone_number, role, address } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO users (first_name, middle_name, last_name, email, phone_number, role, address, created_on, modified_on) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
            [first_name, middle_name, last_name, email, phone_number, role, address]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUserData: Partial<User> = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        const userExists = result.rows[0];
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await db.query(
            'UPDATE users SET first_name = $1, last_name = $2, middle_name = $3, email = $4, phone_number = $5, role = $6, address = $7, modified_on = NOW() WHERE id = $8 RETURNING *',
            [
                updatedUserData.first_name ?? userExists.first_name,
                updatedUserData.last_name ?? userExists.last_name,
                updatedUserData.middle_name ?? userExists.middle_name,
                updatedUserData.email ?? userExists.email,
                updatedUserData.phone_number ?? userExists.phone_number,
                updatedUserData.address ?? userExists.address,
                id,
            ]
        );
        res.status(200).json(updatedUser.rows[0]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        const userExists = result.rows[0];
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(204).send(); // No content to return on successful deletion
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
