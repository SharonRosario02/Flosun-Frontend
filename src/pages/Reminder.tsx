import React, { useState } from 'react';
import axios from '../../backendService';

const Reminder = () => {
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reminderDateObj = new Date(reminderDate); // Convert the date string to a Date object
      const response = await axios.post('/api/reminder', {
        email,
        eventName,
        date: reminderDateObj, // Include the `date` field with the Date object
      });
      console.log(response.data);
      // Reset form fields if needed
      setEmail('');
      setEventName('');
      setReminderDate('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center align-center mt-16">
      <div
        style={{ width: '520px' }}
        className=" border border-black rounded-xl"
      >
        <div className="w-full md:border-r pb-10 xl:border-b-[0px] border-b">
          <div className="py-10 px-4 md:p-10 flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold ">Set Reminders</h1>

            <p className="text-sm">
              Email Reminders will help you remember to offer beautiful flowers
              from Flosun for Valentines Day, Mothers Day, Christmas... Reminds
              you 7 days before. No spam or sharing your address.
            </p>

            <input
              type="text"
              className="px-5 py-3 border border-gray-300 w-full rounded"
              placeholder="sample@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="px-5 py-3 border border-gray-300 w-full rounded"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <input
              type="datetime-local"
              className="px-5 py-3 border border-gray-300 w-full rounded"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
            />

            <button
              className="rounded-xl w-full uppercase px-5 py-3 bg-black text-white transition-all border-x border-black hover:bg-gray-700 hover:text-white"
              onClick={handleSubmit}
            >
              SET REMINDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminder;