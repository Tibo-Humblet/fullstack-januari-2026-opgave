import classroomDB from '../repository/classroom.db';
import { Classroom } from '../model/classroom';
import { ClassroomInput } from '../types';

const createClassroom = async ({name}: ClassroomInput): Promise<Classroom> => {
	const existingClassroom = await classroomDB.getClassroomByName(name);
	if (existingClassroom) { throw new Error(`Classroom with name: ${name} already exists!`); }

	const classroom = new Classroom({ name });
	return await classroomDB.createClassroom(classroom);
}

const getAllClassrooms = async (): Promise<Classroom[]> => classroomDB.getAllClassrooms();

export default {
	createClassroom, 
	getAllClassrooms 
};