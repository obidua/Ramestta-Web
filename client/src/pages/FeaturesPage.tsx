import React from 'react';
import { Code, Coins, Image, Users, Network, Zap, Wrench, Shield } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Smart Contracts',
      description: 'Deploy EVM-compatible contracts using Solidity, Hardhat, Truffle, Remix',
      details: ['Full Solidity support', 'Gas optimization', 'Debug tools', 'Automated testing']
    },
    {
      icon: Coins,
      title: 'DeFi Protocols',
      description: 'Launch AMMs, staking platforms, liquidity pools, and lending systems',
      details: ['Automated Market Makers', 'Yield farming', 'Liquidity mining', 'Flash loans']
    },
    {
      icon: Image,
      title: 'NFTs',
      description: 'Mint ERC-721 & ERC-1155 NFTs and trade them using low fees',
      details: ['ERC-721 standard', 'ERC-1155 multi-token', 'Metadata storage', 'Royalty support']
    },
    {
      icon: Users,
      title: 'DAOs',
      description: 'Create DAOs with treasury, voting, and rule enforcement',
      details: ['Governance tokens', 'Proposal system', 'Treasury management', 'Voting mechanisms']
    },
    {
      icon: Network,
      title: 'Cross-Chain',
      description: 'Move assets across chains via RamaBridge',
      details: ['Asset bridging', 'Cross-chain swaps', 'Multi-chain support', 'Secure transfers']
    },
    {
      icon: Zap,
      title: 'Fast Finality',
      description: 'Transaction confirmation in seconds',
      details: ['Sub-second blocks', 'Instant confirmation', 'High throughput', 'Low latency']
    },
    {
      icon: Wrench,
      title: 'Tooling Support',
      description: 'Same tooling stack as Ethereum/Polygon: MetaMask, Web3.js, Ethers.js',
      details: ['MetaMask integration', 'Web3.js support', 'Ethers.js compatibility', 'Remix IDE']
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Enterprise-grade security with Polygon PoS backing',
      details: ['Polygon security', 'Validator network', 'Consensus mechanism', 'Audit ready']
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
            Everything You Can Do on Polygon,
            <span className="block text-gradient">
              You Can Do on Ramestta
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Ramestta provides all the features and capabilities you need to build next-generation Web3 applications.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-black">
        <CubeBackground />
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 group">
                <div className="flex items-start space-x-4">
                  <div className="feature-icon flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="text-white relative z-10" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 icon-bounce" style={{animationDelay: `${detailIndex * 0.2}s`}}></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-gray-950">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Feature Comparison</h2>
            <p className="text-xl text-gray-300">See how Ramestta compares to other blockchain networks</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-white">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-primary-400">Ramestta</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-300">Ethereum</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-300">Polygon</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-700 hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">Transaction Speed</td>
                  <td className="py-4 px-6 text-center text-green-400 font-semibold">{'<2 seconds'}</td>
                  <td className="py-4 px-6 text-center text-red-400">15 seconds</td>
                  <td className="py-4 px-6 text-center text-yellow-400">2-3 seconds</td>
                </tr>
                <tr className="border-t border-gray-700 bg-gray-800/20 hover:bg-gray-800/40 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">Gas Fees</td>
                  <td className="py-4 px-6 text-center text-green-400 font-semibold">$0.001</td>
                  <td className="py-4 px-6 text-center text-red-400">$5-50</td>
                  <td className="py-4 px-6 text-center text-yellow-400">$0.01</td>
                </tr>
                <tr className="border-t border-gray-700 hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">EVM Compatibility</td>
                  <td className="py-4 px-6 text-center text-green-400 font-semibold">✓</td>
                  <td className="py-4 px-6 text-center text-green-400">✓</td>
                  <td className="py-4 px-6 text-center text-green-400">✓</td>
                </tr>
                <tr className="border-t border-gray-700 bg-gray-800/20 hover:bg-gray-800/40 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">Throughput (TPS)</td>
                  <td className="py-4 px-6 text-center text-green-400 font-semibold">10,000+</td>
                  <td className="py-4 px-6 text-center text-red-400">15</td>
                  <td className="py-4 px-6 text-center text-yellow-400">7,000</td>
                </tr>
                <tr className="border-t border-gray-700 hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">Security Model</td>
                  <td className="py-4 px-6 text-center text-green-400 font-semibold">Polygon PoS</td>
                  <td className="py-4 px-6 text-center text-green-400">Ethereum PoS</td>
                  <td className="py-4 px-6 text-center text-green-400">Polygon PoS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <FloatingParticles />
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience These Features?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Start building with Ramestta today and unlock the full potential of Layer 2 blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/developers" className="btn-primary">
              Get Started
            </a>
            <a href="/ecosystem" className="btn-secondary">
              View Examples
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;