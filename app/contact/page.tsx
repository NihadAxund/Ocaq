'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { offices } from '@/lib/data';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { locale } = useStore();
  const t = useTranslation(locale);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t.nav.contact}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team. We're here to help with any questions about our products or services.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-effect dark:glass-effect-dark p-8 rounded-2xl border">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your full name"
                    />
                  </div>
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
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <Input
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us how we can help you"
                    rows={5}
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </div>

            {/* Live Chat Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 glass-effect dark:glass-effect-dark p-6 rounded-2xl border"
            >
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Live Chat Support</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Need immediate assistance? Chat with our support team in real-time.
              </p>
              <Button variant="outline" className="w-full">
                Start Live Chat
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <div className="glass-effect dark:glass-effect-dark p-6 rounded-2xl border">
              <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@RECIN.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="glass-effect dark:glass-effect-dark p-6 rounded-2xl border">
              <h3 className="text-xl font-semibold mb-4">Our Offices</h3>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <motion.div
                    key={office.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-primary pl-4"
                  >
                    <h4 className="font-semibold">{office.name}</h4>
                    <div className="flex items-start mt-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{office.email}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass-effect dark:glass-effect-dark p-6 rounded-2xl border">
              <h3 className="text-xl font-semibold mb-4">Find Us</h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">Office locations worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}