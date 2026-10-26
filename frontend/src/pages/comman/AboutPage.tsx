import React from 'react'
import {
  FaBullseye,
  FaEye,
  FaRocket,
  FaShieldAlt,
  FaHeadset,
  FaBolt,
  FaChartBar,
  FaSync
} from 'react-icons/fa'
import { MdOutlineIntegrationInstructions } from 'react-icons/md'

const clayRaised = 'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'

const AboutPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e0e5ec] px-4 py-12">
      {/* clay blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#a3b1c6]/40 blur-3xl" />
        <div className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-[#c4b5fd]/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-[#4a5568] md:text-5xl">
            Empowering Teams to <span className="text-indigo-500">Achieve More</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium text-[#718096]">
            We're on a mission to transform how teams collaborate and succeed together.
          </p>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {[
            {
              icon: FaBullseye,
              title: 'Our Mission',
              body: 'To create the most intuitive and powerful collaboration platform that helps teams achieve their goals faster and more efficiently.',
            },
            {
              icon: FaEye,
              title: 'Our Vision',
              body: 'A world where every team, regardless of size or location, can work together seamlessly and achieve extraordinary results.',
            },
          ].map((card, i) => (
            <div key={i} className={`rounded-[2rem] p-8 ${clayRaised}`}>
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${clayRaised}`}>
                <card.icon className="text-2xl text-indigo-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#4a5568]">{card.title}</h3>
              <p className="font-medium text-[#718096]">{card.body}</p>
            </div>
          ))}
        </div>

        <div className={`rounded-[2rem] p-8 ${clayRaised}`}>
          <h2 className="mb-8 text-center text-2xl font-extrabold text-[#4a5568]">
            Why Choose <span className="text-indigo-500">TeamSync</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: FaRocket, text: '99.9% Uptime Guarantee' },
              { icon: FaShieldAlt, text: 'Enterprise-Grade Security' },
              { icon: FaHeadset, text: '24/7 Customer Support' },
              { icon: FaBolt, text: 'Real-Time Collaboration' },
              { icon: FaChartBar, text: 'Advanced Analytics' },
              { icon: MdOutlineIntegrationInstructions, text: 'Seamless Integrations' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-2xl bg-[#e0e5ec] px-4 py-3 shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]"
              >
                <item.icon className="text-lg text-indigo-500" />
                <span className="text-sm font-semibold text-[#4a5568]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs font-semibold text-[#a0aec0]">
            © 2026 TeamSync. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage