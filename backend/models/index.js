const mongoose = require("mongoose")

//connecting mongoose database
mongoose.connect("mongodb+srv://jaydeepmeena62:qzanQm5k3KPf4wlV@iiita-classroom.iy8hix9.mongodb.net/?retryWrites=true&w=majority&appName=IIITA-Classroom")
.then((response) =>{
    console.log("Database connected successfully")
})
.catch((error) => {
    console.log("Database not connected")
        
    
})

//Schemas

const CourseRecordSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    attendance: [{
        date: String,
        present: Boolean
    }],
    c1: [{
        quiz: Number,
        review: Number,
        assignment: Number
    }],
    c2: [{
        quiz: Number,
        review: Number,
        assignment: Number
    }],
    c3: [{
        quiz: Number,
        review: Number,
        assignment: Number
    }]
});

const CourseRecordSchema1 = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
});


const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rollno: { type: String, required: true },
    courses: [CourseRecordSchema],
    image: { type: String, required: false }
});



const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: { type: String, required: false }
})

const ProfessorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    id: String,
    image: { type: String, required: false },
    courses: [CourseRecordSchema1],
    teachingAssistant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
})

const CourseSchema = new mongoose.Schema({
    coursename: String,
    courseid: String,
    posts:[{
        author: { type: String, required: true },
        date: { type: Date, default: Date.now },
        content: { type: String, required: true },
        fileUrl: { type: String, required: false }
    }],
    professor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor'
    }]

})


const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    files: [{ type: String, required: false }], // URLs to files like PDFs
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' } // Reference to the Professor or TA
});

const SubmissionSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    submissionFile: { type: String, required: true }, // URL to the submitted file
    submittedOn: { type: Date, default: Date.now }
});

// Embedding assignments directly in the Course Schema
CourseSchema.add({
    assignments: [AssignmentSchema]
});

// Student Schema modified to include submissions
StudentSchema.add({
    submissions: [SubmissionSchema]
});


const Student = mongoose.model('Student', StudentSchema)
const Admin = mongoose.model("Admin",AdminSchema)
const Professor = mongoose.model("Professor",ProfessorSchema)
const Course = mongoose.model("Course",CourseSchema)
const Assignment = mongoose.model("Assignment", AssignmentSchema);
const Submission = mongoose.model("Submission", SubmissionSchema);


module.exports = {
    Student,
    Admin,
    Professor,
    Course,
    Assignment,
    Submission
}

