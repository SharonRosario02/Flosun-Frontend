import React, { useEffect, useState } from 'react';
import axios from '../../backendService.js';
import { Fieldset } from 'primereact/fieldset';
import { Avatar } from 'primereact/avatar';
import IconTrashLines from '../icons/icon-trash-lines.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface Feedback {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const colorMap: Record<string, string> = {
  A: '#FF6B6B', B: '#FFD93D', C: '#6BCB77', D: '#4D96FF', E: '#9B59B6',
  F: '#FF8C00', G: '#1ABC9C', H: '#E74C3C', I: '#16A085', J: '#F1C40F',
  K: '#8E44AD', L: '#3498DB', M: '#2ECC71', N: '#9B59B6', O: '#34495E',
  P: '#8E44AD', Q: '#2C3E50', R: '#E67E22', S: '#1ABC9C', T: '#16A085',
  U: '#F39C12', V: '#8E44AD', W: '#3498DB', X: '#2ECC71', Y: '#9B59B6', Z: '#34495E'
};

const getInitials = (name: string): string => {
  const names = name.split(' ');
  const initials = names.map((name) => name.charAt(0).toUpperCase());
  return initials.join('');
};

const getRandomColor = (initials: string): string => {
  const firstLetter = initials.charAt(0);
  return colorMap[firstLetter] || '#000000';
};

const AdminFeedbacks: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get<Feedback[]>('/api/feedback');
        setFeedbacks(response.data.reverse());
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDeleteFeedback = async (feedbackId: string) => {
    try {
      await axios.delete(`/api/feedback/${feedbackId}`);
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback._id !== feedbackId)
      );
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">User Feedbacks</h2>
        {feedbacks.map((feedback) => {
          const initials = getInitials(feedback.name);
          const color = getRandomColor(initials);
          const legendTemplate = (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <Avatar label={initials} size="large" style={{ backgroundColor: color, color: '#ffffff' }} shape="circle" />
                <span className="text-xl font-bold text-gray-800">{feedback.name}</span>
              </div>
              
            </div>
          );
          return (
            <Fieldset toggleable key={feedback._id} legend={legendTemplate} className="border border-gray-300 bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-lg text-gray-700 mb-4">{feedback.message}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500 text-sm">{formatDate(feedback.createdAt)}</span>
                <div className="flex items-center space-x-3">
                <span className="text-gray-500 text-sm">{feedback.email}</span>
                <div className="cursor-pointer text-right">
                  <Tippy content="Delete feedback" placement="top">
                    <span onClick={() => handleDeleteFeedback(feedback._id)}>
                      <IconTrashLines className="text-red-600" />
                    </span>
                  </Tippy>
                </div>
              </div>
              </div>
            </Fieldset>
          );
        })}
      </div>
    </div>
  );
};

export default AdminFeedbacks;