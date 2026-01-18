import { Classroom } from '../model/classroom';
import database from '../util/database';

const createClassroom = async ({ name }: Classroom): Promise<Classroom> => {
	try {
		const classroomPrisma = await database.classroom.create({
			data: { name },
		});
		return Classroom.from(classroomPrisma);
	} catch (error) { throw new Error('Database error. see server log for details'); }
}

const getClassroomByName = async (name: string): Promise<Classroom | null> => {
	try {
		const classroomPrisma = await database.classroom.findUnique({ where: { name }, });
		return classroomPrisma ? Classroom.from(classroomPrisma) : null;
	} catch (error) { throw new Error('Database error. see server log for details'); }
}

const getAllClassrooms = async (): Promise<Classroom[]> => {
	try {
		const classroomsPrisma = await database.classroom.findMany();
		return classroomsPrisma.map((classroomPrisma) => Classroom.from(classroomPrisma));
	} catch (error) { throw new Error('Database error. see server log for details'); }
}

export default {
	createClassroom,
	getClassroomByName,
	getAllClassrooms
}