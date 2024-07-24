const { createData, getMarksOfStudent, getSubjectsOfStudent, getTeachersOfStudent } = require("./funciones");

const main = async () => {
    await createData();
    await getMarksOfStudent('Ana');
    await getSubjectsOfStudent('Pedro');
    await getTeachersOfStudent('Ana');
};

main().catch(err => console.error('Error', err));
