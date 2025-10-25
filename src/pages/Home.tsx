import { CheckCircle, Instagram, MapPin, Lock, Mail, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../contexts/AuthContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { useServices } from '../hooks/useServices';
import { useMaterials } from '../hooks/useMaterials';
import { useHeroContent } from '../hooks/useHeroContent';
import { initializeContent } from '../services/initializeContent';

export function Home() {
  const { products, loading } = useProducts();
  const { settings } = useSiteSettings();
  const { services, loading: servicesLoading } = useServices();
  const { materials, loading: materialsLoading } = useMaterials();
  const { heroContent, loading: heroLoading } = useHeroContent();
  const { isAdmin, user, userName, logout } = useAuth();
  const navigate = useNavigate();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const displayedProducts = showAllProducts ? products : products.slice(0, 3);

  useEffect(() => {
    initializeContent();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleMouseEnter = (productId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    const timeout = setTimeout(() => {
      setHoveredProductId(productId);
    }, 1000);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredProductId(null);
  };

  const heroAnimation = useScrollAnimation();
  const productsAnimation = useScrollAnimation();
  const servicesAnimation = useScrollAnimation();
  const materialsAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();


  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 py-4">
        <nav className="container mx-auto px-6">
          <div className="bg-white/95 backdrop-blur-md text-[#3d4f5c] rounded-2xl shadow-xl px-6 py-4 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-3">
              <img src={settings.logoUrl} alt="ATSA Logo" className="w-14 h-14 object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#3d4f5c] to-[#5a7280] bg-clip-text text-transparent">ATSA</span>
            </div>
            <div className="hidden md:flex gap-2">
              <a href="#products" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium">Products</a>
              <a href="#services" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium">Services</a>
              <a href="#materials" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium">Materials</a>
              <a href="#contact" className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3d4f5c] to-[#5a7280] text-white hover:shadow-lg transition font-semibold">Contact</a>
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-[#3d4f5c] hover:bg-gray-200 transition font-semibold flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Admin
                </button>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-[#3d4f5c] hover:bg-gray-200 transition font-semibold"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate('/admin/login')}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-[#3d4f5c] hover:bg-gray-200 transition font-semibold flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Login
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {user && (
        <div className="container mx-auto px-6 pt-24">
          <div className="bg-white border-2 border-[#3d4f5c] text-[#3d4f5c] rounded-xl shadow-lg px-6 py-4 text-center">
            <p className="text-lg font-semibold">
              Welcome, {userName || user.email?.split('@')[0]}!
            </p>
          </div>
        </div>
      )}

      <section ref={heroAnimation.ref} className="container mx-auto px-6 py-40 mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-transparent rounded-3xl"></div>
        <div className={`max-w-4xl relative z-10 transition-all duration-700 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 animate-fadeIn">
            <span className="bg-gradient-to-r from-[#3d4f5c] via-[#5a7280] to-[#3d4f5c] bg-clip-text text-transparent">
              {heroContent.title}
            </span>
          </h1>
          <p className="text-2xl text-gray-700 mb-6 animate-fadeIn delay-100 font-medium">
            {heroContent.subtitle}
          </p>
          <p className="text-lg text-gray-600 mb-10 animate-fadeIn delay-200 leading-relaxed">
            {heroContent.description}
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3d4f5c] to-[#5a7280] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <section ref={productsAnimation.ref} id="products" className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 transition-all duration-700 ${productsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="bg-gradient-to-r from-[#3d4f5c] to-[#5a7280] bg-clip-text text-transparent">Our Work</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore our portfolio of precision-crafted projects</p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#3d4f5c] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product, index) => {
              const isExpanded = hoveredProductId === product.id;
              const isOtherExpanded = hoveredProductId && hoveredProductId !== product.id;

              return (
                <div
                  key={product.id}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative group transition-all duration-500 ease-out ${productsAnimation.isVisible ? 'opacity-100' : 'opacity-0 scale-95'} ${
                    isExpanded ? 'z-30' : isOtherExpanded ? 'opacity-60' : 'z-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute -inset-2 bg-gradient-to-br from-[#3d4f5c]/20 to-[#5a7280]/20 rounded-xl transition-all duration-500 ${
                    isExpanded ? 'opacity-100 blur-xl' : 'opacity-0 blur-none'
                  }`}></div>
                  <div className={`relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
                    isExpanded ? 'shadow-2xl scale-105 ring-2 ring-[#3d4f5c]/30' : 'shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  }`}>
                    {product.imageUrl && (
                      <div className="overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={`w-full object-cover transition-all duration-500 ${
                            isExpanded ? 'h-80 scale-105' : 'h-64 group-hover:scale-110'
                          }`}
                        />
                      </div>
                    )}
                    <div className={`p-6 transition-all duration-500 ${isExpanded ? 'bg-gradient-to-b from-white to-slate-50' : ''}`}>
                      <h3 className={`font-bold text-[#3d4f5c] mb-2 transition-all duration-500 ${
                        isExpanded ? 'text-2xl' : 'text-xl'
                      }`}>{product.name}</h3>
                      <p className={`text-gray-600 transition-all duration-500 leading-relaxed ${
                        isExpanded ? 'text-base' : 'text-sm line-clamp-3'
                      }`}>{product.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
          {!loading && !showAllProducts && products.length > 3 && (
            <div className="text-center mt-16">
              <button
                onClick={() => setShowAllProducts(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3d4f5c] to-[#5a7280] text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                View All Projects
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section ref={servicesAnimation.ref} id="services" className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 transition-all duration-700 ${servicesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="bg-gradient-to-r from-[#3d4f5c] to-[#5a7280] bg-clip-text text-transparent">Our Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Comprehensive manufacturing solutions tailored to your needs</p>
          </div>
          {servicesLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#3d4f5c] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const delays = ['', 'delay-100', 'delay-200'];
                const animations = ['opacity-0 -translate-x-10', 'opacity-0 translate-y-10', 'opacity-0 translate-x-10'];

                return (
                  <div key={service.id} className={`bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-700 hover:shadow-2xl ${delays[index % 3]} ${servicesAnimation.isVisible ? 'opacity-100 translate-x-0 translate-y-0' : animations[index % 3]}`}>
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3d4f5c]/90 via-[#3d4f5c]/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center text-[#3d4f5c] font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section ref={materialsAnimation.ref} id="materials" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 transition-all duration-700 ${materialsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="bg-gradient-to-r from-[#3d4f5c] to-[#5a7280] bg-clip-text text-transparent">Materials We Work With</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">High-quality materials for superior results</p>
          </div>
          {materialsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#3d4f5c] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${materialsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="grid md:grid-cols-2 gap-4">
                {materials.map((material) => (
                  <div key={material.id} className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl hover:shadow-md transition-all duration-300">
                    <CheckCircle className="w-6 h-6 text-[#3d4f5c] flex-shrink-0" />
                    <span className="text-lg text-gray-700 font-medium">{material.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section ref={contactAnimation.ref} id="contact" className="bg-gradient-to-br from-[#3d4f5c] to-[#5a7280] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className={`container mx-auto px-6 text-center transition-all duration-700 relative z-10 ${contactAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Contact us today to discuss your manufacturing needs and receive a detailed quote.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
            <a href="tel:+96171981996" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl hover:bg-white/20 transition font-medium hover:scale-105 transform duration-300">
              +961 71 981 996
            </a>
            <a href="tel:+2250150191162" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl hover:bg-white/20 transition font-medium hover:scale-105 transform duration-300">
              +225 01 50 19 11 62
            </a>
            <a href="mailto:atsa0009@gmail.com" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl hover:bg-white/20 transition font-medium flex items-center gap-2 justify-center hover:scale-105 transform duration-300">
              <Mail className="w-5 h-5" />
              atsa0009@gmail.com
            </a>
          </div>

          <div className="mt-16 pt-12 border-t border-white/20">
            <h3 className="text-2xl font-bold mb-8">Follow Us</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.instagram.com/ats_a1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition hover:scale-105 transform duration-300"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@atsa067"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition hover:scale-105 transform duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
                <span>TikTok</span>
              </a>
              <a
                href="https://maps.app.goo.gl/oerTXUjQhQee3rPa8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition hover:scale-105 transform duration-300"
              >
                <MapPin className="w-5 h-5" />
                <span>Location</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2d3f4c] text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; 1992-2024 ATSA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
