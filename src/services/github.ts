import { Octokit } from '@octokit/rest';

export class GitHubService {
  private octokit: Octokit | null = null;

  setToken(token?: string) {
    this.octokit = token ? new Octokit({ auth: token }) : null;
  }

  async parseRepoUrl(url: string): Promise<{ owner: string; repo: string }> {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      throw new Error('Invalid GitHub repository URL');
    }
    return { owner: match[1], repo: match[2].replace('.git', '') };
  }

  async getRepository(owner: string, repo: string) {
    if (!this.octokit) throw new Error('GitHub token not set');
    
    try {
      const { data } = await this.octokit.repos.get({ owner, repo });
      return data;
    } catch (error) {
      throw new Error('Failed to fetch repository information');
    }
  }

  async getFileTree(owner: string, repo: string, path: string = '') {
    if (!this.octokit) throw new Error('GitHub token not set');
    
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path
      });
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      throw new Error('Failed to fetch repository contents');
    }
  }

  async getFileContent(owner: string, repo: string, path: string) {
    if (!this.octokit) throw new Error('GitHub token not set');
    
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path
      });
      
      if ('content' in data && data.encoding === 'base64') {
        return atob(data.content);
      }
      
      throw new Error('Invalid file data received');
    } catch (error) {
      throw new Error('Failed to fetch file content');
    }
  }

  async getCommits(owner: string, repo: string, page: number = 1) {
    if (!this.octokit) throw new Error('GitHub token not set');
    
    try {
      const { data } = await this.octokit.repos.listCommits({
        owner,
        repo,
        per_page: 10,
        page
      });
      return data;
    } catch (error) {
      throw new Error('Failed to fetch commit history');
    }
  }

  async getLanguages(owner: string, repo: string) {
    if (!this.octokit) throw new Error('GitHub token not set');
    
    try {
      const { data } = await this.octokit.repos.listLanguages({
        owner,
        repo
      });
      return data;
    } catch (error) {
      throw new Error('Failed to fetch repository languages');
    }
  }

  async getContributors(owner: string, repo: string) {
    if (!this.octokit) throw new Error('GitHub token not set');
    
    try {
      const { data } = await this.octokit.repos.listContributors({
        owner,
        repo
      });
      return data;
    } catch (error) {
      throw new Error('Failed to fetch repository contributors');
    }
  }
}

export const githubService = new GitHubService();