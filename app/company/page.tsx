import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Globe, Shield, CheckCircle, Calendar } from 'lucide-react';
import Image from 'next/image';

const milestones = [
  {
    year: '2015',
    title: 'Company Founded',
    description: 'Started with a vision to revolutionize the beauty industry with clinically proven formulations.'
  },
  {
    year: '2017',
    title: 'First Product Launch',
    description: 'Launched our flagship Vitamin C serum, which became an instant bestseller.'
  },
  {
    year: '2019',
    title: 'International Expansion',
    description: 'Expanded to 15 countries across North America and Europe.'
  },
  {
    year: '2021',
    title: 'Medical Division',
    description: 'Introduced professional medical aesthetic services and distributor program.'
  },
  {
    year: '2023',
    title: 'Sustainability Initiative',
    description: 'Launched eco-friendly packaging and carbon-neutral shipping program.'
  },
  {
    year: '2024',
    title: 'Innovation Hub',
    description: 'Opened state-of-the-art research facility for next-generation beauty solutions.'
  }
];

const certificates = [
  {
    name: 'ISO 9001:2015',
    description: 'Quality Management Systems',
    image: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg'
  },
  {
    name: 'FDA Registered',
    description: 'Food and Drug Administration',
    image: 'https://images.pexels.com/photos/6963945/pexels-photo-6963945.jpeg'
  },
  {
    name: 'GMP Certified',
    description: 'Good Manufacturing Practice',
    image: 'https://images.pexels.com/photos/6963946/pexels-photo-6963946.jpeg'
  },
  {
    name: 'Dermatologist Tested',
    description: 'Clinically Proven Results',
    image: 'https://images.pexels.com/photos/6963947/pexels-photo-6963947.jpeg'
  }
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                Our Story
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transforming Beauty Through Science
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                For nearly a decade, DermaBeauty has been at the forefront of beauty innovation, 
                combining cutting-edge science with luxurious formulations to deliver exceptional results.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Clinically Proven</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Dermatologist Tested</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Cruelty Free</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3735785/pexels-photo-3735785.jpeg"
                  alt="DermaBeauty Laboratory"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower individuals worldwide with innovative, science-backed beauty solutions 
                that enhance natural beauty while promoting health and well-being. We are committed 
                to creating products that deliver visible results through the latest advances in 
                cosmetic science.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the global leader in premium beauty and wellness products, setting new 
                standards for quality, efficacy, and sustainability. We envision a world where 
                everyone can access professional-grade beauty treatments that are both effective 
                and safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted Worldwide
            </h2>
            <p className="text-lg text-gray-600">
              Numbers that reflect our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                500K+
              </div>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                50+
              </div>
              <p className="text-gray-600 font-medium">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                200+
              </div>
              <p className="text-gray-600 font-medium">Products</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                98%
              </div>
              <p className="text-gray-600 font-medium">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              Key milestones in our growth and innovation
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quality Certifications
            </h2>
            <p className="text-lg text-gray-600">
              Our commitment to the highest standards of quality and safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Experience the DermaBeauty Difference?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of thousands of satisfied customers who have transformed their beauty routine with our innovative products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Shop Products
            </Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}