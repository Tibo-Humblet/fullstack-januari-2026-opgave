import { User } from './user';
import { Teacher as TeacherPrisma, User as UserPrisma } from '@prisma/client';

export class Teacher {
    readonly id?: number;
    readonly user: User;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly learningPath: string;

    constructor(teacher: {
        id?: number;
        user: User;
        createdAt?: Date;
        updatedAt?: Date;
        learningPath: string;
    }) {
        this.validate(teacher);

        this.id = teacher.id;
        this.user = teacher.user;
        this.createdAt = teacher.createdAt;
        this.updatedAt = teacher.updatedAt;
        this.learningPath = teacher.learningPath;
    }

    // start getters
        getId(): number | undefined { return this.id; }
        getUser(): User { return this.user; }
        getCreatedAt(): Date { return this.createdAt; }
        getUpdatedAt(): Date { return this.createdAt; }
        getLearningPath(): string { return this.learningPath; }
    // end getters

    // start functions
        validate(teacher: { user: User; learningPath: string; }) {
            if (!teacher.user) { throw new Error('user is required'); }
            if (!teacher.learningPath) { throw new Error('learningPath of theacher is required'); }
        }
    // end functions

    static from({id, createdAt, updatedAt, learningPath, user}: TeacherPrisma & { user: UserPrisma; }) {
        return new Teacher({
            id: id,
            createdAt: createdAt,
            updatedAt: updatedAt,
            learningPath: learningPath,
            user: User.from(user),
        });
    }
}
