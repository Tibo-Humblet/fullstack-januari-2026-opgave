import { Classroom as ClassroomPrisma } from '@prisma/client';

export class Classroom {
	readonly id?: number;
	readonly name: string;

	constructor(classroom: { id?:number; name: string; }) {
		this.validate(classroom);

		this.id = classroom.id;
		this.name = classroom.name;
	}

	// start getters
		getId(): number | undefined { return this.id; }
		getName(): string { return this.name; }
	// end getters

	// start functions
		validate(classroom: { name: string; }) {
			if (!classroom.name) { throw new Error('name is required!'); }
		}

		static from({ id, name }: ClassroomPrisma) {
			return new Classroom({ id, name });
		}
	// end functions
}