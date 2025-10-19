import React from 'react';
import { Search, Activity, Coins, FileText, Image, ExternalLink } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

const ExplorerPage: React.FC = () => {
  const features = [
    {
      icon: Activity,
      title: 'Transactions',
      description: 'View detailed transaction history, gas fees, and execution status',
      count: '2.5M+'
    },
    {
      icon: Coins,
      title: 'Tokens',
      description: 'Explore all ERC-20 and ERC-721 tokens deployed on Ramestta',
      count: '15K+'
    },
    {
      icon: Search,
      title: 'Wallets',
      description: 'Search and analyze wallet addresses and their transaction history',
      count: '100K+'
    },
    {
      icon: FileText,
      title: 'Smart Contracts',
      description: 'Browse verified smart contracts with source code and ABI',
      count: '3.5K+'
    },
    {
      icon: Image,
      title: 'NFT Transfers',
      description: 'Track NFT mints, transfers, and marketplace activities',
      count: '50K+'
    }
  ];

  const recentBlocks = [
    { number: 1234567, transactions: 45, timestamp: '2 seconds ago', validator: '0x1234...5678' },
    { number: 1234566, transactions: 32, timestamp: '4 seconds ago', validator: '0x2345...6789' },
    { number: 1234565, transactions: 28, timestamp: '6 seconds ago', validator: '0x3456...7890' },
    { number: 1234564, transactions: 51, timestamp: '8 seconds ago', validator: '0x4567...8901' },
    { number: 1234563, transactions: 39, timestamp: '10 seconds ago', validator: '0x5678...9012' }
  ];

  const recentTransactions = [
    { hash: '0xabcd...1234', from: '0x1111...2222', to: '0x3333...4444', value: '1.5 RAMA', fee: '0.001' },
    { hash: '0xbcde...2345', from: '0x2222...3333', to: '0x4444...5555', value: '0.8 RAMA', fee: '0.001' },
    { hash: '0xcdef...3456', from: '0x3333...4444', to: '0x5555...6666', value: '2.1 RAMA', fee: '0.001' },
    { hash: '0xdefg...4567', from: '0x4444...5555', to: '0x6666...7777', value: '0.3 RAMA', fee: '0.001' },
    { hash: '0xefgh...5678', from: '0x5555...6666', to: '0x7777...8888', value: '5.2 RAMA', fee: '0.002' }
  ];

  const networkStats = [
    { label: 'Block Height', value: '1,234,567' },
    { label: 'Total Transactions', value: '2.5M+' },
    { label: 'Active Addresses', value: '100K+' },
    { label: 'Average Block Time', value: '2.1s' },
    { label: 'Network Hash Rate', value: '15.2 TH/s' },
    { label: 'Total Supply', value: '1B RAMA' }
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
              Ramascan
            </span>
            <span className="block text-3xl md:text-4xl mt-2">Explorer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed">
            Explore the Ramestta blockchain with our comprehensive block explorer. 
            Track transactions, tokens, wallets, smart contracts, and NFT transfers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://ramascan.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Search className="mr-2" size={20} />
              Browse Ramascan
            </a>
            <button className="btn-secondary">
              API Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="section-padding bg-black">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Network Statistics</h2>
            <p className="text-xl text-gray-300">Real-time Ramestta network metrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networkStats.map((stat, index) => (
              <div key={index} className="stats-card">
                <div className="text-3xl font-bold text-primary-400 mb-2">{stat.value}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explorer Features */}
      <section className="section-padding bg-gray-950">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">What You Can Track</h2>
            <p className="text-xl text-gray-300">Comprehensive blockchain data at your fingertips</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200 icon-bounce" style={{animationDelay: `${index * 0.2}s`}}>
                  <feature.icon className="text-white" size={32} />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  <span className="text-primary-400 font-bold text-lg">{feature.count}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="section-padding bg-black">
        <CubeBackground />
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent Blocks */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Recent Blocks</h2>
              <div className="space-y-4">
                {recentBlocks.map((block, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">#{block.number}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">Block {block.number}</div>
                          <div className="text-sm text-gray-300">{block.timestamp}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-primary-400 font-semibold">{block.transactions} txns</div>
                        <div className="text-sm text-gray-300">Validator: {block.validator}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Recent Transactions</h2>
              <div className="space-y-4">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-900/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-green-500/30">
                          <Activity className="text-green-400" size={20} />
                        </div>
                        <div>
                          <div className="font-mono text-sm text-white">{tx.hash}</div>
                          <div className="text-sm text-gray-300">
                            {tx.from} → {tx.to}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-primary-400 font-semibold">{tx.value}</div>
                        <div className="text-sm text-gray-300">Fee: {tx.fee} RAMA</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API & Tools */}
      <section className="section-padding bg-gray-950 text-white">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Developer Tools</h2>
            <p className="text-xl text-gray-300">Integrate Ramestta data into your applications</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-6 icon-bounce">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">REST API</h3>
              <p className="text-gray-300 mb-6">Access blockchain data programmatically with our REST API</p>
              <button className="btn-secondary">
                API Docs
              </button>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6 icon-bounce" style={{animationDelay: '0.2s'}}>
                <Search className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">GraphQL</h3>
              <p className="text-gray-300 mb-6">Query blockchain data efficiently with GraphQL endpoints</p>
              <button className="btn-secondary">
                GraphQL Docs
              </button>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6 icon-bounce" style={{animationDelay: '0.4s'}}>
                <Activity className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">WebSocket</h3>
              <p className="text-gray-300 mb-6">Real-time blockchain events and notifications</p>
              <button className="btn-secondary">
                WebSocket Docs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <FloatingParticles />
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6">Explore Ramestta Today</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Dive deep into the Ramestta blockchain and discover the power of transparent, 
            decentralized data exploration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://ramascan.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Launch Explorer <ExternalLink className="ml-2" size={16} />
            </a>
            <button className="btn-secondary">
              Developer Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExplorerPage;