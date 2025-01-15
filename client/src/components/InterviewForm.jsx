// frontend/src/components/InterviewForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addInterview, updateInterview } from '../Redux/interviewsSlice';
import { toast } from 'react-toastify';

const InterviewForm = ({ currentInterview, setCurrentInterview }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        candidateName: '',
        interviewerName: '',
        date: '',
        timeSlot: '',
        interviewType: '',
        email: '' // Add email field to the form data
    });

    useEffect(() => {
        if (currentInterview) {
            setFormData(currentInterview);
        } else {
            setFormData({
                candidateName: '',
                interviewerName: '',
                date: '',
                timeSlot: '',
                interviewType: '',
                email: '' // Reset email if editing
            });
        }
    }, [currentInterview]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentInterview) {
            dispatch(updateInterview({ id: currentInterview._id, updatedInterview: formData }))
                .then(() => {
                    toast.success("Interview updated successfully");
                })
                .catch(() => {
                    toast.error("Failed to update interview");
                });
        } else {
            dispatch(addInterview(formData))
                .then(() => {
                    toast.success("Interview scheduled successfully");
                })
                .catch(() => {
                    toast.error("Failed to schedule interview");
                });
        }
        setCurrentInterview(null);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center space-x-2 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mr-4">
                {currentInterview ? 'Edit Interview' : 'Schedule Interview'}
            </h2>
            <input
                type="text"
                name="candidateName"
                placeholder="Candidate Name"
                value={formData.candidateName}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-40 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="interviewerName"
                placeholder="Interviewer Name"
                value={formData.interviewerName}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-40 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-52 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="timeSlot"
                placeholder="Time Slot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-40 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-40 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select Interview Type</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Behavioral">Behavioral</option>
            </select>
            {/* New email input field */}
            <input
                type="email"
                name="email"
                placeholder="Candidate Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-52 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 ml-2"
            >
                {currentInterview ? 'Update Interview' : 'Schedule Interview'}
            </button>
        </form>
    );
};

export default InterviewForm;
