import React from 'react'
import { 
  FaBullseye, 
  FaEye, 
  FaCheckCircle,
  FaRocket,
  FaShieldAlt,
  FaHeadset,
  FaBolt,
  FaChartBar,
  FaSync
} from 'react-icons/fa'
import { MdOutlineIntegrationInstructions } from 'react-icons/md'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Empowering Teams to <span className="text-indigo-600">Achieve More</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're on a mission to transform how teams collaborate and succeed together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-200">
            <FaBullseye className="text-4xl text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To create the most intuitive and powerful collaboration platform that helps teams 
              achieve their goals faster and more efficiently.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-200">
            <FaEye className="text-4xl text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              A world where every team, regardless of size or location, can work together 
              seamlessly and achieve extraordinary results.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border-2 border-indigo-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Choose <span className="text-indigo-600">TeamSync</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: FaRocket, text: '99.9% Uptime Guarantee' },
              { icon: FaShieldAlt, text: 'Enterprise-Grade Security' },
              { icon: FaHeadset, text: '24/7 Customer Support' },
              { icon: FaBolt, text: 'Real-Time Collaboration' },
              { icon: FaChartBar, text: 'Advanced Analytics' },
              { icon: MdOutlineIntegrationInstructions, text: 'Seamless Integrations' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-700">
                <item.icon className="text-indigo-500" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            © 2026 TeamSync. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage