"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FancyWrapper from "@/components/FancyWrapper";
import { UserButton } from "@clerk/nextjs";
import DashboardHeader from "./dashboard/_components/DashboardHeader";
import WelcomeBanner from "./dashboard/_components/WelcomeBanner";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute top-4 right-4">
        <UserButton afterSignOutUrl="/"/>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader/>
        
       <div className="mt-10">
          <WelcomeBanner/>
        </div>
        <div className="mt-1 flex justify-center">
          <FancyWrapper>
            <Button 
              variant="fancy" 
              onClick={() => router.push('/dashboard')}
            >
              Get Started
            </Button>
          </FancyWrapper>
        </div>

        <div className="mt-5 flex justify-center">
          <Image
            src="/main_bg.png"
            alt="Main Background"
            width={900}
            height={200}
            className="rounded-lg"
          />
        </div>

        {/* Feature Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-purple-500/20">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">Personalized Learning</h3>
            <p className="text-gray-300">Get customized content tailored to your goals and pace.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-purple-500/20">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">AI-Powered Tests</h3>
            <p className="text-gray-300">Test your knowledge with ai generated quiz </p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-purple-500/20">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">Track Progress</h3>
            <p className="text-gray-300">Monitor your learning journey </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-32 border-t border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">AI Study Bro</h3>
              <p className="text-gray-400">Empowering learners with AI-driven education solutions.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@theaiacademy.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Learning St, Education City</li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/shagun-gupta-2187a2313/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} The AI Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
