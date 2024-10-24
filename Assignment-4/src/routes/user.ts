import { Router, Request, Response } from 'express';
import { User } from '../models/user';
import pool from '../db';

const router = Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  const { firstName, middleName, lastName, email, phoneNumber, role, address } = req.body;
  const result = await pool.query(
    'INSERT INTO users (first_name, middle_name, last_name, email, phone_number, role, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [firstName, middleName, lastName, email, phoneNumber, role, address]
  );
  res.status(201).json(result.rows[0]);
});

// Update a user by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { firstName, middleName, lastName, email, phoneNumber, role, address } = req.body;
  const result = await pool.query(
    'UPDATE users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, phone_number = $5, role = $6, address = $7 WHERE id = $8 RETURNING *',
    [firstName, middleName, lastName, email, phoneNumber, role, address, req.params.id]
  );
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete a user by ID
router.delete('/:id', async (req: Request, res: Response) => {
  await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
  res.status(204).send();
});

export default router;
