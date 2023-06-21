import express from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicFaculty.route';
import { StudentRoute } from '../modules/student/student.route';
import { FacultyRoute } from '../modules/faculty/faculty.routes';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { AdminRoutes } from '../modules/admin/admin.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/facultys',
    route: FacultyRoute,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/users', UserRoute);
// router.use('/academic-semesters', AcademicSemesterRoute);

export default router;
