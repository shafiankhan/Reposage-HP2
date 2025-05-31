export interface Activity {
  id: string;
  type: 'commit' | 'issue' | 'pull_request' | 'question' | 'meeting';
  title: string;
  description: string;
  time: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  repository?: string;
}

export const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    type: 'commit',
    title: 'feat: add user authentication system',
    description: 'Added JWT-based authentication with login/signup forms, password hashing, and session management. Includes middleware for protected routes.',
    time: '10 minutes ago',
    user: {
      name: 'Alex Johnson',
      avatarUrl: 'https://i.pravatar.cc/150?img=33'
    },
    repository: 'api-service'
  },
  {
    id: 'activity-2',
    type: 'question',
    title: 'Where is the PDF processing handled?',
    description: 'PDF processing is handled in src/utils/pdfProcessor.ts using the pdf-parse library. The main function processPdfFile() handles file reading and text extraction.',
    time: '25 minutes ago',
    user: {
      name: 'Sarah Chen',
      avatarUrl: 'https://i.pravatar.cc/150?img=32'
    },
    repository: 'mobile-app'
  },
  {
    id: 'activity-3',
    type: 'meeting',
    title: 'Sprint Planning - Authentication System',
    description: 'Discussed implementation of OAuth 2.0, planned API endpoints, assigned tasks for user management system',
    time: '1 hour ago',
    user: {
      name: 'Mike Rodriguez',
      avatarUrl: 'https://i.pravatar.cc/150?img=53'
    }
  },
  {
    id: 'activity-4',
    type: 'pull_request',
    title: 'Fix offline sync issues in mobile app',
    description: 'Resolved conflict when syncing offline data with server. Added retry mechanism and improved error handling.',
    time: '3 hours ago',
    user: {
      name: 'Jamie Wilson',
      avatarUrl: 'https://i.pravatar.cc/150?img=68'
    },
    repository: 'mobile-app'
  },
  {
    id: 'activity-5',
    type: 'issue',
    title: 'Performance issues with large datasets',
    description: 'Dashboard is slow to load when viewing projects with 1000+ files. Pagination and virtualization needed.',
    time: '5 hours ago',
    user: {
      name: 'David Kim',
      avatarUrl: 'https://i.pravatar.cc/150?img=15'
    },
    repository: 'frontend-framework'
  },
  {
    id: 'activity-6',
    type: 'commit',
    title: 'refactor: optimize database queries',
    description: 'Added indexes and improved query performance by restructuring how we fetch related data. Reduced average query time by 65%.',
    time: '1 day ago',
    user: {
      name: 'Sarah Chen',
      avatarUrl: 'https://i.pravatar.cc/150?img=32'
    },
    repository: 'api-service'
  },
  {
    id: 'activity-7',
    type: 'question',
    title: 'How is the authentication flow implemented?',
    description: 'The authentication flow uses JWT tokens with refresh token rotation. User authentication state is managed through React Context API with secure HTTP-only cookies.',
    time: '1 day ago',
    user: {
      name: 'Mike Rodriguez',
      avatarUrl: 'https://i.pravatar.cc/150?img=53'
    },
    repository: 'api-service'
  },
  {
    id: 'activity-8',
    type: 'meeting',
    title: 'Design Review - Dashboard Redesign',
    description: 'Reviewed new dashboard mockups, discussed improvements to user experience, and prioritized features for the next sprint.',
    time: '2 days ago',
    user: {
      name: 'Alex Johnson',
      avatarUrl: 'https://i.pravatar.cc/150?img=33'
    }
  }
];