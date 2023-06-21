import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const userIdCounter = 0; // Initial user ID counter

// student
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: -1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generatedStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementId}`;
  console.log(incrementId);
  return incrementId;
};

// faculty

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    { role: 'faculty' },
    { id: -1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generatedFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};

// Admin
// export const findLastAdminId = async (): Promise<string | undefined> => {
//   const lastAdmin = await User.findOne({ role: 'admin' }, { id: -1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean();

//   return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
// };

// export const generatedAdminId = async (): Promise<string> => {
//   const currentId =
//     (await findLastAdminId()) || (0).toString().padStart(5, '0');
//   let incrementById = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementById = `A-${incrementById}`;
//   return incrementById;
// };

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
