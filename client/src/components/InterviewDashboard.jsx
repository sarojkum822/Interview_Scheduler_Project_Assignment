// frontend/src/components/InterviewDashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterviews, deleteInterview } from '../Redux/interviewsSlice';
import InterviewForm from './InterviewForm';
import { toast } from 'react-toastify';

const InterviewDashboard = () => {
    const dispatch = useDispatch();
    const { interviews, loading, error } = useSelector((state) => state.interviews);
    const [currentInterview, setCurrentInterview] = useState(null);

    useEffect(() => {
        dispatch(fetchInterviews());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteInterview(id))
            .then(() => {
                toast.success("Delete Successful");
            })
            .catch(() => {
                toast.error("Failed to delete interview");
            });
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="p-4 m-2">
            <h2 className="text-2xl font-bold mb-4">Scheduled Interviews</h2>
            
            {interviews.length === 0 ? (
                <p>No interviews scheduled.</p>
            ) : (
                <ul className="space-y-2">
                    {interviews.map(interview => (
                        <li key={interview._id} className="flex justify-between items-center p-2 border rounded shadow">
                            <div>
                                {interview.candidateName} - {interview.interviewerName} on {new Date(interview.date).toLocaleString()} ({interview.interviewType})
                            </div>
                            <div>
                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => setCurrentInterview(interview)}>Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(interview._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <InterviewForm currentInterview={currentInterview} setCurrentInterview={setCurrentInterview} />
        </div>
    );
};

export default InterviewDashboard;