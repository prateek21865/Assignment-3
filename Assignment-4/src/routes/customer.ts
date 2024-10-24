import { Router, Request, Response } from 'express';
import pool from '../db';
import { Customer } from '../models/customer';

const router = Router();

// Get all customers
router.get('/', async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM customers');
  res.json(result.rows);
});

// Get customer by ID
router.get('/:id', async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM customers WHERE id = $1', [req.params.id]);
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// Create a new customer
router.post('/', async (req: Request, res: Response) => {
  const { name, website, address } = req.body;
  const result = await pool.query(
    'INSERT INTO customers (name, website, address) VALUES ($1, $2, $3) RETURNING *',
    [name, website, address]
  );
  res.status(201).json(result.rows[0]);
});

// Update a customer by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { name, website, address } = req.body;
  const result = await pool.query(
    'UPDATE customers SET name = $1, website = $2, address = $3 WHERE id = $4 RETURNING *',
    [name, website, address, req.params.id]
  );
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// Delete a customer by ID
router.delete('/:id', async (req: Request, res: Response) => {
  await pool.query('DELETE FROM customers WHERE id = $1', [req.params.id]);
  res.status(204).send();
});

export default router;
