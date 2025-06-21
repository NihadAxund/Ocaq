'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { MapPin, Users, TrendingUp, Award, CheckCircle, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BusinessPage() {
  const { locale } = useStore();
  const t = useTranslation(locale);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    experience: '',
    message: ''
  });

  const handleSubm = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'High Profit Margins',
      description: 'Earn up to 40% commission on all sales with our competitive pricing structure.'
    },
    {
      icon: Users,
      title: 'Marketing Support',
      description: 'Get access to professional marketing materials and ongoing promotional support.'
    },
    {
      icon: Award,
      title: 'Premium Products',
      description: 'Represent a trusted brand with clinically proven, high-quality beauty products.'
    },
    {
      icon: MapPin,
      title: 'Territory Protection',
      description: 'Exclusive territory rights ensure you have a protected market area.'
    }
  ];

  const requirements = [
    'Valid business license and tax identification',
    'Minimum initial order of $5,000',
    'Dedicated retail or online presence',
    'Commitment to brand standards and training',
    'Professional customer service capabilities'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {t.nav.business}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Become a RECIN Distributor
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Join our global network of successful distributors and build a profitable business 
                with premium beauty products. Get exclusive access to professional-grade formulations 
                and comprehensive business support.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Exclusive Territory Rights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>40% Commission</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Marketing Support</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                  alt="Business Partnership"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Why Partner With Us?
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the advantages of becoming a DermaBeauty distributor
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-effect dark:glass-effect-dark p-6 rounded-2xl text-center border"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Distributor Requirements
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                To ensure the success of our partnership, we have established clear requirements 
                for our distributor network.
              </p>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect dark:glass-effect-dark p-8 rounded-2xl border"
            >
              <h3 className="text-2xl font-bold mb-6">Application Process</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Submit Application</h4>
                    <p className="text-sm text-muted-foreground">Complete the distributor application form with your business details.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Review & Approval</h4>
                    <p className="text-sm text-muted-foreground">Our team reviews your application and conducts a qualification assessment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Onboarding</h4>
                    <p className="text-sm text-muted-foreground">Complete training program and place your initial order to get started.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Apply Now
              </h2>
              <p className="text-lg text-muted-foreground">
                Ready to start your journey as a DermaBeauty distributor? Fill out the form below.
              </p>
            </div>

            <form onSubmit={handleSubm} className="glass-effect dark:glass-effect-dark p-8 rounded-2xl border space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name *</label>
                  <Input
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Name *</label>
                  <Input
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Address *</label>
                <Input
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Full business address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tax ID / Business License *</label>
                <Input
                  required
                  value={formData.taxId}
                  onChange={(e) => setFormData({...formData, taxId: e.target.value})}
                  placeholder="Tax identification number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Previous Experience</label>
                <Textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  placeholder="Tell us about your experience in beauty/retail industry"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Any additional information you'd like to share"
                  rows={3}
                />
              </div>

              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Upload Business Documents</p>
                <p className="text-xs text-muted-foreground">Business license, tax documents, etc. (PDF, JPG, PNG)</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose Files
                </Button>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Submit Application
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}