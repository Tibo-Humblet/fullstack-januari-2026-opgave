const baseURL = process.env.NEXT_PUBLIC_API_URL;

const getToken = ():string | null => {
  const storedToken = sessionStorage.getItem('loggedInUser');
  if (!storedToken) { return null; }
  try { return JSON.parse(storedToken) ?? null; } catch { return null; }
}

const getAllTeachers = () => {
  /*
    Call the back-end API on the route /teachers to get all teachers.
    You will need to implement that route in the back-end.
  */
  return fetch(`${baseURL}/teachers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const updateLearningPath = (teacherId: number, learningPath: string) => {
  /*
    Call the back-end API on the route /teachers/:id/learningpath to update the learning path for the teacher.
    You will need to implement that route in the back-end.
  */
  return fetch(`${baseURL}/teachers/${teacherId}/learningpath?learningPath=${encodeURIComponent(learningPath)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken().token}`
    }
  })
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
