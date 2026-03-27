import React from 'react';
import ScheduleDayPage from '@/pages/schedule/ScheduleDayPage';

const scheduleEvents = [
  { id: 1, name: 'DPL', location: 'LIBRARY', time: '9 AM' },
  { id: 2, name: 'ESCAPE ROOM', location: '509 AND 511', time: '9 AM' },
  { id: 3, name: 'BRAINIAC', location: '402 AND 409', time: '9 AM' },
  { id: 4, name: 'CODE OF LIES', location: '5TH FLOOR LABS', time: '10 AM' },
];

function ScheduleDay2Page() {
  return <ScheduleDayPage dayLabel="28th March" scheduleEvents={scheduleEvents} />;
}

export default ScheduleDay2Page;
