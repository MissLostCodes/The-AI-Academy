"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import FancyWrapper from "@/components/FancyWrapper"
import { CheckCircle2, Sparkles } from "lucide-react"

function UpgradePage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-6">
            Early Bird Access
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            You're one of our first users! Enjoy exclusive benefits and premium features.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl font-semibold">Your Exclusive Benefits</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium mb-2">Unlimited Course Creation</h3>
                <p className="text-gray-300">Create as many courses as you want without any restrictions.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium mb-2">Premium AI Features</h3>
                <p className="text-gray-300">Access to advanced AI-powered learning tools and analytics.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium mb-2">Priority Support</h3>
                <p className="text-gray-300">Get faster responses and dedicated support for your learning journey.</p>
              </div>
            </div>
          </div>

         
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-400">
          <p>This offer is exclusively available for our early users.</p>
          <p className="mt-2">Thank you for being part of our journey!</p>
        </div>
      </div>
    </div>
  )
}

export default UpgradePage
