'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Clock, Target } from 'lucide-react';
import Navbar from './components/navbar'; 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Organize Your Life with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> TaskFlow</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The ultimate productivity platform that helps you manage tasks, collaborate with teams, and achieve your goals with beautiful simplicity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/login" className="border border-gray-300 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TaskFlow?
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed for modern productivity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Organization</h3>
              <p className="text-gray-600">
                Intelligent task categorization and priority management that adapts to your workflow.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Seamless collaboration tools that keep your team synchronized and productive.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Time Tracking</h3>
              <p className="text-gray-600">
                Built-in time tracking and analytics to optimize your productivity patterns.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have revolutionized their workflow with TaskFlow.
          </p>
          <Link href="/signup" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}


