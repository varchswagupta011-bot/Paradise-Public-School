import { Router, type IRouter } from "express";

type Subject = { id: string; name: string; teacher: string };
type Attendance = { present: number; absent: number; percentage: number };
type Result = { subject: string; score: number; grade: string };
type FeeSummary = { total: number; paid: number; due: number; nextDue: string };
type StudentRecord = {
  id: string;
  firstName: string;
  lastName: string;
  admissionNo: string;
  dateOfBirth: string;
  className: string;
  section: string;
  rollNumber: number;
  parentIds: string[];
  active: boolean;
  subjects: Subject[];
  attendance: Attendance;
  results: Result[];
  fees: FeeSummary;
};
type ParentRecord = {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  phone: string;
  occupation: string;
  studentIds: string[];
};

const subjects: Subject[] = [
  { id: "math", name: "Mathematics", teacher: "Rohan Mehta" },
  { id: "english", name: "English", teacher: "Priya Nair" },
  { id: "science", name: "Science", teacher: "Vikram Shah" },
  { id: "social", name: "Social Studies", teacher: "Maya Joseph" },
];

let parents: ParentRecord[] = [
  { id: "par-001", firstName: "Aarav", lastName: "Sharma", relationship: "Father", email: "aarav.sharma@example.com", phone: "+91 98765 12001", occupation: "Architect", studentIds: ["stu-001"] },
  { id: "par-002", firstName: "Nisha", lastName: "Rao", relationship: "Mother", email: "nisha.rao@example.com", phone: "+91 98765 12002", occupation: "Consultant", studentIds: ["stu-002", "stu-003"] },
  { id: "par-003", firstName: "Dev", lastName: "Kapoor", relationship: "Guardian", email: "dev.kapoor@example.com", phone: "+91 98765 12003", occupation: "Doctor", studentIds: ["stu-004"] },
];

let students: StudentRecord[] = [
  { id: "stu-001", firstName: "Ishaan", lastName: "Sharma", admissionNo: "PPS-2024-018", dateOfBirth: "2012-04-18", className: "Year 8", section: "A", rollNumber: 12, parentIds: ["par-001"], active: true, subjects, attendance: { present: 168, absent: 4, percentage: 97.7 }, results: [{ subject: "Mathematics", score: 92, grade: "A1" }, { subject: "English", score: 88, grade: "A2" }, { subject: "Science", score: 94, grade: "A1" }, { subject: "Social Studies", score: 86, grade: "A2" }], fees: { total: 145000, paid: 112000, due: 33000, nextDue: "15 Sep 2025" } },
  { id: "stu-002", firstName: "Anaya", lastName: "Rao", admissionNo: "PPS-2023-041", dateOfBirth: "2011-09-02", className: "Year 9", section: "B", rollNumber: 7, parentIds: ["par-002"], active: true, subjects, attendance: { present: 160, absent: 9, percentage: 94.7 }, results: [{ subject: "Mathematics", score: 84, grade: "A2" }, { subject: "English", score: 91, grade: "A1" }, { subject: "Science", score: 89, grade: "A2" }, { subject: "Social Studies", score: 93, grade: "A1" }], fees: { total: 145000, paid: 145000, due: 0, nextDue: "10 Jun 2026" } },
  { id: "stu-003", firstName: "Kabir", lastName: "Rao", admissionNo: "PPS-2025-006", dateOfBirth: "2015-01-27", className: "Year 5", section: "A", rollNumber: 19, parentIds: ["par-002"], active: true, subjects, attendance: { present: 164, absent: 5, percentage: 97 }, results: [{ subject: "Mathematics", score: 78, grade: "B1" }, { subject: "English", score: 86, grade: "A2" }, { subject: "Science", score: 82, grade: "A2" }, { subject: "Social Studies", score: 88, grade: "A2" }], fees: { total: 128000, paid: 96000, due: 32000, nextDue: "15 Sep 2025" } },
  { id: "stu-004", firstName: "Meera", lastName: "Kapoor", admissionNo: "PPS-2022-009", dateOfBirth: "2009-11-12", className: "Year 11", section: "A", rollNumber: 3, parentIds: ["par-003"], active: false, subjects, attendance: { present: 151, absent: 18, percentage: 89.3 }, results: [{ subject: "Mathematics", score: 95, grade: "A1" }, { subject: "English", score: 90, grade: "A1" }, { subject: "Science", score: 97, grade: "A1" }, { subject: "Social Studies", score: 92, grade: "A1" }], fees: { total: 165000, paid: 165000, due: 0, nextDue: "10 Jun 2026" } },
];

