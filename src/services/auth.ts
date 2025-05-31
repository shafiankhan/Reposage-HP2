import axios from 'axios';
import Cookies from 'js-cookie';

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = `${window.location.origin}/auth/callback`;
const GITHUB_SCOPES = ['repo', 'user:email', 'read:org'].join(' ');

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  email: string;
}

export class AuthService {
  static initiateGitHubLogin() {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=${GITHUB_SCOPES}`;
    window.location.href = authUrl;
  }

  static async handleCallback(code: string): Promise<string> {
    try {
      const response = await axios.post('/api/auth/github', { code });
      const { access_token } = response.data;
      Cookies.set('github_token', access_token, { secure: true, sameSite: 'Lax' });
      return access_token;
    } catch (error) {
      throw new Error('Failed to authenticate with GitHub');
    }
  }

  static async getCurrentUser(token: string): Promise<GitHubUser> {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user information');
    }
  }

  static getToken(): string | undefined {
    return Cookies.get('github_token');
  }

  static logout() {
    Cookies.remove('github_token');
  }
}