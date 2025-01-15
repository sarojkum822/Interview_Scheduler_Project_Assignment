// backend/routes/interviewRoutes.js
import express from 'express';
import { createInterview, getInterviews, updateInterview, deleteInterview } from '../controllers/interviewController.js';

const router = express.Router();

router.post('/create', createInterview);
router.get('/', getInterviews); // Fetch all interviews
router.put('/:id', updateInterview); // Update an interview
router.delete('/:id', deleteInterview); // Delete an interview

export default router;