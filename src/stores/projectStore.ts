import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { githubService } from '../services/github';

interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  owner: string;
  repo: string;
  isPrivate: boolean;
  stars: number;
  forks: number;
  issues: number;
  language: string;
  lastUpdated: string;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  addProject: (githubUrl: string) => Promise<void>;
  removeProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  getProject: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      loading: false,
      error: null,

      addProject: async (githubUrl: string) => {
        set({ loading: true, error: null });
        try {
          const { owner, repo } = await githubService.parseRepoUrl(githubUrl);
          const repoData = await githubService.getRepository(owner, repo);
          
          const project: Project = {
            id: `${owner}-${repo}`,
            name: repoData.name,
            description: repoData.description || '',
            githubUrl: repoData.html_url,
            owner,
            repo,
            isPrivate: repoData.private,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            issues: repoData.open_issues_count,
            language: repoData.language,
            lastUpdated: repoData.updated_at
          };

          set(state => ({
            projects: [...state.projects, project],
            loading: false
          }));
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to add project'
          });
          throw error;
        }
      },

      removeProject: (id: string) => {
        set(state => ({
          projects: state.projects.filter(project => project.id !== id)
        }));
      },

      updateProject: (id: string, updates: Partial<Project>) => {
        set(state => ({
          projects: state.projects.map(project =>
            project.id === id ? { ...project, ...updates } : project
          )
        }));
      },

      getProject: (id: string) => {
        return get().projects.find(project => project.id === id);
      }
    }),
    {
      name: 'reposage-projects'
    }
  )
);