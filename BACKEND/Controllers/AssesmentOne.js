const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const AssessmentResult = require('../models/AssesmentOneResult');           

/////////////Maping the result to loged in user///////////////////////
const mapResultToUser = asyncHandler(async (req, res) => {
    const { userId } = req.user; // Assuming req.user contains the logged-in user's ID
    const { results } = req.body; // Assuming results is an object containing the scores

    if (!results) {
        res.status(400);
        throw new Error('Results are required');
    }

    try {
        const assessmentResult = await AssessmentResult.create({
            userId,
            results
        });

        res.status(201).json({
            message: 'Results mapped successfully',
            assessmentResult
        });
    } catch (error) {
        res.status(500);
        throw new Error('Error mapping results to user');
    }
});

exports = {
    mapResultToUser
};