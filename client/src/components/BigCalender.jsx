// frontend/src/components/SimpleCalendar.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { fetchInterviews, updateInterview } from '../Redux/interviewsSlice';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { toast } from 'react-toastify';
import TimeZoneSelector from './TimeZoneSelector';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const SimpleCalendar = ({ setCurrentInterview }) => {
    const dispatch = useDispatch();
    const interviews = useSelector((state) => state.interviews.interviews);
    const loading = useSelector((state) => state.interviews.loading);
    const [selectedTimeZone, setSelectedTimeZone] = useState(moment.tz.guess());

    useEffect(() => {
        dispatch(fetchInterviews());
    }, [dispatch]);

    const convertToTimeZone = (date, fromTimeZone, toTimeZone) => {
        return moment.tz(date, fromTimeZone).tz(toTimeZone);
    };

    const handleSelectEvent = (event) => {
        setCurrentInterview(event);
    };

    const handleSelectSlot = ({ start, end }) => {
        setCurrentInterview({
            candidateName: '',
            interviewerName: '',
            date: start,
            timeSlot: '',
            interviewType: '',
            timeZone: selectedTimeZone
        });
    };

    const moveEvent = async ({ event, start, end }) => {
        const updatedEvent = {
            ...event,
            date: start,
            end
        };

        try {
            await dispatch(updateInterview({ 
                id: event._id, 
                updatedInterview: updatedEvent 
            })).unwrap();
            toast.success("Interview rescheduled successfully");
        } catch (error) {
            console.error('Update failed:', error);
            toast.error("Failed to reschedule interview");
            // Refresh the calendar to restore the original state
            dispatch(fetchInterviews());
        }
    };

    const resizeEvent = async ({ event, start, end }) => {
        const updatedEvent = {
            ...event,
            date: start,
            end
        };

        try {
            await dispatch(updateInterview({ 
                id: event._id, 
                updatedInterview: updatedEvent 
            })).unwrap();
            toast.success("Interview duration updated successfully");
        } catch (error) {
            console.error('Resize failed:', error);
            toast.error("Failed to update interview duration");
            dispatch(fetchInterviews());
        }
    };

    const events = interviews.map(interview => ({
        ...interview,
        start: convertToTimeZone(interview.date, interview.timeZone || 'UTC', selectedTimeZone).toDate(),
        end: convertToTimeZone(interview.date, interview.timeZone || 'UTC', selectedTimeZone)
            .add(1, 'hour')
            .toDate(),
        title: `${interview.candidateName} - ${interview.interviewType}`
    }));

    return (
        <div className="calendar-container">
            <h2 className="text-2xl font-bold mb-4">Interview Schedule</h2>
            <TimeZoneSelector
                selectedTimeZone={selectedTimeZone}
                onTimeZoneChange={setSelectedTimeZone}
            />
            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                <DnDCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    onEventDrop={moveEvent}
                    onEventResize={resizeEvent}
                    selectable
                    resizable
                    defaultView="month"
                    views={['month', 'week', 'day']}
                    step={30}
                    timeslots={2}
                    min={moment().startOf('day').add(8, 'hours').toDate()}
                    max={moment().startOf('day').add(20, 'hours').toDate()}
                />
            )}
        </div>
    );
};

export default SimpleCalendar;