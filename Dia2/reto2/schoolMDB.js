const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  groups: [String]
});

const SubjectSchema   
 = new mongoose.Schema({
  title: String,
  teachers:   
 [{ firstName: String, lastName: String }]
});

const MarkSchema = new mongoose.Schema({
  date: Date,
  mark: Number,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }
});

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  marks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mark' }]
});

module.exports = {
  Teacher: mongoose.model("Teacher", TeacherSchema),
  Subject: mongoose.model("Subject", SubjectSchema),
  Mark: mongoose.model("Mark", MarkSchema),
  Student: mongoose.model("Student", StudentSchema)
};