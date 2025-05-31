export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: string[];
  summary: string;
  tags: string[];
  transcript?: {
    segments: {
      id: string;
      speaker: string;
      text: string;
      timestamp: string;
    }[];
  };
  actionItems?: string[];
}

export const mockMeetings: Meeting[] = [
  {
    id: 'meeting-1',
    title: 'Sprint Planning - Authentication System',
    date: 'Jun 10, 2025',
    duration: '42 minutes',
    participants: ['Sarah Chen', 'Mike Rodriguez', 'Alex Kumar'],
    summary: 'Discussed implementation of OAuth 2.0, planned API endpoints, assigned tasks for user management system',
    tags: ['planning', 'authentication', 'api'],
    transcript: {
      segments: [
        {
          id: 'segment-1',
          speaker: 'Sarah Chen',
          text: 'Good morning everyone. Today we need to finalize our authentication strategy for the app. I think we should go with OAuth 2.0 with support for multiple providers.',
          timestamp: '00:00:12'
        },
        {
          id: 'segment-2',
          speaker: 'Mike Rodriguez',
          text: 'I agree. We should definitely support Google and GitHub at a minimum, and maybe add Apple Sign-in later. How complex is the implementation going to be?',
          timestamp: '00:01:45'
        },
        {
          id: 'segment-3',
          speaker: 'Alex Kumar',
          text: 'I\'ve implemented OAuth 2.0 before. The main challenge will be handling token refresh and secure storage. We\'ll need to make sure we handle the state parameter correctly to prevent CSRF attacks.',
          timestamp: '00:02:37'
        },
        {
          id: 'segment-4',
          speaker: 'Sarah Chen',
          text: 'Good point. Let\'s make sure we follow best practices for token storage. No JWTs in localStorage! We should use HTTP-only cookies for the refresh token and memory for the access token.',
          timestamp: '00:04:10'
        }
      ]
    },
    actionItems: [
      'Implement OAuth provider integration',
      'Design user profile database schema',
      'Create authentication middleware',
      'Set up token refresh mechanism'
    ]
  },
  {
    id: 'meeting-2',
    title: 'Design Review - Dashboard Redesign',
    date: 'Jun 8, 2025',
    duration: '56 minutes',
    participants: ['Alex Johnson', 'Jamie Wilson', 'Sarah Chen', 'David Kim'],
    summary: 'Reviewed new dashboard mockups, discussed improvements to user experience, and prioritized features for the next sprint',
    tags: ['design', 'ui', 'dashboard'],
    transcript: {
      segments: [
        {
          id: 'segment-1',
          speaker: 'Alex Johnson',
          text: 'Welcome everyone. Today we\'re going to review the new dashboard design that Jamie has been working on. Jamie, would you like to walk us through the changes?',
          timestamp: '00:00:05'
        },
        {
          id: 'segment-2',
          speaker: 'Jamie Wilson',
          text: 'Sure thing. The main goal with this redesign was to improve information density while maintaining a clean look. I\'ve reorganized the project cards to show more key metrics at a glance.',
          timestamp: '00:00:32'
        },
        {
          id: 'segment-3',
          speaker: 'Sarah Chen',
          text: 'I really like the new layout. The activity feed on the right is much more useful now that it shows the type of activity with those color-coded icons.',
          timestamp: '00:05:14'
        },
        {
          id: 'segment-4',
          speaker: 'David Kim',
          text: 'One concern I have is about performance. The current dashboard is already slow to load with many projects. Will the new design address this?',
          timestamp: '00:08:47'
        },
        {
          id: 'segment-5',
          speaker: 'Jamie Wilson',
          text: 'That\'s a great point. I\'ve actually worked with the engineering team to implement virtualization for the project grid. We\'ll only render what\'s visible in the viewport.',
          timestamp: '00:09:22'
        }
      ]
    },
    actionItems: [
      'Finalize dashboard mockups',
      'Implement virtualized grid component',
      'Create new activity feed component',
      'Update color scheme documentation'
    ]
  },
  {
    id: 'meeting-3',
    title: 'Backend Architecture Planning',
    date: 'Jun 5, 2025',
    duration: '68 minutes',
    participants: ['Mike Rodriguez', 'David Kim', 'Alex Johnson'],
    summary: 'Planned the architecture for the new backend services, discussed database schema, and decided on deployment strategy',
    tags: ['architecture', 'backend', 'database'],
    transcript: {
      segments: [
        {
          id: 'segment-1',
          speaker: 'Mike Rodriguez',
          text: 'Let\'s start by discussing our database schema. We need to decide between SQL and NoSQL for the primary data store.',
          timestamp: '00:00:15'
        },
        {
          id: 'segment-2',
          speaker: 'David Kim',
          text: 'Given our data structure and relationship needs, I think PostgreSQL makes the most sense. We have a lot of relational data with projects, users, and teams.',
          timestamp: '00:01:32'
        },
        {
          id: 'segment-3',
          speaker: 'Alex Johnson',
          text: 'I agree. And for caching, we can use Redis to improve performance for frequently accessed data like user sessions and project metadata.',
          timestamp: '00:03:47'
        }
      ]
    },
    actionItems: [
      'Design initial database schema',
      'Set up PostgreSQL database',
      'Configure Redis for caching',
      'Create service architecture diagram'
    ]
  },
  {
    id: 'meeting-4',
    title: 'Q2 Roadmap Planning',
    date: 'Jun 1, 2025',
    duration: '92 minutes',
    participants: ['Sarah Chen', 'Alex Johnson', 'Jamie Wilson', 'Mike Rodriguez', 'David Kim'],
    summary: 'Planned features and priorities for Q2, allocated resources, and set team goals',
    tags: ['planning', 'roadmap', 'strategy'],
    transcript: {
      segments: [
        {
          id: 'segment-1',
          speaker: 'Sarah Chen',
          text: 'Welcome to our Q2 planning session. Our main goals this quarter are to improve user engagement, reduce technical debt, and launch the enterprise version.',
          timestamp: '00:00:10'
        },
        {
          id: 'segment-2',
          speaker: 'Alex Johnson',
          text: 'Based on user feedback, I think we should prioritize the meeting intelligence features. That\'s been the most requested feature in the last survey.',
          timestamp: '00:04:23'
        }
      ]
    },
    actionItems: [
      'Finalize Q2 roadmap document',
      'Assign feature owners',
      'Create sprint planning schedule',
      'Update stakeholder presentation'
    ]
  },
  {
    id: 'meeting-5',
    title: 'Mobile App Feature Planning',
    date: 'May 28, 2025',
    duration: '45 minutes',
    participants: ['Jamie Wilson', 'David Kim', 'Sarah Chen'],
    summary: 'Discussed new features for the mobile app, prioritized offline capabilities, and planned implementation timeline',
    tags: ['mobile', 'features', 'planning'],
    transcript: {
      segments: [
        {
          id: 'segment-1',
          speaker: 'Jamie Wilson',
          text: 'The main focus for our mobile app this quarter should be offline capabilities. Users need to be able to view their data and add comments when they don\'t have internet access.',
          timestamp: '00:00:22'
        },
        {
          id: 'segment-2',
          speaker: 'David Kim',
          text: 'That makes sense. We\'ll need to implement a robust sync mechanism to handle conflicts when users come back online.',
          timestamp: '00:02:18'
        }
      ]
    },
    actionItems: [
      'Design offline data model',
      'Implement sync mechanism',
      'Add offline indicators to UI',
      'Set up conflict resolution flows'
    ]
  },
  {
    id: 'meeting-6',
    title: 'Security Review',
    date: 'May 25, 2025',
    duration: '37 minutes',
    participants: ['Mike Rodriguez', 'Alex Johnson', 'David Kim'],
    summary: 'Conducted security review of the platform, identified vulnerabilities, and planned remediation steps',
    tags: ['security', 'review', 'compliance'],
    transcript: {
      segments: [
        {
          id: 'segment-1',
          speaker: 'Mike Rodriguez',
          text: 'Let\'s go through the results of our security audit. We found several areas that need attention, particularly around input validation and API rate limiting.',
          timestamp: '00:00:14'
        },
        {
          id: 'segment-2',
          speaker: 'Alex Johnson',
          text: 'I\'m concerned about the token handling in the authentication flow. We should implement token rotation and add more robust validation.',
          timestamp: '00:05:32'
        }
      ]
    },
    actionItems: [
      'Implement API rate limiting',
      'Add input validation to all forms',
      'Set up token rotation mechanism',
      'Schedule follow-up security review'
    ]
  }
];