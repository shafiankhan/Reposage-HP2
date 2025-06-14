import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { githubService } from '../services/github';
import { firebaseService } from '../services/firebase';
import { useAuthStore } from './authStore';

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
  removeProject: (id: string) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => void;
  getProject: (id: string) => Project | undefined;
  loadProjects: () => Promise<void>;
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
          const user = useAuthStore.getState().user;
          
          if (!user) throw new Error('User not authenticated');
          
          const projectData = {
            userId: user.id,
            name: repoData.name,
            description: repoData.description || '',
            githubUrl: repoData.html_url,
            owner,
            repo,
            isPrivate: repoData.private,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            issues: repoData.open_issues_count,
            language: repoData.language || 'Unknown',
            lastUpdated: new Date(repoData.updated_at)
          };

          const projectId = await firebaseService.createProject(projectData);
          
          const project: Project = {
            id: projectId,
            name: projectData.name,
            description: projectData.description,
            githubUrl: projectData.githubUrl,
            owner: projectData.owner,
            repo: projectData.repo,
            isPrivate: projectData.isPrivate,
            stars: projectData.stars,
            forks: projectData.forks,
            issues: projectData.issues,
            language: projectData.language,
            lastUpdated: projectData.lastUpdated.toISOString()
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

      removeProject: async (id: string) => {
        try {
          await firebaseService.deleteProject(id);
          set(state => ({
            projects: state.projects.filter(project => project.id !== id)
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to remove project'
          });
          throw error;
        }
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
      },

      loadProjects: async () => {
        set({ loading: true, error: null });
        try {
          const user = useAuthStore.getState().user;
          if (!user) {
            set({ projects: [], loading: false });
            return;
          }

          const projectDocs = await firebaseService.getProjects(user.id);
          const projects: Project[] = projectDocs.map(doc => ({
            id: doc.id,
            name: doc.name,
            description: doc.description,
            githubUrl: doc.githubUrl,
            owner: doc.owner,
            repo: doc.repo,
            isPrivate: doc.isPrivate,
            stars: doc.stars,
            forks: doc.forks,
            issues: doc.issues,
            language: doc.language,
            lastUpdated: doc.lastUpdated.toISOString()
          }));

          set({ projects, loading: false });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load projects'
          });
        }
      }
    }),
    {
      name: 'reposage-projects'
    }
  )
);