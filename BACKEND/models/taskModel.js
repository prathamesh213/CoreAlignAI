const mongoose = require('mongoose');


// Define the Task schema
const taskSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    },
    
    {
        text: {
            type: String,
            required: [true, 'Task text is required'],
        },
    },
    {
        timestamps: true, // This enables createdAt and updatedAt timestamps automatically
    }
);

module.exports = mongoose.model('Task', taskSchema);
