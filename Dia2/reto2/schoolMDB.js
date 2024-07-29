const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  groups: [String]
});

const SubjectSchema = new mongoose.Schema({
  title: String,
  teachers: [TeacherSchema] 
});

const MarkSchema = new mongoose.Schema({
  date: Date,
  mark: Number,
  subject: SubjectSchema 
});

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  marks: [MarkSchema]
});

module.exports = {
  Teacher: mongoose.model("Teacher", TeacherSchema),
  Subject: mongoose.model("Subject", SubjectSchema),
  Mark: mongoose.model("Mark", MarkSchema),
  Student: mongoose.model("Student", StudentSchema)
};