const parentView = (parent: ParentRecord) => ({
  ...parent,
  students: parent.studentIds.map((id) => students.find((student) => student.id === id)).filter(Boolean).map((student) => ({
    id: student!.id,
    name: `${student!.firstName} ${student!.lastName}`,
    className: student!.className,
    section: student!.section,
    feesDue: student!.fees.due,
  })),
});

const studentView = (student: StudentRecord) => ({
  ...student,
  parents: student.parentIds.map((id) => parents.find((parent) => parent.id === id)).filter(Boolean).map((parent) => ({
    id: parent!.id,
    name: `${parent!.firstName} ${parent!.lastName}`,
    relationship: parent!.relationship,
    phone: parent!.phone,
  })),
});

const syncStudentParents = (studentId: string, nextParentIds: string[]) => {
  parents = parents.map((parent) => ({
    ...parent,
    studentIds: nextParentIds.includes(parent.id)
      ? Array.from(new Set([...parent.studentIds, studentId]))
      : parent.studentIds.filter((id) => id !== studentId),
  }));
};

const syncParentStudents = (parentId: string, nextStudentIds: string[]) => {
  students = students.map((student) => ({
    ...student,
    parentIds: nextStudentIds.includes(student.id)
      ? Array.from(new Set([...student.parentIds, parentId]))
      : student.parentIds.filter((id) => id !== parentId),
  }));
};

const router: IRouter = Router();

router.get("/admin/summary", (_req, res) => {
  const feesCollected = students.reduce((sum, student) => sum + student.fees.paid, 0);
  const feesDue = students.reduce((sum, student) => sum + student.fees.due, 0);
  const attendanceRate = Math.round(students.reduce((sum, student) => sum + student.attendance.percentage, 0) / students.length * 10) / 10;
  res.json({ totalStudents: students.length, activeStudents: students.filter((student) => student.active).length, totalParents: parents.length, feesCollected, feesDue, attendanceRate });
});

router.get("/admin/students", (req, res) => {
  const search = String(req.query.search ?? "").toLowerCase();
  const status = String(req.query.status ?? "all");
  res.json(students.filter((student) => {
    const matchesSearch = !search || `${student.firstName} ${student.lastName} ${student.admissionNo} ${student.className}`.toLowerCase().includes(search);
    const matchesStatus = status === "all" || (status === "active" ? student.active : !student.active);
    return matchesSearch && matchesStatus;
  }).map(studentView));
});

router.post("/admin/students", (req, res) => {
  const student: StudentRecord = {
    id: `stu-${String(students.length + 1).padStart(3, "0")}`,
    ...req.body,
    subjects,
    attendance: { present: 0, absent: 0, percentage: 0 },
    results: [],
    fees: { total: 0, paid: 0, due: 0, nextDue: "Not scheduled" },
  };
  students = [...students, student];
  syncStudentParents(student.id, student.parentIds);
  res.status(201).json(studentView(student));
});

router.get("/admin/students/:studentId", (req, res) => {
  const student = students.find((item) => item.id === req.params.studentId);
  if (!student) return res.status(404).json({ message: "Student not found" });
  return res.json(studentView(student));
});

router.patch("/admin/students/:studentId", (req, res) => {
  const index = students.findIndex((item) => item.id === req.params.studentId);
  if (index < 0) return res.status(404).json({ message: "Student not found" });
  const previous = students[index];
  students[index] = { ...previous, ...req.body, id: previous.id, subjects: previous.subjects, attendance: previous.attendance, results: previous.results, fees: previous.fees };
  if (req.body.parentIds) syncStudentParents(previous.id, req.body.parentIds);
  return res.json(studentView(students[index]));
});

router.get("/admin/parents", (req, res) => {
  const search = String(req.query.search ?? "").toLowerCase();
  res.json(parents.filter((parent) => !search || `${parent.firstName} ${parent.lastName} ${parent.email} ${parent.phone}`.toLowerCase().includes(search)).map(parentView));
});

router.post("/admin/parents", (req, res) => {
  const parent: ParentRecord = { id: `par-${String(parents.length + 1).padStart(3, "0")}`, ...req.body };
  parents = [...parents, parent];
  syncParentStudents(parent.id, parent.studentIds);
  return res.status(201).json(parentView(parent));
});

router.patch("/admin/parents/:parentId", (req, res) => {
  const index = parents.findIndex((item) => item.id === req.params.parentId);
  if (index < 0) return res.status(404).json({ message: "Parent not found" });
  const previous = parents[index];
  parents[index] = { ...previous, ...req.body, id: previous.id };
  if (req.body.studentIds) syncParentStudents(previous.id, req.body.studentIds);
  return res.json(parentView(parents[index]));
});

export default router;