// frontend/src/components/InterviewDashboard.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterviews, deleteInterview } from "../Redux/interviewsSlice";
import InterviewForm from "./InterviewForm";
import { toast } from "react-toastify";

const InterviewDashboard = () => {
  const dispatch = useDispatch();
  const { interviews, loading, error } = useSelector(
    (state) => state.interviews
  );
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
      <h2 className="text-2xl font-bold mb-6">Scheduled Interviews</h2>

      <InterviewForm
        currentInterview={currentInterview}
        setCurrentInterview={setCurrentInterview}
      />

      {interviews.length === 0 ? (
        <p>No interviews scheduled.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">Candidate</th>
                <th className="py-3 px-6 text-left font-semibold">
                  Interviewer
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Date & Time
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Interview Type
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Email
                </th>
                <th className="flex flex-1 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {interviews.map((interview) => (
                <tr key={interview._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{interview.candidateName}</td>
                  <td className="py-3 px-6">{interview.interviewerName}</td>
                  <td className="py-3 px-6">
                    {new Date(interview.date).toLocaleString()}
                  </td> 
                  <td className="py-3 px-6">{interview.interviewType}</td>
                  <td className="py-3 px-6">{interview.email}</td> {/* Added email column */}
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition duration-200"
                      onClick={() => setCurrentInterview(interview)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                      onClick={() => handleDelete(interview._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InterviewDashboard;
