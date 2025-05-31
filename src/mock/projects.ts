export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  issues: number;
  pullRequests: number;
  lastUpdated: string;
  url: string;
  teamMembers: {
    id: string;
    name: string;
    avatarUrl: string;
    role: string;
  }[];
}

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'frontend-framework',
    description: 'A modern React-based UI framework with built-in accessibility and animations',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 1256,
    forks: 178,
    issues: 42,
    pullRequests: 15,
    lastUpdated: '2 hours ago',
    url: 'https://github.com/organization/frontend-framework',
    teamMembers: [
      {
        id: 'user-1',
        name: 'Alex Johnson',
        avatarUrl: 'https://i.pravatar.cc/150?img=33',
        role: 'Owner'
      },
      {
        id: 'user-2',
        name: 'Sarah Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
        role: 'Contributor'
      },
      {
        id: 'user-3',
        name: 'Mike Rodriguez',
        avatarUrl: 'https://i.pravatar.cc/150?img=53',
        role: 'Contributor'
      }
    ]
  },
  {
    id: 'project-2',
    name: 'api-service',
    description: 'Backend API service for authentication, data processing, and third-party integrations',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 892,
    forks: 94,
    issues: 23,
    pullRequests: 7,
    lastUpdated: '1 day ago',
    url: 'https://github.com/organization/api-service',
    teamMembers: [
      {
        id: 'user-1',
        name: 'Alex Johnson',
        avatarUrl: 'https://i.pravatar.cc/150?img=33',
        role: 'Owner'
      },
      {
        id: 'user-4',
        name: 'Jamie Wilson',
        avatarUrl: 'https://i.pravatar.cc/150?img=68',
        role: 'Admin'
      }
    ]
  },
  {
    id: 'project-3',
    name: 'data-pipeline',
    description: 'ETL data pipeline for processing and analyzing user events and metrics',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 645,
    forks: 72,
    issues: 12,
    pullRequests: 4,
    lastUpdated: '3 days ago',
    url: 'https://github.com/organization/data-pipeline',
    teamMembers: [
      {
        id: 'user-2',
        name: 'Sarah Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
        role: 'Owner'
      },
      {
        id: 'user-5',
        name: 'David Kim',
        avatarUrl: 'https://i.pravatar.cc/150?img=15',
        role: 'Contributor'
      }
    ]
  },
  {
    id: 'project-4',
    name: 'mobile-app',
    description: 'Cross-platform mobile app using React Native with offline support',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 1103,
    forks: 135,
    issues: 38,
    pullRequests: 9,
    lastUpdated: '5 days ago',
    url: 'https://github.com/organization/mobile-app',
    teamMembers: [
      {
        id: 'user-3',
        name: 'Mike Rodriguez',
        avatarUrl: 'https://i.pravatar.cc/150?img=53',
        role: 'Owner'
      },
      {
        id: 'user-1',
        name: 'Alex Johnson',
        avatarUrl: 'https://i.pravatar.cc/150?img=33',
        role: 'Admin'
      }
    ]
  },
  {
    id: 'project-5',
    name: 'infrastructure',
    description: 'Infrastructure as code using Terraform for cloud resource management',
    language: 'HCL',
    languageColor: '#844FBA',
    stars: 478,
    forks: 62,
    issues: 8,
    pullRequests: 2,
    lastUpdated: '1 week ago',
    url: 'https://github.com/organization/infrastructure',
    teamMembers: [
      {
        id: 'user-4',
        name: 'Jamie Wilson',
        avatarUrl: 'https://i.pravatar.cc/150?img=68',
        role: 'Owner'
      },
      {
        id: 'user-5',
        name: 'David Kim',
        avatarUrl: 'https://i.pravatar.cc/150?img=15',
        role: 'Contributor'
      }
    ]
  },
  {
    id: 'project-6',
    name: 'documentation',
    description: 'Technical documentation site built with Docusaurus',
    language: 'MDX',
    languageColor: '#ff4500',
    stars: 324,
    forks: 45,
    issues: 15,
    pullRequests: 5,
    lastUpdated: '2 weeks ago',
    url: 'https://github.com/organization/documentation',
    teamMembers: [
      {
        id: 'user-2',
        name: 'Sarah Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
        role: 'Owner'
      },
      {
        id: 'user-3',
        name: 'Mike Rodriguez',
        avatarUrl: 'https://i.pravatar.cc/150?img=53',
        role: 'Contributor'
      }
    ]
  }
];