import Navbar from "@/components/Navbar";
import Link from 'next/link';
import Image from 'next/image';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  alt: string;
}
export default function Home() {

  const features: Feature[] = [
    {
      id: 1,
      icon: '/file.svg',
      title: 'Fast Performance',
      description: 'Optimized for speed and efficiency.',
      alt: 'Feature 1'
    },
    {
      id: 2,
      icon: '/window.svg',
      title: 'User Friendly',
      description: 'Intuitive and easy-to-use design.',
      alt: 'Feature 2'
    },
    {
      id: 3,
      icon: '/globe.svg',
      title: 'SEO Ready',
      description: 'Boost your search rankings with SEO.',
      alt: 'Feature 3'
    }
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <header>
         <Navbar/>
      </header>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to My Next.js App
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Build amazing things with Next.js & Tailwind CSS
          </p>
          <Link 
            href="/auth" 
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 text-center py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Awesome Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">
                <Image
                  src={feature.icon}
                  alt={feature.alt}
                  width={60}
                  height={60}
                  className="w-15 h-15"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8">
        <div className="container mx-auto px-4">
          <p className="mb-0 text-gray-300">
            © 2025 MyBrand. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </div>
  );
}
