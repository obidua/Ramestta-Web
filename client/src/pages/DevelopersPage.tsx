// import React from 'react';
// import { Code, Book, Github, Zap, CheckCircle, ExternalLink } from 'lucide-react';
// import FloatingParticles from '../components/FloatingParticles';

// const DevelopersPage: React.FC = () => {
//   const compatibleTools = [
//     { name: 'MetaMask', description: 'Browser wallet integration', status: 'Available' },
//     { name: 'Remix', description: 'Online Solidity IDE', status: 'Available' },
//     { name: 'Hardhat & Truffle', description: 'Development frameworks', status: 'Available' },
//     { name: 'Web3.js / Ethers.js', description: 'JavaScript libraries', status: 'Available' },
//     { name: 'WalletConnect', description: 'Wallet connection protocol', status: 'Available' },
//     { name: 'OpenZeppelin', description: 'Smart contract libraries', status: 'Available' }
//   ];

//   const comingSoon = [
//     { name: 'Faucet for Testnet', description: 'Get test tokens for development' },
//     { name: 'Dev Grant Program', description: 'Funding for promising projects' },
//     { name: 'Dev Console', description: 'Streamlined contract deployment' },
//     { name: 'Verified Contracts', description: 'Contract verification via Ramascan' }
//   ];

//   const quickStart = [
//     {
//       step: 1,
//       title: 'Add Network to MetaMask',
//       description: 'Configure your wallet with Ramestta network settings'
//     },
//     {
//       step: 2,
//       title: 'Get Test Tokens',
//       description: 'Use our faucet to get tokens for development (coming soon)'
//     },
//     {
//       step: 3,
//       title: 'Deploy Contract',
//       description: 'Use Remix, Hardhat, or Truffle to deploy your smart contracts'
//     },
//     {
//       step: 4,
//       title: 'Interact & Test',
//       description: 'Test your dApp and interact with deployed contracts'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-black">
//       {/* Hero Section */}
//       <section className="gradient-bg text-white section-padding">
//         <FloatingParticles />
//         <div className="container-max">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6">
//               Build on
//               <span className="block text-gradient">
//                 Ramestta
//               </span>
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
//               Get started in minutes with the same tools you already know and love.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href="https://docs.ramestta.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn-primary"
//               >
//                 <Book className="mr-2" size={20} />
//                 Read Developer Docs
//               </a>
//               <a
//                 href="https://www.npmjs.com/~ramestta"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn-secondary"
//               >
//                 <Github className="mr-2" size={20} />
//                 NPM - Ramestta SDKs
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Network Configuration */}
//       <section className="section-padding bg-black">
//         <div className="container-max">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-6">Get Started in Minutes</h2>
//             <p className="text-xl text-gray-300">Add Ramestta to your development environment</p>
//           </div>
//           <div className="max-w-4xl mx-auto">
//             <div className="card p-8">
//               <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
//                 <div className="feature-icon mr-3">
//                   <Code className="text-white relative z-10" size={28} />
//                 </div>
//                 Network Configuration
//               </h3>
//               <div className="bg-gray-950/80 rounded-lg p-6 overflow-x-auto border border-gray-700 shimmer-effect">
//                 <pre className="text-green-400 text-sm">
//                   {`{
//   "chainId": 1370,
//   "rpc": "https://blockchain.ramestta.com",
//   "explorer": "https://ramascan.com",
//   "name": "Ramestta Mainnet",
//   "symbol": "RAMA",
//   "decimals": 18
// }`}
//                 </pre>
//               </div>
//               <div className="mt-6 flex flex-col sm:flex-row gap-4">
//                 <button className="btn-primary flex-1">
//                   Add to MetaMask
//                 </button>
//                 <button className="btn-secondary flex-1">
//                   Copy Configuration
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Quick Start Guide */}
//       <section className="section-padding bg-gray-950">
//         <div className="container-max">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-6">Quick Start Guide</h2>
//             <p className="text-xl text-gray-300">Follow these steps to deploy your first contract</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {quickStart.map((item, index) => (
//               <div key={index} className="card p-6 text-center">
//                 <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
//                   <span className="text-white font-bold text-lg">{item.step}</span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
//                 <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Compatible Tools */}
//       <section className="section-padding bg-black">
//         <div className="container-max">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-6">Compatible With</h2>
//             <p className="text-xl text-gray-300">Use your favorite development tools without any changes</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {compatibleTools.map((tool, index) => (
//               <div key={index} className="card p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
//                   <div className="flex items-center text-green-400">
//                     <CheckCircle size={20} className="mr-1 icon-bounce" style={{ animationDelay: `${index * 0.1}s` }} />
//                     <span className="text-sm font-medium">{tool.status}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-300">{tool.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Coming Soon */}
//       <section className="section-padding bg-gray-950 text-white">
//         <div className="container-max">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-6">Coming Soon</h2>
//             <p className="text-xl text-gray-300">Exciting developer tools and programs on the horizon</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {comingSoon.map((item, index) => (
//               <div key={index} className="card p-6">
//                 <div className="flex items-center mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
//                     <Zap className="text-white icon-bounce" size={20} style={{ animationDelay: `${index * 0.3}s` }} />
//                   </div>
//                   <h3 className="text-xl font-semibold">{item.name}</h3>
//                 </div>
//                 <p className="text-gray-300">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Resources */}
//       <section className="section-padding gradient-bg text-white">
//         <FloatingParticles />
//         <div className="container-max">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-6">Developer Resources</h2>
//             <p className="text-xl text-gray-200 mb-8">Everything you need to build on Ramestta</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="card p-8 text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
//                 <Book className="text-white" size={32} />
//               </div>
//               <h3 className="text-xl font-semibold mb-4">Documentation</h3>
//               <p className="text-gray-200 mb-6">Comprehensive guides and API references</p>
//               <a
//                 href="https://docs.ramestta.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn-secondary"
//               >
//                 Read Docs <ExternalLink className="ml-2" size={16} />
//               </a>
//             </div>
//             <div className="card p-8 text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
//                 <Code className="text-white" size={32} />
//               </div>
//               <h3 className="text-xl font-semibold mb-4">Setup Guide</h3>
//               <p className="text-gray-200 mb-6">Step-by-step development environment setup</p>
//               <a
//                 href="https://docs.ramestta.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn-secondary"
//               >
//                 Setup Guide <ExternalLink className="ml-2" size={16} />
//               </a>
//             </div>
//             <div className="card p-8 text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
//                 <Github className="text-white" size={32} />
//               </div>
//               <h3 className="text-xl font-semibold mb-4">NPM SDKs</h3>
//               <p className="text-gray-200 mb-6">Open-source SDKs and example projects</p>
//               <a
//                 href="https://www.npmjs.com/~ramestta"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn-secondary"
//               >
//                 View NPM <ExternalLink className="ml-2" size={16} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default DevelopersPage;


import React from 'react';
import { Code, Book, Github, Zap, CheckCircle, ExternalLink } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import toast from 'react-hot-toast';

const DevelopersPage: React.FC = () => {
  const compatibleTools = [
    { name: 'MetaMask', description: 'Browser wallet integration', status: 'Available' },
    { name: 'Remix', description: 'Online Solidity IDE', status: 'Available' },
    { name: 'Hardhat & Truffle', description: 'Development frameworks', status: 'Available' },
    { name: 'Web3.js / Ethers.js', description: 'JavaScript libraries', status: 'Available' },
    { name: 'WalletConnect', description: 'Wallet connection protocol', status: 'Available' },
    { name: 'OpenZeppelin', description: 'Smart contract libraries', status: 'Available' }
  ];

  const comingSoon = [
    { name: 'Faucet for Testnet', description: 'Get test tokens for development' },
    { name: 'Dev Grant Program', description: 'Funding for promising projects' },
    { name: 'Dev Console', description: 'Streamlined contract deployment' },
    { name: 'Verified Contracts', description: 'Contract verification via Ramascan' }
  ];

  const quickStart = [
    {
      step: 1,
      title: 'Add Network to MetaMask',
      description: 'Configure your wallet with Ramestta network settings'
    },
    {
      step: 2,
      title: 'Get Test Tokens',
      description: 'Use our faucet to get tokens for development (coming soon)'
    },
    {
      step: 3,
      title: 'Deploy Contract',
      description: 'Use Remix, Hardhat, or Truffle to deploy your smart contracts'
    },
    {
      step: 4,
      title: 'Interact & Test',
      description: 'Test your dApp and interact with deployed contracts'
    }
  ];

  const configData = `{
  "chainId": 1370,
  "rpc": "https://blockchain.ramestta.com",
  "explorer": "https://ramascan.com",
  "name": "Ramestta Mainnet",
  "symbol": "RAMA",
  "decimals": 18
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(configData).then(() => {
      toast.success("Configuration copied successfully!");
    }).catch(() => {
      toast.error("Failed to copy configuration");
    });
  };
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
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build on
              <span className="block text-gradient">
                Ramestta
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Get started in minutes with the same tools you already know and love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://docs.ramestta.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Book className="mr-2" size={20} />
                Read Developer Docs
              </a>
              <a
                href="https://www.npmjs.com/~ramestta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="mr-2" size={20} />
                NPM - Ramestta SDKs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Network Configuration */}
      <section className="section-padding bg-black">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Get Started in Minutes</h2>
            <p className="text-xl text-gray-300">Add Ramestta to your development environment</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="feature-icon mr-3">
                  <Code className="text-white relative z-10" size={28} />
                </div>
                Network Configuration
              </h3>
              <div className="bg-gray-950/80 rounded-lg p-6 overflow-x-auto border border-gray-700 shimmer-effect">
                <pre className="text-green-400 text-sm">
                  {configData}
                </pre>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex-1">
                  Add to MetaMask
                </button>
                <button onClick={handleCopy} className="btn-secondary flex-1">
                  Copy Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="section-padding bg-gray-950">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Quick Start Guide</h2>
            <p className="text-xl text-gray-300">Follow these steps to deploy your first contract</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStart.map((item, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible Tools */}
      <section className="section-padding bg-black">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Compatible With</h2>
            <p className="text-xl text-gray-300">Use your favorite development tools without any changes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compatibleTools.map((tool, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  <div className="flex items-center text-green-400">
                    <CheckCircle size={20} className="mr-1 icon-bounce" style={{ animationDelay: `${index * 0.1}s` }} />
                    <span className="text-sm font-medium">{tool.status}</span>
                  </div>
                </div>
                <p className="text-gray-300">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section-padding bg-gray-950 text-white">
        <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Coming Soon</h2>
            <p className="text-xl text-gray-300">Exciting developer tools and programs on the horizon</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoon.map((item, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="text-white icon-bounce" size={20} style={{ animationDelay: `${index * 0.3}s` }} />
                  </div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                </div>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-padding gradient-bg text-white">
        <FloatingParticles />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Developer Resources</h2>
            <p className="text-xl text-gray-200 mb-8">Everything you need to build on Ramestta</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Book className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Documentation</h3>
              <p className="text-gray-200 mb-6">Comprehensive guides and API references</p>
              <a
                href="https://docs.ramestta.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Read Docs <ExternalLink className="ml-2" size={16} />
              </a>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Code className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Setup Guide</h3>
              <p className="text-gray-200 mb-6">Step-by-step development environment setup</p>
              <a
                href="https://docs.ramestta.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Setup Guide <ExternalLink className="ml-2" size={16} />
              </a>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Github className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">NPM SDKs</h3>
              <p className="text-gray-200 mb-6">Open-source SDKs and example projects</p>
              <a
                href="https://www.npmjs.com/~ramestta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View NPM <ExternalLink className="ml-2" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevelopersPage;
