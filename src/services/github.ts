import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  updated_at: string;
  html_url: string;
}

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: 'file' | 'dir';
  content?: string;
  download_url?: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
}

export class GitHubService {
  private token?: string;

  constructor(token?: string) {
    this.token = token;
  }

  private get headers() {
    return this.token
      ? { Authorization: `Bearer ${this.token}` }
      : {};
  }

  async parseRepoUrl(url: string): Promise<{ owner: string; repo: string }> {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      throw new Error('Invalid GitHub repository URL');
    }
    return { owner: match[1], repo: match[2].replace('.git', '') };
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepo> {
    try {
      const response = await axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('Repository not found');
      }
      throw new Error('Failed to fetch repository information');
    }
  }

  async getFileTree(owner: string, repo: string, path: string = ''): Promise<GitHubFile[]> {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch repository contents');
    }
  }

  async getFileContent(owner: string, repo: string, path: string): Promise<string> {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
        { headers: this.headers }
      );
      
      if (response.data.encoding === 'base64') {
        return atob(response.data.content);
      }
      
      return response.data.content;
    } catch (error) {
      throw new Error('Failed to fetch file content');
    }
  }

  async getCommits(owner: string, repo: string, page: number = 1): Promise<GitHubCommit[]> {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits`,
        {
          headers: this.headers,
          params: {
            page,
            per_page: 10
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch commit history');
    }
  }

  async getLanguages(owner: string, repo: string): Promise<Record<string, number>> {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch repository languages');
    }
  }

  async getContributors(owner: string, repo: string): Promise<any[]> {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch repository contributors');
    }
  }
}

export const githubService = new GitHubService();