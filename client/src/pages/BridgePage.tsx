import React from 'react';
import { ArrowLeftRight, Shield, Zap, Eye, ExternalLink } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

const BridgePage: React.FC = () => {
  const supportedChains = [
    {
      name: 'Ethereum',
      symbol: 'ETH',
      status: 'Available',
      direction: 'bidirectional'
    },
    {
      name: 'Polygon',
      symbol: 'MATIC',
      status: 'Available',
      direction: 'bidirectional'
    },
    {
      name: 'Other EVM Chains',
      symbol: 'Various',
      status: 'Coming Soon',
      direction: 'bidirectional'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'ERC-20 / ERC-721 Support',
      description: 'Bridge both fungible and non-fungible tokens securely across chains'
    },
    {
      icon: Shield,
      title: 'Secure, Audited Contracts',
      description: 'Smart contracts audited by leading security firms for maximum safety'
    },
    {
      icon: Eye,
      title: 'Real-time Tracking',
      description: 'Monitor your bridge transactions in real-time with detailed status updates'
    },
    {
      icon: Zap,
      title: 'Low Fees',
      description: 'Minimal bridging fees to maximize your asset transfers'
    }
  ];

  const bridgeSteps = [
    {
      step: 1,
      title: 'Connect Wallet',
      description: 'Connect your MetaMask or compatible wallet to the bridge interface'
    },
    {
      step: 2,
      title: 'Select Chains',
      description: 'Choose source and destination chains for your asset transfer'
    },
    {
      step: 3,
      title: 'Choose Asset',
      description: 'Select the token or NFT you want to bridge'
    },
    {
      step: 4,
      title: 'Confirm Transfer',
      description: 'Review details and confirm the bridge transaction'
    },
    {
      step: 5,
      title: 'Wait for Confirmation',
      description: 'Monitor the transfer progress until completion'
    }
  ];
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
  

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding">
        <FloatingParticles />
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">
              RamaBridge
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed">
            Seamlessly move your assets between Ethereum, Polygon, and Ramestta with our secure, 
            fast, and low-cost bridge solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://ramabridge.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ArrowLeftRight className="mr-2" size={20} />
              Launch Bridge
            </a>
            <button className="btn-secondary">
              View Tutorial
            </button>
          </div>
        </div>
      </section>

      {/* Supported Chains */}
      <section className="section-padding bg-black">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Supported Networks</h2>
            <p className="text-xl text-gray-300">Bridge assets between these networks</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportedChains.map((chain, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-6 icon-bounce" style={{animationDelay: `${index * 0.2}s`}}>
                  <span className="text-white font-bold text-lg">{chain.symbol}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{chain.name}</h3>
                <div className="flex items-center justify-center mb-4">
                  <ArrowLeftRight className="text-primary-400 mx-2 icon-bounce" size={20} style={{animationDelay: `${index * 0.3}s`}} />
                  <span className="text-gray-300">Ramestta</span>
                </div>
                <div className="flex justify-center">
                  {chain.status === 'Available' ? (
                    <span className="px-4 py-2 bg-green-900/50 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                      {chain.status}
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-yellow-900/50 text-yellow-300 rounded-full text-sm font-medium border border-yellow-500/30">
                      {chain.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-gray-950">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Bridge Features</h2>
            <p className="text-xl text-gray-300">Why choose RamaBridge for your cross-chain transfers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-start space-x-4">
                  <div className="feature-icon flex-shrink-0">
                    <feature.icon className="text-white relative z-10" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Bridge */}
      <section className="section-padding bg-black">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">How to Bridge Assets</h2>
            <p className="text-xl text-gray-300">Simple steps to transfer your assets across chains</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {bridgeSteps.map((step, index) => (
              <div key={index} className="card p-6 text-center relative">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce" style={{animationDelay: `${index * 0.2}s`}}>
                  <span className="text-white font-bold">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                {index < bridgeSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge Stats */}
      <section className="section-padding bg-gray-950 text-white">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Bridge Statistics</h2>
            <p className="text-xl text-gray-300">Real-time bridge usage metrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="stats-card">
              <div className="text-4xl font-bold text-primary-400 mb-2">$50M+</div>
              <div className="text-gray-300">Total Value Bridged</div>
            </div>
            <div className="stats-card">
              <div className="text-4xl font-bold text-primary-400 mb-2">25K+</div>
              <div className="text-gray-300">Bridge Transactions</div>
            </div>
            <div className="stats-card">
              <div className="text-4xl font-bold text-primary-400 mb-2">5min</div>
              <div className="text-gray-300">Average Bridge Time</div>
            </div>
            <div className="stats-card">
              <div className="text-4xl font-bold text-primary-400 mb-2">99.9%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="section-padding bg-black">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Security & Trust</h2>
            <p className="text-xl text-gray-300">Your assets are protected by industry-leading security measures</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-green-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                <Shield className="text-green-400 icon-bounce" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Audited Smart Contracts</h3>
              <p className="text-gray-300">All bridge contracts have been audited by leading security firms</p>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary-500/30">
                <Eye className="text-primary-400 icon-bounce" size={32} style={{animationDelay: '0.2s'}} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Transparent Operations</h3>
              <p className="text-gray-300">All bridge transactions are publicly verifiable on-chain</p>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-green-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                <Zap className="text-green-400 icon-bounce" size={32} style={{animationDelay: '0.4s'}} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fast & Reliable</h3>
              <p className="text-gray-300">Optimized for speed and reliability with 99.9% uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <FloatingParticles />
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Bridge Your Assets?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Experience seamless cross-chain transfers with RamaBridge today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://ramabridge.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Launch Bridge <ExternalLink className="ml-2" size={16} />
            </a>
            <button className="btn-secondary">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BridgePage;