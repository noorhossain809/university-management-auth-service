"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterController = void 0;
const academicSemester_service_1 = require("./academicSemester.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationFields_1 = require("../../../constains/paginationFields");
const createSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterData = __rest(req.body, []);
    const result = yield academicSemester_service_1.AcademicSemesterService.createSemester(academicSemesterData);
    // res.status(200).json({
    //   status: 'success',
    //   message: 'Academic semester is created successfully!',
    //   data: result,
    // });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Semester created successfully!',
        data: result,
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
    });
}));
const getAllSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const filters = (0, pick_1.default)(req.query, ['searchTerm', 'title', 'code', 'year']);
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    console.log(paginationOptions);
    const result = yield academicSemester_service_1.AcademicSemesterService.getAllSemester(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Semester retrieve successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicSemester_service_1.AcademicSemesterService.singleSemester(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Single Semester retrieve successfully',
        data: result,
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
    });
}));
const updateSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    console.log('updateData', updateData);
    const result = yield academicSemester_service_1.AcademicSemesterService.updateSemester(id, updateData);
    console.log('result', result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Semester Updated Successfully!',
        data: result,
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
    });
}));
const deleteSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicSemester_service_1.AcademicSemesterService.deleteSemester(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Semester deleted successfully!',
        data: result,
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
    });
}));
exports.AcademicSemesterController = {
    createSemester,
    getAllSemester,
    getSingleSemester,
    updateSemester,
    deleteSemester,
};
// 01731927209
