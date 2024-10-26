import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StudySection = () => {
  return (
    <div id="study-section">
      {/* Summary Section */}
      <Card className="summary-card">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Summary
          </Typography>
          <Typography variant="body1">
            The video explains the internet as an iceberg with multiple levels, from the commonly accessed surface web to the more dangerous and restricted dark web levels. It details how each level operates, the tools needed to access them, and examples of content found at each depth. The video also includes specific case studies like Silk Road and Rent-A-Hitman.com to illustrate the real-world implications of dark web activities, while warning about the dangers and illegal nature of many dark web services.
          </Typography>
        </CardContent>
      </Card>

      {/* Lesson Plan Section */}
      <div id="lesson-plan">
        <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
          Lesson Plan
        </Typography>

        {/* Module 1 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" className="module-title">Module 1: Introduction to Internet Layers</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>1.1 The Internet Iceberg Concept:</strong> Definition of the layered internet structure, overview of accessibility levels, basic security and privacy concepts.
            </Typography>
            <Typography>
              <strong>1.2 Surface Web (Level 1):</strong> Characteristics, examples, and security tips for accessing publicly available web content.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Module 2 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" className="module-title">Module 2: The Bergie Web (Level 2)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>2.1 Understanding Semi-Hidden Content:</strong> Definition of non-indexed content, types of content (unlisted videos, password-protected pages, blocked regional content).
            </Typography>
            <Typography>
              <strong>2.2 Access Methods:</strong> Specific URL requirements, VPN usage, region-specific access tools.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Module 3 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" className="module-title">Module 3: The Dark Web (Level 3)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>3.1 Technical Foundation:</strong> TOR (The Onion Router) network, encryption principles, anonymity features.
            </Typography>
            <Typography>
              <strong>3.2 Access and Safety:</strong> Required software, security precautions, legal considerations, law enforcement presence.
            </Typography>
            <Typography>
              <strong>3.3 Case Studies:</strong>
            </Typography>
            {/* Moved the <ul> outside the <Typography> */}
            <div>
              <ul>
                <li>
                  <strong>Silk Road:</strong> Creation and purpose, operation methods, downfall and consequences.
                </li>
                <li>
                  <strong>Rent-A-Hitman.com:</strong> Origin as IT company name, transformation to law enforcement tool, impact on cyber crime prevention.
                </li>
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Module 4 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" className="module-title">Module 4: Security and Legal Considerations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>4.1 Common Dark Web Activities:</strong> Cryptocurrency transactions, privacy-focused communications, legitimate uses (journalism, activism, privacy protection).
            </Typography>
            <Typography>
              <strong>4.2 Criminal Elements:</strong> Types of illegal activities, law enforcement operations, scams and risks.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Module 5 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" className="module-title">Module 5: Safety and Ethics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>5.1 Personal Security:</strong> Digital footprint awareness, protection methods, risk assessment.
            </Typography>
            <Typography>
              <strong>5.2 Ethical Considerations:</strong> Privacy vs security debate, social responsibility, reporting illegal content.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default StudySection;
