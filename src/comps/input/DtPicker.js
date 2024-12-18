import React, { useState } from 'react';
import { useImperativeHandle } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef } from 'react';

function extractDate(isoString) {
  console.log('extractDate', isoString);
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function extractTime(isoString) {
  const regex = /\b(\d{2}):(\d{2})\b/;
  const match = isoString.toString().match(regex);
  if (match) {
    const time = match[0];
    return time;
  } else {
    return isoString;
  }
}

const TDatePicker = forwardRef(({ disabled }, ref) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getVal = () => {
    return extractDate(selectedDate);
  };

  const setVal = (v) => {
    setSelectedDate(extractDate(v));
  };

  useImperativeHandle(ref, () => ({
    getVal,
    setVal,
  }));

  return (
    <div className='flex flex-col items-start space-y-4 p-4'>
      <label htmlFor='date-picker' className='text-sm text-custom-c4'>
        Birth Date:
      </label>
      <DatePicker
        id='date-picker'
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat='dd/MM/yyyy'
        placeholderText='dd/mm/yyyy'
        className={`w-full py-4 border text-sm placeholder-custom-c4 bg-custom-c1 border-custom-c4 rounded-sm focus:custom-c2 focus:custom-c2 focus:custom-c2 focus:custom-c2 text-custom-c4 ${
          disabled
            ? 'bg-[#3a1f2b] text-[#a0a0a0] border-[#3a1f2b] cursor-not-allowed'
            : ''
        }`}
        calendarClassName='bg-white rounded-lg shadow-lg border border-gray-200'
        maxDate={maxDate}
        showYearDropdown
        scrollableYearDropdown
        showMonthDropdown
        required
        dayClassName={(date) =>
          'text-center py-1 hover:bg-blue-100 rounded-full transition-colors'
        }
        wrapperClassName='w-full'
        popperClassName='z-50'
        disabled={disabled}
      />
    </div>
  );
});

const TTimePicker = forwardRef(({ disabled }, ref) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const getVal = () => {
    console.log('et ', extractTime(selectedTime));
    return extractTime(selectedTime);
  };

  const setVal = (v) => {
    setSelectedTime(v);
  };

  useImperativeHandle(ref, () => ({
    getVal,
    setVal,
  }));

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className='flex flex-col items-start space-y-4 p-4'>
      <label htmlFor='time-only-picker' className='text-sm text-custom-c4'>
        Birth Time:
      </label>
      <DatePicker
        id='time-only-picker'
        selected={selectedTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly // Restricts to time-only selection
        timeIntervals={1} // Time intervals (e.g., every 15 minutes)
        timeCaption='Time' // Caption for the time picker
        dateFormat='h:mm aa' // Format for displaying the time
        placeholderText='hh:mm'
        required
        className={`w-full py-4 border text-sm placeholder-custom-c4 bg-custom-c1 border-custom-c4 rounded-sm focus:custom-c2 focus:custom-c2 focus:custom-c2 focus:custom-c2 text-custom-c4 ${
          disabled
            ? 'bg-[#3a1f2b] text-[#a0a0a0] border-[#3a1f2b] cursor-not-allowed'
            : ''
        }`}
        disabled={disabled}
      />
    </div>
  );
});

export { TDatePicker, TTimePicker };


