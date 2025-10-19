import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import EcosystemPage from './pages/EcosystemPage';
import DevelopersPage from './pages/DevelopersPage';
import ValidatorPage from './pages/ValidatorPage';
import BridgePage from './pages/BridgePage';
import ExplorerPage from './pages/ExplorerPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import BlogPostForm from './components/BlogPostForm';
import NotFound from './pages/NotFound';


// Wallet connect and state management
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { projectId, metadata, networks, wagmiAdapter } from './config';
import { createAppKit } from '@reown/appkit/react'
import Login from './pages/Login';
import UserPanel from './pages/UserPanel';
import AdminPanel from './pages/AdminPanel';
import { useAuthStore } from './store/store';

const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'light' as const,
  themeVariables: {
    '--w3m-accent': '#000000',
  }
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


function App() {
  const { userToken, isAdmin } = useAuthStore();

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>


        <Router>
          <Toaster />
          <ScrollToTop />
          <div className="min-h-screen bg-black animated-dark-bg">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/ecosystem" element={<EcosystemPage />} />
                <Route path="/developers" element={<DevelopersPage />} />
                <Route path="/validator" element={<ValidatorPage />} />
                <Route path="/bridge" element={<BridgePage />} />
                <Route path="/explorer" element={<ExplorerPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route path='/login' element={< Login />} />
                <Route path='/blog-post' element={< BlogPostForm />} />


                <Route
                  path="/user-panel"
                  element={userToken && !isAdmin ? <UserPanel /> : <Login />}
                />

                <Route
                  path="/admin-panel"
                  element={userToken && isAdmin ? <AdminPanel /> : <Login />}
                />


                <Route path="*" element={<NotFound />} />


              </Routes>
            </main>
            <Footer />
          </div>
        </Router>

      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;