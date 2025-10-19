import React from 'react';
import { Shield, Server, TrendingUp, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

const ValidatorPage: React.FC = () => {
  // Cube background component
  const CubeBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-500/40 rounded-sm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${10 + Math.random() * 20}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </div>
  );
  const injectGlobalStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) translateX(10px) rotate(90deg);
        }
        50% {
          transform: translateY(0) translateX(20px) rotate(180deg);
        }
        75% {
          transform: translateY(20px) translateX(10px) rotate(270deg);
        }
        100% {
          transform: translateY(0) translateX(0) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  };
  
  // Call this once when the component mounts
  if (typeof document !== 'undefined' && !document.querySelector('style[data-float-animation]')) {
    injectGlobalStyles();
  }
  
  const requirements = [
    {
      title: 'Minimum Stake Amount',
      description: 'Stake requirement details coming soon',
      status: 'coming-soon'
    },
    {
      title: '99.9% Uptime',
      description: 'Maintain high availability for network reliability',
      status: 'required'
    },
    {
      title: 'Validated Checkpoints',
      description: 'Sync checkpoints with Polygon PoS layer',
      status: 'required'
    }
  ];

  const rewards = [
    {
      icon: Shield,
      title: 'Validating Blocks',
      description: 'Earn rewards for successfully validating network transactions and maintaining consensus'
    },
    {
      icon: TrendingUp,
      title: 'Participating in Governance',
      description: 'Vote on network proposals and earn governance rewards (coming soon)'
    },
    {
      icon: Server,
      title: 'Supporting Network Health',
      description: 'Contribute to network security and decentralization while earning consistent rewards'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Setup Node Infrastructure',
      description: 'Deploy and configure your validator node with proper hardware specifications'
    },
    {
      step: 2,
      title: 'Stake Required Amount',
      description: 'Lock the minimum stake amount to become eligible for validation'
    },
    {
      step: 3,
      title: 'Register as Validator',
      description: 'Submit your validator registration through the validator portal'
    },
    {
      step: 4,
      title: 'Start Validating',
      description: 'Begin validating transactions and earning rewards'
    }
  ];

  const resources = [
    {
      title: 'How to Setup a Node',
      description: 'Complete guide for setting up your validator node',
      link: '#'
    },
    {
      title: 'Monitoring Tools',
      description: 'Tools to monitor your validator performance',
      link: '#'
    },
    {
      title: 'Validator API Docs',
      description: 'Technical documentation for validator operations',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding">
        <FloatingParticles />
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Become a
            <span className="block text-gradient">
              Validator
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed">
            Secure the Ramestta network, earn rewards, and contribute to the decentralized future of blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://validator.ramestta.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Shield className="mr-2" size={20} />
              Validator Portal
            </a>
            <button className="btn-secondary">
              <Settings className="mr-2" size={20} />
              Setup Guide
            </button>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding bg-black">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Validator Requirements</h2>
            <p className="text-xl text-gray-300">Meet these requirements to become a Ramestta validator</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="flex justify-center mb-4">
                  {req.status === 'required' ? (
                    <div className="w-12 h-12 bg-green-900/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-green-500/30">
                      <CheckCircle className="text-green-400 icon-bounce" size={24} style={{animationDelay: `${index * 0.2}s`}} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-yellow-900/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-yellow-500/30">
                      <AlertCircle className="text-yellow-400 icon-bounce" size={24} style={{animationDelay: `${index * 0.2}s`}} />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{req.title}</h3>
                <p className="text-gray-300 leading-relaxed">{req.description}</p>
                {req.status === 'coming-soon' && (
                  <span className="inline-block mt-3 px-3 py-1 bg-yellow-900/50 text-yellow-300 rounded-full text-sm font-medium border border-yellow-500/30">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earn Rewards */}
      <section className="section-padding bg-gray-950">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Earn Rewards by</h2>
            <p className="text-xl text-gray-300">Multiple ways to earn as a Ramestta validator</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rewards.map((reward, index) => (
              <div key={index} className="card p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-6 icon-bounce" style={{animationDelay: `${index * 0.3}s`}}>
                  <reward.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{reward.title}</h3>
                <p className="text-gray-300 leading-relaxed">{reward.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="section-padding bg-black">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">How to Get Started</h2>
            <p className="text-xl text-gray-300">Follow these steps to become a validator</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="card p-6 text-center relative">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce" style={{animationDelay: `${index * 0.2}s`}}>
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validator Stats */}
      <section className="section-padding bg-gray-950 text-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Network Statistics</h2>
            <p className="text-xl text-gray-300">Current validator network metrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="stats-card">
              <div className="text-4xl font-bold text-primary-400 mb-2">60+</div>
              <div className="text-gray-300">Active Validators</div>
            </div>
            <div className="stats-card">
              <div className="text-4xl font-bold text-primary-400 mb-2">99.9%</div>
              <div className="text-gray-300">Network Uptime</div>
            </div>
            <div className="stats-card">
              <div className="text-4xl font-bold text-primary-400 mb-2">2s</div>
              <div className="text-gray-300">Block Time</div>
            </div>
            <div className="stats-card">
              <div className="text-4xl font-bold text-primary-400 mb-2">10K+</div>
              <div className="text-gray-300">TPS Capacity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-padding gradient-bg text-white">
        <FloatingParticles />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Validator Resources</h2>
            <p className="text-xl text-gray-200">Everything you need to run a successful validator</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20">
                <h3 className="text-xl font-semibold mb-4">{resource.title}</h3>
                <p className="text-gray-200 mb-6">{resource.description}</p>
                <a 
                  href={resource.link}
                  className="btn-secondary inline-flex items-center"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValidatorPage;