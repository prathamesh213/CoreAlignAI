const mongoose = require('mongoose');

const AssessmentResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    results: { // Object to store Belbin Role scores
        CO: { type: Number, default: 0 },
        SH: { type: Number, default: 0 },
        PL: { type: Number, default: 0 },
        ME: { type: Number, default: 0 },
        IMP: { type: Number, default: 0 },
        TW: { type: Number, default: 0 },
        RI: { type: Number, default: 0 },
        CF: { type: Number, default: 0 },
        SP: { type: Number, default: 0 },
    },
    assessmentDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AssessmentResult', AssessmentResultSchema);
