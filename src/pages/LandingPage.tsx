import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Code, 
  Video, 
  Users, 
  ChevronRight, 
  CheckCircle,
  Github
} from 'lucide-react';

export default function LandingPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 backdrop-blur-sm">
        <div className="container-custom flex items-center justify-between py-4">
          <div className="flex items-center">
            <BrainCircuit className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-xl font-bold text-white">RepoSage</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm text-gray-300 hover:text-white">Features</a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-white">Pricing</a>
            <a href="#testimonials" className="text-sm text-gray-300 hover:text-white">Testimonials</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="btn-outline text-sm">
              Log in
            </Link>
            <Link to="/dashboard" className="btn-primary text-sm">
              Sign up
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-primary-600/20 backdrop-blur-3xl" />
        <motion.div 
          className="container-custom relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight text-center"
            variants={fadeIn}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
              AI-Powered
            </span>{" "}
            Code Collaboration
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg text-gray-300 text-center max-w-3xl mx-auto"
            variants={fadeIn}
          >
            RepoSage brings AI wisdom to your repositories, helping teams understand complex codebases,
            extract insights from meetings, and collaborate more effectively.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeIn}
          >
            <Link to="/dashboard" className="btn-primary px-8 py-3">
              Try it free
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <Link to="#features" className="btn-outline px-8 py-3">
              See features
            </Link>
          </motion.div>
          
          {/* Code example */}
          <motion.div 
            className="mt-16 rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
            variants={fadeIn}
          >
            <div className="bg-gray-900 text-white p-4 border-b border-gray-700 flex items-center">
              <Code className="h-5 w-5 text-primary-500 mr-2" />
              <div className="text-sm font-mono">Chat with your codebase</div>
            </div>
            <div className="bg-gray-950 p-6">
              <div className="chat-message mb-4">
                <div className="text-gray-400 text-sm mb-1">User:</div>
                <div className="rounded-lg bg-gray-800 p-3 text-white text-sm">
                  Where is the authentication logic implemented?
                </div>
              </div>
              
              <div className="chat-message mb-4">
                <div className="text-gray-400 text-sm mb-1">RepoSage AI:</div>
                <div className="rounded-lg bg-primary-900/30 border border-primary-700/30 p-3 text-gray-100 text-sm">
                  <p className="mb-2">
                    The authentication logic is implemented in <code>src/utils/auth.ts</code>. 
                    It uses JWT for token handling and includes functions for login, signup, and session management.
                  </p>
                  <pre className="text-xs bg-gray-800 p-2 rounded overflow-x-auto mt-2">
                    <code>
{`// src/utils/auth.ts
export async function authenticate(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  const { token } = response.data;
  
  if (token) {
    localStorage.setItem('auth_token', token);
    return true;
  }
  return false;
}`}
                    </code>
                  </pre>
                  <div className="mt-3 text-xs text-gray-400">
                    Sources: <span className="text-primary-400">src/utils/auth.ts:15-32</span>, <span className="text-primary-400">src/components/Login.tsx:67-89</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center">
            Powerful features for development teams
          </h2>
          <p className="mt-4 text-lg text-gray-300 text-center max-w-2xl mx-auto">
            RepoSage helps your team navigate complex codebases, extract insights from meetings,
            and collaborate more effectively.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="card-glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary-900/50 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Code Analysis</h3>
              <p className="text-gray-300">
                Ask questions about your codebase in natural language. RepoSage understands your code structure,
                dependencies, and implementation details.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Understand complex codebases quickly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Get implementation suggestions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Search functionality across repositories</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="card-glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary-900/50 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meeting Intelligence</h3>
              <p className="text-gray-300">
                Convert your team meetings into searchable, structured knowledge with AI-powered transcription,
                summarization, and insights extraction.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Automatic transcription and summarization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Extract action items and decisions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Search across meeting archives</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="card-glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary-900/50 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-300">
                Share insights, create documentation, and onboard new team members faster with
                AI-powered knowledge management.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Shared repository of knowledge</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Automatic documentation generation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Faster onboarding for new team members</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section id="pricing" className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-300 text-center max-w-2xl mx-auto">
            Choose the plan that's right for your team. All plans include our core features.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free tier */}
            <motion.div 
              className="card border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-gray-400 mb-4">For individual developers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>1 project connection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>500 AI credits per month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>1 hour of meeting processing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Community support</span>
                </li>
              </ul>
              <Link to="/dashboard" className="btn-outline w-full text-center">
                Get started
              </Link>
            </motion.div>

            {/* Pro tier */}
            <motion.div 
              className="card border-2 border-primary-600 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-gray-400 mb-4">For small teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>10 project connections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>5,000 AI credits per month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>10 hours of meeting processing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Email support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Team management</span>
                </li>
              </ul>
              <Link to="/dashboard" className="btn-primary w-full text-center">
                Get started
              </Link>
            </motion.div>

            {/* Enterprise tier */}
            <motion.div 
              className="card border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-400 mb-4">For large organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Unlimited project connections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>25,000 AI credits per month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Unlimited meeting processing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Link to="/dashboard" className="btn-outline w-full text-center">
                Contact sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold">Ready to bring AI wisdom to your repositories?</h2>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            Join thousands of developers who are leveraging RepoSage to understand code, extract insights from meetings,
            and collaborate more effectively.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="btn-primary bg-white text-primary-900 hover:bg-gray-100 px-8 py-3">
              Start your free trial
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <a href="#" className="btn-outline border-white text-white hover:bg-white/10 px-8 py-3">
              Schedule a demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <BrainCircuit className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">RepoSage</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Roadmap</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Security</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} RepoSage. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Made with <span className="text-primary-500">♥</span> for developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}