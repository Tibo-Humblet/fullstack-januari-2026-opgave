import { Classroom } from '@types';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const getToken = ():string | null => {
  const storedToken = sessionStorage.getItem('loggedInUser');
  if (!storedToken) { return null; }
  try { return JSON.parse(storedToken) ?? null; } catch { return null; }
}

const createClassroom = (classroom: Classroom) => {
  return fetch(`${baseURL}/classrooms/admin/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken().token}`
    },
    body: JSON.stringify(classroom)
  });
}

const ClassroomService = {
  createClassroom
}

export default ClassroomService;