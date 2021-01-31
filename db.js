import mongoose from 'mongoose'

const EmpolyeeDB = mongoose.Schema(
    {
        emp_id : Number,
        firstname : String,
        lastname : String,
        email : String,
        salary : Number
    }
)
export default mongoose.model('empolyeedatabases',EmpolyeeDB)