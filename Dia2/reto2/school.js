const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    title: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
});

const TeacherSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    groups: [String],
    subjects: [SubjectSchema]
});

const StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }]
});

const MarkSchema = new mongoose.Schema({
    date: Date,
    mark: Number,
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }
});

module.exports = {
    Teacher: mongoose.model("Teacher", TeacherSchema),
    Subject: mongoose.model("Subject", SubjectSchema),
    Student: mongoose.model("Student", StudentSchema),
    Mark: mongoose.model("Mark", MarkSchema)
};
