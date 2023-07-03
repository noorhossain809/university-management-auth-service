"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultySearchableFields = exports.facultyFilterableFields = exports.designation = exports.bloodGroup = exports.gender = void 0;
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.designation = ['Professor', 'Lecturer'];
exports.facultyFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
    'academicFaculty',
    'academicDepartment',
    'designation',
];
exports.facultySearchableFields = [
    'email',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
];
