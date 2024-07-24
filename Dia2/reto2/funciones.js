const mongoose = require("mongoose");
const { Teacher, Subject, Student, Mark } = require("./school");

const uri = "mongodb+srv://Queen:Qu33n@cluster0.avrecto.mongodb.net/school?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a DB');
    })
    .catch(error => {
        console.log(error);
    });

const createData = async () => {
    let teacher1 = new Teacher({ firstName: 'Juan', lastName: 'Pérez', groups: ['A', 'B'] });
    let teacher2 = new Teacher({ firstName: 'María', lastName: 'Gómez', groups: ['B', 'C'] });

    let subject1 = new Subject({ title: 'Matemáticas', teacher: teacher1._id });
    let subject2 = new Subject({ title: 'Ciencias', teacher: teacher2._id });

    let student1 = new Student({ firstName: 'Ana', lastName: 'López', subjects: [subject1._id, subject2._id] });
    let student2 = new Student({ firstName: 'Pedro', lastName: 'Martínez', subjects: [subject1._id, subject2._id] });

    let mark1 = new Mark({ date: new Date(), mark: 8, student: student1._id, subject: subject1._id });
    let mark2 = new Mark({ date: new Date(), mark: 6, student: student1._id, subject: subject2._id });
    let mark3 = new Mark({ date: new Date(), mark: 7, student: student2._id, subject: subject1._id });
    let mark4 = new Mark({ date: new Date(), mark: 4, student: student2._id, subject: subject2._id });


    try {
        await teacher1.save();
        console.log("Teacher1 guardado");
        await teacher2.save();
        console.log("Teacher2 guardado");
        await subject1.save();
        console.log("Subject1 guardado");
        await subject2.save();
        console.log("Subject2 guardado");
        await student1.save();
        console.log("Student1 guardado");
        await student2.save();
        console.log("Student2 guardado");
        await mark1.save();
        console.log("Mark1 guardado");
        await mark2.save();
        console.log("Mark2 guardado");
        await mark3.save();
        console.log("Mark3 guardado");
        await mark4.save();
        console.log("Mark4 guardado");
    } catch (error) {
        console.log(error);
    }
};

const getMarksOfStudent = async (studentName) => {
    const student = await Student.findOne({ firstName: studentName }).populate('subjects');
    const marks = await Mark.find({ student: student._id }).populate('subject');
    console.log(`Notas de ${studentName}:`, marks);
};

const getSubjectsOfStudent = async (studentName) => {
    const student = await Student.findOne({ firstName: studentName }).populate('subjects');
    console.log(`Asignaturas de ${studentName}:`, student.subjects);
};

const getTeachersOfStudent = async (studentName) => {
    const student = await Student.findOne({ firstName: studentName }).populate({
        path: 'subjects',
        populate: { path: 'teacher' }
    });
    const teachers = student.subjects.map(subject => subject.teacher);
    console.log(`Profesores de ${studentName}:`, teachers);
};

module.exports = {
    createData,
    getMarksOfStudent,
    getSubjectsOfStudent,
    getTeachersOfStudent
};
