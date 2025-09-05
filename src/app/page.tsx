"use client";

import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import CTA from "@/components/CTA";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Clock } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useRef, useState, useEffect } from "react";

// Component for floating particles that only renders on client
function FloatingParticles() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-purple-500/20 to-violet-400/20"
          style={{
            width: Math.random() * 20 + 5 + "px",
            height: Math.random() * 20 + 5 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animation: `float${Math.ceil(Math.random() * 3)} ${15 + Math.random() * 15
              }s infinite ease-in-out ${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <>
      <HeroSection />

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      <FeaturesSection />

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      {/* Messages Carousel Section */}
      <section className="relative w-full bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

        {/* Floating particles - client only */}
        <FloatingParticles />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real Messages from{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                Real Users
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See what people are saying about their Anonify experience
            </p>
          </div>

          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-4xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="bg-gray-800/50 backdrop-blur-md border border-gray-700 h-full group hover:border-transparent transition-all duration-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle className="w-5 h-5 text-purple-400" />
                          <CardTitle className="text-white text-lg font-semibold">
                            {message.title}
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{message.received}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          "{message.content}"
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50" />
            <CarouselNext className="mr-12 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50" />
          </Carousel>

          <div className="text-center mt-12">
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              <a href="/sign-up">
                Join the Conversation
              </a>
            </Button>
          </div>
        </div>

        {/* Global Animations */}
        <style jsx>{`
          @keyframes float1 {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-5deg); }
          }
          @keyframes float3 {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.05); }
          }
        `}</style>
      </section>

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      <CTA />
      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>
    </>
  );
}