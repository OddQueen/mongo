const mongoose = require("mongoose");
const { Teacher, Subject, Student, Mark } = require("./schoolMDB");

const uri = "mongodb+srv://Queen:Qu33n@cluster0.avrecto.mongodb.net/school?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log('Conectado a DB');
  })
  .catch(error => {
    console.log(error);
  });

const createData = async () => {
  let teacher1 = new Teacher({ firstName: 'Juan', lastName: 'Pérez', groups: ['A', 'B'] });
  let teacher2 = new Teacher({ firstName: 'María', lastName: 'Gómez', groups: ['B', 'C'] });
 
  await teacher1.save();
  await teacher2.save();
 
  let subject1 = new Subject({ title: 'Matemáticas', teachers: [{ firstName: 'Juan', lastName: 'Pérez' }] });
  let subject2 = new Subject({ title: 'Ciencias', teachers: [{ firstName: 'María', lastName: 'Gómez' }] });
 
  await subject1.save();
  await subject2.save();
 
  let mark1 = new Mark({ date: new Date(), mark: 8, subject: subject1._id });
  let mark2 = new Mark({ date: new Date(), mark: 6, subject: subject2._id });
  let mark3 = new Mark({ date: new Date(), mark: 7, subject: subject1._id });
  let mark4 = new Mark({ date: new Date(), mark: 4, subject: subject2._id });
 
  await mark1.save();
  await mark2.save();
  await mark3.save();
  await mark4.save();

  let student1 = new Student({ firstName: 'Ana', lastName: 'López', marks: [mark1._id, mark2._id] });
  let student2 = new Student({ firstName: 'Pedro', lastName: 'Martínez', marks: [mark3._id, mark4._id] });

  await student1.save();
  await student2.save();
    
  };

  const getMarksOfStudent = async (studentName) => {
    const student = await Student.findOne({ firstName: studentName }).populate({
      path: 'marks',
      populate: { path: 'subject' }
    });
  
    if (student) {
      const marks = student.marks.map(mark => `${mark.subject.title} ${mark.mark}`);
      console.log(`Notas de ${studentName}:`, marks);
    } else {
      console.log(`Estudiante ${studentName} no encontrado.`);
    }
  };

const getSubjectsOfStudent = async (studentName) => {
    const student = await Student.findOne({ firstName: studentName }).populate({
        path: 'marks',
        populate: { path: 'subject' }
    });
    const subjects = student ? student.marks.map(mark => mark.subject.title) : [];
    console.log(`Asignaturas de ${studentName}:`, subjects);
};

const getTeachersOfStudent = async (studentName) => {
    const student = await Student.findOne({ firstName: studentName }).populate({
        path: 'marks',
        populate: {
            path: 'subject',
            populate: { path: 'teachers' }
        }
    });
    const teachers = student ? student.marks.map(mark => mark.subject.teachers.map(teacher => `${teacher.firstName} ${teacher.lastName}`)).flat() : [];
    console.log(`Profesores de ${studentName}:`, teachers);
};


module.exports = {
createData,
getMarksOfStudent,
getSubjectsOfStudent,
getTeachersOfStudent
};
