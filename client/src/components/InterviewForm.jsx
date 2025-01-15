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
        email: ''
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
                email: ''
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

    const inputClassName = "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";

    return (
        <div className="mb-6 mt-4">
            <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                    {currentInterview ? 'Edit Interview' : 'Schedule Interview'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Candidate Name
                        </label>
                        <input
                            type="text"
                            name="candidateName"
                            placeholder="Enter candidate name"
                            value={formData.candidateName}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Interviewer Name
                        </label>
                        <input
                            type="text"
                            name="interviewerName"
                            placeholder="Enter interviewer name"
                            value={formData.interviewerName}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Time Slot
                        </label>
                        <input
                            type="text"
                            name="timeSlot"
                            placeholder="e.g., 2:00 PM - 3:00 PM"
                            value={formData.timeSlot}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Interview Type
                        </label>
                        <select
                            name="interviewType"
                            value={formData.interviewType}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                        >
                            <option value="">Select type</option>
                            <option value="Technical">Technical</option>
                            <option value="HR">HR</option>
                            <option value="Behavioral">Behavioral</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Candidate Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter candidate email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 w-full md:w-auto"
                    >
                        {currentInterview ? 'Update Interview' : 'Schedule Interview'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InterviewForm;