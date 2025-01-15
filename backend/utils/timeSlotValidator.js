import Interview from '../models/Interview.js';

const validateTimeSlot = async (interviewerName, candidateName, date, timeSlot) => {
  const conflictingInterview = await Interview.findOne({
    $or: [
      { interviewerName, date, timeSlot },
      { candidateName, date, timeSlot },
    ],
  });

  return conflictingInterview ? true : false;
};

export default validateTimeSlot;

