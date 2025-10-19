import React from 'react';
import { Shield, Layers, CheckCircle, Target } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

const AboutPage: React.FC = () => {
  const architectureItems = [
    { label: 'Layer 1', value: 'Polygon PoS', description: 'Secure foundation layer' },
    { label: 'Layer 2', value: 'Ramestta Network', description: 'High-performance execution layer' },
    { label: 'Consensus', value: 'Proof-of-Stake', description: 'Energy-efficient consensus mechanism' },
    { label: 'Finality', value: 'Checkpointed via Polygon L1', description: 'Guaranteed transaction finality' }
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
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Ramestta</h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              The next-generation Layer 2 blockchain built on Polygon PoS, 
              empowering developers with unparalleled flexibility and performance.
            </p>
          </div>
        </div>
      </section>

      {/* What is Ramestta */}
      <section className="section-padding bg-black">
      <CubeBackground />
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">What is Ramestta?</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Ramestta is a next-generation Layer 2 blockchain built on Polygon PoS. Everything you can do on 
                Polygon Mainnet can be done on Ramestta, but with greater control, flexibility, and optimized performance.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Developers benefit from the reliability of Polygon and the power of an independent Layer 2 execution layer, 
                enabling innovative solutions that weren't possible before.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mb-6">
                <Layers className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Layer 2 Innovation</h3>
              <p className="text-gray-300 leading-relaxed">
                Built specifically to extend Polygon's capabilities while maintaining full compatibility 
                with the existing ecosystem and tooling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section-padding bg-gray-950">
      <CubeBackground />
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Architecture</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ramestta's architecture is designed for maximum security, scalability, and interoperability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureItems.map((item, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>
                <p className="text-primary-400 font-medium mb-2">{item.value}</p>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-black">
      <CubeBackground />
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="card p-8">
              <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To decentralize and democratize access to scalable, low-cost Web3 infrastructure 
                without sacrificing interoperability or speed. We envision a future where blockchain 
                technology is accessible to everyone, everywhere.
              </p>
            </div>

            {/* Mission */}
            <div className="card p-8">
              <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To be the most developer-friendly, community-driven Layer 2 platform operating atop Polygon, 
                empowering real-world use cases in DeFi, NFTs, GameFi, and more while fostering innovation 
                and adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="section-padding bg-gray-950 text-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose Ramestta?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ramestta combines the best of both worlds: Polygon's proven security and our innovative Layer 2 solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-4">100%</div>
              <h3 className="text-xl font-semibold mb-2">EVM Compatible</h3>
              <p className="text-gray-300">Full compatibility with Ethereum tooling and smart contracts</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-4">{'<2s'}</div>
              <h3 className="text-xl font-semibold mb-2">Block Time</h3>
              <p className="text-gray-300">Lightning-fast transaction confirmation times</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-4">$0.001</div>
              <h3 className="text-xl font-semibold mb-2">Average Gas Fee</h3>
              <p className="text-gray-300">Ultra-low transaction costs for all users</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;