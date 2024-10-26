import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaQuestionCircle, FaVideo } from 'react-icons/fa'; // Import icons

const TableOfContents = () => {
  const navigate = useNavigate();

  return (
    <ul className="table-of-contents">
      {/* Study Section (Summary + Lesson Plan) */}
      <li>
        <a onClick={() => navigate('/study')}>
          <FaBook title="Study Section" />
        </a>
      </li>
      {/* Testing Section (Quiz) */}
      <li>
        <a onClick={() => navigate('/testing')}>
          <FaQuestionCircle title="Testing Section" />
        </a>
      </li>
      {/* Multimedia Section (Recommendations) */}
      <li>
        <a onClick={() => navigate('/multimedia')}>
          <FaVideo title="Multimedia Section" />
        </a>
      </li>
    </ul>
  );
};

export default TableOfContents;
