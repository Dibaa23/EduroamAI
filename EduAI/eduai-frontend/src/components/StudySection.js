// StudySection.js
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StudySection = ({ summary, lessonPlan, loading }) => {
  // Function to parse the lesson plan string into structured data
  const parseLessonPlan = (lessonPlanString) => {
    const lines = lessonPlanString.split('\n');
    const modules = [];
    let currentModule = null;

    lines.forEach((line) => {
      line = line.trim();

      // Detect module titles (e.g., $$ topic 1)
      if (line.startsWith('$$')) {
        const moduleTitle = line.substring(2).trim();
        currentModule = {
          title: moduleTitle,
          subtopics: [],
        };
        modules.push(currentModule);
      }

      // Detect subtopics (e.g., $1) subtopic 1)
      else if (line.startsWith('$') && line.includes(')')) {
        const subtopic = line.substring(line.indexOf(')') + 1).trim();
        if (currentModule) {
          currentModule.subtopics.push(subtopic);
        }
      }
    });

    return modules;
  };

  const modules = lessonPlan ? parseLessonPlan(lessonPlan) : [];

  return (
    <div id="study-section">
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <CircularProgress />
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Analyzing the video, please wait...
          </Typography>
        </div>
      ) : (
        <>
          {/* Summary Section */}
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Summary
              </Typography>
              <Typography variant="body1">{summary || 'No summary available.'}</Typography>
            </CardContent>
          </Card>

          {/* Lesson Plan Section */}
          <div id="lesson-plan">
            <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
              Lesson Plan
            </Typography>

            {modules.length > 0 ? (
              modules.map((module, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" className="module-title">
                      Module {index + 1}: {module.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {module.subtopics.map((subtopic, idx) => (
                      <Typography key={idx}>
                        <strong>{idx + 1}. </strong>
                        {subtopic}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Typography variant="body1">No lesson plan available.</Typography>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudySection;
