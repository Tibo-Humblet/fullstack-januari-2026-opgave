import TeacherService from '@services/TeacherService';
import { useState } from 'react';

type Props = {
  teacherId: number;
  learningPath: string;
  onUpdated: () => void;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath, onUpdated }: Props) => {
  const handleLearningPathChange = async (event: { target: { value: string } }) => {
    {
      /* Use TeacherService to update the learning path for the teacher */
      try {
        const response = await TeacherService.updateLearningPath(teacherId, event.target.value);
        onUpdated();
      } catch { alert("Could not update LearningPath"); }
    }
  };

  return (
    <div className="ml-6">
      <select 
        id="learningPath" 
        className="ml-2 p-1" 
        value={learningPath}
        onChange={handleLearningPathChange}
      >
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default LearningPath;
