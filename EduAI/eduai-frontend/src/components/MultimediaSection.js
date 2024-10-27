import React from 'react';
import './MultimediaSection.css';

const MultimediaSection = () => {
  // Sample data for recommended YouTube videos
  const youtubeVideos = [
    { id: 'EM8IgIIiOdY', title: 'I gave 127 interviews. Top 5 Algorithms they asked me.' },
    { id: 'wufc6w8fqvY', title: '3 Months of Learning Leetcode' },
    { id: '6qS83wD29PY', title: '2-Minute Neuroscience: The Neuron' },
    { id: 'kjBOesZCoqc', title: 'Essence of linear algebra' },
    { id: 'KXkBZCe699A', title: 'How does Microsoft Azure work?' },
    { id: 'EFg3u_E6eHU', title: 'How Dijkstra\'s Algorithm Works' },
    { id: 'tZE_fQFK8EY', title: 'Introduction to Biology: Crash Course Biology #1' },
    { id: 'oVtlp72f9NQ', title: 'How to use Retrieval Augmented Generation (RAG)' },
    { id: 'vH2f7cjXjKI', title: 'Claude | Computer use for automating operations' },
    { id: 'EKYat3H1GUc', title: 'How to use NLX Platform' },
  ];

  return (
    <div className="video-list">
      <h3 className="section-title">Recommended Videos</h3>
      <ul>
        {youtubeVideos.map((video) => (
          <li key={video.id} className="video-item">
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="video-link"
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                alt={video.title}
                className="video-thumbnail"
              />
              <div className="video-title">{video.title}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultimediaSection;
