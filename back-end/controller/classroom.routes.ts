import express, { NextFunction, Request, Response } from 'express';
import classroomService from '../service/classroom.service';
import { ClassroomInput } from '../types';
import { checkRole } from '../middleware/checkRole';

const classroomRouter = express.Router();

classroomRouter.get('/', async (req: Request, res: Response, next:  NextFunction) => {
	try {
		res.status(200).json(await classroomService.getAllClassrooms());
	} catch (error) { next(error); }
});

classroomRouter.post('/admin/create', checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const classroomInput = <ClassroomInput>req.body;
		const response = await classroomService.createClassroom(classroomInput);
		res.status(200).json(response);
	} catch (error) { next(error); }
});

export { classroomRouter };

// start swagger
	/**
	 * @swagger
	 * components:
	 *   schemas:
	 *     Classroom:
	 *       type: object
	 *       properties:
	 *         id:
	 *           type: integer
	 *           example: 1
	 *         name:
	 *           type: string
	 *           example: "C103"
	 *
	 *     ClassroomInput:
	 *       type: object
	 *       required:
	 *         - name
	 *       properties:
	 *         name:
	 *           type: string
	 *           example: "C103"
	 */

	/**
	 * @swagger
	 * /classrooms:
	 *   get:
	 *     summary: Get all classrooms
	 *     tags:
	 *       - Classrooms
	 *     responses:
	 *       200:
	 *         description: List of classrooms
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Classroom'
	 *       401:
	 *         description: Unauthorized
	 */

	/**
	 * @swagger
	 * /classrooms/admin/create:
	 *   post:
	 *     summary: Create a new classroom (admin only)
	 *     tags:
	 *       - Classrooms
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/ClassroomInput'
	 *     responses:
	 *       200:
	 *         description: Classroom successfully created
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Classroom'
	 *       401:
	 *         description: Unauthorized
	 *       403:
	 *         description: Forbidden (admin only)
	 */

// end swagger