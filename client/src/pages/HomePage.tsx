import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, DollarSign, Network, Code, TrendingUp } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import BlockchainGlobe from '../components/BlockchainGlobe';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Built on Polygon PoS',
      description: 'Inherits security, finality, and decentralization from the Polygon Layer 1.'
    },
    {
      icon: Zap,
      title: 'Faster Transaction Finality',
      description: 'Ramestta processes transactions in seconds with minimal latency.'
    },
    {
      icon: DollarSign,
      title: 'Ultra-low Gas Fees',
      description: 'Gas costs are a fraction of those on Ethereum and even lower than Polygon.'
    },
    {
      icon: Network,
      title: 'Cross-Chain Ready',
      description: 'Easily move assets across Ethereum, Polygon, and Ramestta using RamaBridge.'
    },
    {
      icon: Code,
      title: '100% EVM Compatibility',
      description: 'Works with Solidity, Hardhat, Truffle, Remix, MetaMask, and more.'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Infrastructure',
      description: 'Built to handle high throughput with enterprise-grade performance.'
    }
  ];

  const networkStats = [
    { label: 'Chain ID', value: '1370' },
    { label: 'RPC Endpoint', value: 'blockchain.ramestta.com' },
    { label: 'RPC Endpoint', value: 'blockchain2.ramestta.com' },
    { label: 'Explorer', value: 'ramascan.com' },
    { label: 'Bridge', value: 'ramabridge.com' },
    { label: 'Swap DApp', value: 'ramaswap.com' }
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
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding relative">
        <FloatingParticles />
        <div className="container-max text-center relative z-10">
          <div className="flex justify-center mb-8 glow-effect">
            <BlockchainGlobe />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="">Ramestta</span>: The Polygon-Powered
            <span className="block text-gradient">
              Layer 2 Blockchain
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Unlock the full power of Polygon Mainnet—on your own Layer 2 network. 
            EVM-compatible, fast, scalable, and Web3-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/developers" className="btn-primary flex justify-center items-center text-lg px-8 py-4">
              Start Building <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link to="/explorer" className="btn-secondary text-lg px-8 py-4">
              View Explorer
            </Link>
            <Link to="/bridge" className="btn-secondary text-lg px-8 py-4">
              Bridge Assets
            </Link>
          </div>
        </div>
      </section>

      {/* What is Ramestta */}
      <section className="section-padding bg-gray-950 relative overflow-hidden">
        <CubeBackground />
        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">What is <span className="font-ramestta">Ramestta</span>?</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              <span className="font-ramestta">Ramestta</span> is a full-featured Layer 2 blockchain that replicates the functionality of the Polygon PoS mainnet. 
              Built on top of Polygon as its Layer 1, <span className="font-ramestta">Ramestta</span> supports smart contracts, DeFi, NFTs, dApps, and DAOs—all 
              using the same toolchain as Ethereum and Polygon.
            </p>
          </div>
        </div>
      </section>

      {/* Why Ramestta */}
      <section className="section-padding bg-black relative overflow-hidden">
        <CubeBackground />
        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why <span className="font-ramestta">Ramestta</span>?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 relative z-10">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="section-padding bg-gray-950 relative overflow-hidden">
        <CubeBackground />
        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Network Stats</h2>
            <p className="text-xl text-gray-300">Live network information and endpoints</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6 text-lg font-semibold text-white">Parameter</th>
                  <th className="text-left py-4 px-6 text-lg font-semibold text-white">Value</th>
                </tr>
              </thead>
              <tbody>
                {networkStats.map((stat, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-300">{stat.label}</td>
                    <td className="py-4 px-6 text-primary-400 font-mono">{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white relative">
        <FloatingParticles />
      
        <div className="container-max text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Build on <span className="font-ramestta">Ramestta</span>?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join the growing ecosystem of developers building the future of Web3 on <span className="font-ramestta">Ramestta</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/developers" className="btn-primary">
              Developer Docs
            </Link>
            <Link to="/ecosystem" className="btn-secondary">
              Explore Ecosystem
            </Link>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;