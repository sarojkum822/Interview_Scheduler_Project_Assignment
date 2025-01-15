// backend/controllers/interviewController.js
import Interview from '../models/Interview.js';
import validateTimeSlot from '../utils/timeSlotValidator.js';
// backend/controllers/interviewController.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL, // Replace with your email environment variable
    pass: process.env.EMAIL_PASSWORD // Replace with your email password environment variable
  }
});

// Function to send email notifications with HTML format
const sendEmailNotification = async (subject, message, recipient) => {
  try {
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #2d87f0;">Interview Scheduled</h2>
          <p><strong>Candidate:</strong> ${message.candidateName}</p>
          <p><strong>Interview Date:</strong> ${new Date(message.date).toLocaleString()}</p>
          <p><strong>Time Slot:</strong> ${message.timeSlot}</p>
          <p><strong>Interview Type:</strong> ${message.interviewType}</p>
          <p>We look forward to your interview!</p>
          <footer style="font-size: 0.9em; color: #888;">
            <p>Best regards,<br/>Interview Scheduler Team</p>
          </footer>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: '"Interview Scheduler" <saroj0406is@gmail.com>', // Sender info
      to: recipient, // Recipient email
      subject: subject, // Email subject
      html: emailContent // Email body in HTML format
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};


// Create Interview
const createInterview = async (req, res) => {
  const { candidateName, interviewerName, date, timeSlot, interviewType, email } = req.body;

  try {
    const conflict = await validateTimeSlot(interviewerName, candidateName, date, timeSlot);
    if (conflict) return res.status(400).json({ message: 'Time slot conflict detected' });

    const interview = new Interview({ candidateName, interviewerName, date, timeSlot, interviewType,email });
    await interview.save();

    const subject = 'Interview Scheduled';
    const message = `An interview has been scheduled with ${candidateName} for ${date} at ${timeSlot}. Interview Type: ${interviewType}.`;
    await sendEmailNotification(subject, message, email); // Send email to the student

    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Fetch All Interviews
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Interview
const updateInterview = async (req, res) => {
  const { id } = req.params;
  const { candidateName, interviewerName, date, timeSlot, interviewType, email } = req.body;

  try {
    const conflict = await validateTimeSlot(interviewerName, candidateName, date, timeSlot);
    if (conflict) return res.status(400).json({ message: 'Time slot conflict detected' });

    const updatedInterview = await Interview.findByIdAndUpdate(id, { candidateName, interviewerName, date, timeSlot, interviewType }, { new: true });
    if (!updatedInterview) return res.status(404).json({ message: 'Interview not found' });

    const subject = 'Interview Rescheduled';
    const message = `The interview with ${candidateName} has been rescheduled to ${date} at ${timeSlot}. Interview Type: ${interviewType}.`;
    await sendEmailNotification(subject, message, email); // Send email to the student

    res.status(200).json(updatedInterview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Interview
const deleteInterview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInterview = await Interview.findByIdAndDelete(id);

    if (!deletedInterview) return res.status(404).json({ message: 'Interview not found' });

    // Send email notification
    const subject = 'Interview Cancelled';
    const message = `The interview has been cancelled.`;
    await sendEmailNotification(subject, message, deletedInterview.email); // Assuming email is saved in the interview

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createInterview, getInterviews, updateInterview, deleteInterview };
