import { Router, Request, Response } from 'express';
import pool from '../db';
import { Role } from '../models/role';

const router = Router();

// Get all roles
router.get('/', async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM roles');
  res.json(result.rows);
});

// Get role by ID
router.get('/:id', async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM roles WHERE id = $1', [req.params.id]);
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).json({ message: 'Role not found' });
  }
});

// Create a new role
router.post('/', async (req: Request, res: Response) => {
  const { name, key, description } = req.body;
  const result = await pool.query(
    'INSERT INTO roles (name, key, description) VALUES ($1, $2, $3) RETURNING *',
    [name, key, description]
  );
  res.status(201).json(result.rows[0]);
});

// Update a role by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { name, key, description } = req.body;
  const result = await pool.query(
    'UPDATE roles SET name = $1, key = $2, description = $3 WHERE id = $4 RETURNING *',
    [name, key, description, req.params.id]
  );
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).json({ message: 'Role not found' });
  }
});

// Delete a role by ID
router.delete('/:id', async (req: Request, res: Response) => {
  await pool.query('DELETE FROM roles WHERE id = $1', [req.params.id]);
  res.status(204).send();
});

export default router;
