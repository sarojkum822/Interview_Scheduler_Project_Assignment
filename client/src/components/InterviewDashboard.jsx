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
  const [showForm, setShowForm] = useState(true); // State to toggle form visibility

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

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4 m-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Interview Dashboard</h2>
        <a
          href="/simplecalender"
          className="border-2 p-2 rounded-md flex items-center justify-center m-2 px-2 bg-sky-600 hover:bg-sky-700 text-white"
        >
          Calendar View
        </a>
      </div>

      {/* Toggle Button */}
      <button
        className={`mb-4 px-4 py-2 rounded ${
          showForm ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        } text-white transition duration-200`}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Show Form"}
      </button>

      {/* Conditionally Render Form */}
      {showForm && (
        <InterviewForm
          currentInterview={currentInterview}
          setCurrentInterview={setCurrentInterview}
        />
      )}

      <h2 className="text-2xl font-bold mb-6">Scheduled Interviews</h2>
      {interviews.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No interviews scheduled.
        </p>
      ) : (
        <>
          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">
                    Candidate
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Interviewer
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Date & Time
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Type</th>
                  <th className="py-3 px-4 text-left font-semibold">Email</th>
                  <th className="py-3 px-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {interviews.map((interview) => (
                  <tr
                    key={interview._id}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">{interview.candidateName}</td>
                    <td className="py-3 px-4">{interview.interviewerName}</td>
                    <td className="py-3 px-4">
                      {new Date(interview.date).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">{interview.interviewType}</td>
                    <td className="py-3 px-4">{interview.email}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition duration-200"
                        onClick={() => setCurrentInterview(interview)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
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

          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview._id}
                className="bg-white rounded-lg shadow-md p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="font-semibold text-lg">
                    {interview.candidateName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {interview.interviewType}
                  </div>
                </div>

                <div className="text-sm space-y-1">
                  <div>
                    <span className="font-medium">Interviewer: </span>
                    {interview.interviewerName}
                  </div>
                  <div>
                    <span className="font-medium">Date & Time: </span>
                    {new Date(interview.date).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Email: </span>
                    {interview.email}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition duration-200"
                    onClick={() => setCurrentInterview(interview)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition duration-200"
                    onClick={() => handleDelete(interview._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewDashboard;
