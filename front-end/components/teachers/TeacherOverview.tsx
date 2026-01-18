import LearningPath from '@components/learning-path';
import { Teacher, User } from '@types';
import { useEffect, useState } from 'react';

type Props = {
  teachers: Teacher[];
  mutate: () => void;
};

const TeacherOverview: React.FC<Props> = ({ teachers, mutate }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
  }, []);

  return (
    <>
      <section className="mt-5">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Learning path</th>
            </tr>
          </thead>
          <tbody>

            {/* Render a row for each teacher containing name and learning path */}
            {/* For question 1.c, you can use the LearningPath component. */}
            {teachers
              .slice()
              .sort((a, b) => a.id - b.id)
              .map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.user.firstName} {teacher.user.lastName}</td>
                <td>
                  {loggedInUser?.role === "admin" ? (
                      <LearningPath teacherId={teacher.id} learningPath={teacher.learningPath} onUpdated={mutate} />
                    ) : (
                      teacher.learningPath
                    )
                  }
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </section>
    </>
  );
};

export default TeacherOverview;
