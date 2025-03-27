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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatientService = exports.updatePatientService = exports.createPatientService = exports.getPatientByEmailService = exports.getPatientByIdService = exports.getAllPatientsService = void 0;
const database_1 = require("../config/database");
const schema_registry_1 = require("../schemas/schema.registry");
const getAllPatientsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield database_1.prisma.patient.findMany({
        include: {
            medicalRecords: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
            appointments: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    return patients.map(patient => schema_registry_1.patientSchema.parse(patient));
});
exports.getAllPatientsService = getAllPatientsService;
const getPatientByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield database_1.prisma.patient.findUnique({
        where: { id },
        include: {
            medicalRecords: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
            appointments: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    return patient ? schema_registry_1.patientSchema.parse(patient) : null;
});
exports.getPatientByIdService = getPatientByIdService;
const getPatientByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield database_1.prisma.patient.findUnique({
        where: { email },
        include: {
            medicalRecords: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
            appointments: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    return patient ? schema_registry_1.patientSchema.parse(patient) : null;
});
exports.getPatientByEmailService = getPatientByEmailService;
const createPatientService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = schema_registry_1.patientCreateSchema.parse(data);
    // Convert string date to Date object if needed
    const dateOfBirth = typeof validatedData.dateOfBirth === 'string'
        ? new Date(validatedData.dateOfBirth)
        : validatedData.dateOfBirth;
    const patient = yield database_1.prisma.patient.create({
        data: Object.assign(Object.assign({}, validatedData), { dateOfBirth }),
        include: {
            medicalRecords: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
            appointments: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    return schema_registry_1.patientSchema.parse(patient);
});
exports.createPatientService = createPatientService;
const updatePatientService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = schema_registry_1.patientUpdateSchema.parse(data);
    // Convert string date to Date object if needed
    let updateData = Object.assign({}, validatedData);
    if (validatedData.dateOfBirth) {
        updateData.dateOfBirth = typeof validatedData.dateOfBirth === 'string'
            ? new Date(validatedData.dateOfBirth)
            : validatedData.dateOfBirth;
    }
    const patient = yield database_1.prisma.patient.update({
        where: { id },
        data: updateData,
        include: {
            medicalRecords: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
            appointments: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    return schema_registry_1.patientSchema.parse(patient);
});
exports.updatePatientService = updatePatientService;
const deletePatientService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield database_1.prisma.patient.delete({
        where: { id },
        include: {
            medicalRecords: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
            appointments: {
                include: {
                    doctor: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    return schema_registry_1.patientSchema.parse(patient);
});
exports.deletePatientService = deletePatientService;
