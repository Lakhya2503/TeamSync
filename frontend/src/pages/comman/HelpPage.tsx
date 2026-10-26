import React, { useState } from 'react'
import {
  FaSearch,
  FaBook,
  FaVideo,
  FaComments,
  FaChevronDown,
  FaQuestionCircle,
  FaHeadset,
  FaUsers,
  FaArrowRight,
} from 'react-icons/fa'

const clayRaised = 'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    { question: 'How do I get started with TeamSync?', answer: 'Getting started is easy! Simply create an account, invite your team members, and start creating projects. Our onboarding guide will walk you through the entire process.' },
    { question: 'Is there a mobile app available?', answer: 'Yes! TeamSync offers native mobile apps for both iOS and Android. You can download them from the App Store or Google Play Store.' },
    { question: 'How secure is my data?', answer: 'We take security seriously. TeamSync uses enterprise-grade encryption, regular security audits, and complies with GDPR and CCPA regulations.' },
    { question: 'Can I integrate TeamSync with other tools?', answer: 'Absolutely! TeamSync integrates with popular tools like Slack, GitHub, Jira, Google Workspace, and many more through our extensive API.' },
    { question: 'What happens if I exceed my plan limits?', answer: "We'll notify you when you're approaching your limits. You can upgrade your plan at any time to accommodate your team's growth." },
    { question: 'Do you offer enterprise support?', answer: 'Yes, we offer dedicated enterprise support with 24/7 assistance, custom SLAs, and a dedicated account manager for our Enterprise plan.' },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e0e5ec] px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#a3b1c6]/40 blur-3xl" />
        <div className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-[#c4b5fd]/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-[#4a5568] md:text-5xl">
            How Can We <span className="text-indigo-500">Help You?</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium text-[#718096]">
            Find answers to common questions, or reach out to our support team.
          </p>
        </div>

        {/* Search (inset clay) */}
        <div className="relative mx-auto mb-12 max-w-2xl">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border-none bg-[#e0e5ec] py-4 pl-12 pr-4 text-lg font-medium text-[#4a5568] placeholder-[#a0aec0]
              shadow-[inset_5px_5px_12px_#b8bec7,inset_-5px_-5px_12px_#ffffff]
              focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:ring-offset-0"
          />
        </div>

        {/* Quick links */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: FaBook, label: 'Documentation' },
            { icon: FaVideo, label: 'Video Tutorials' },
            { icon: FaComments, label: 'Live Chat' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`group cursor-pointer rounded-[1.75rem] p-6 text-center transition-all duration-150 hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff] ${clayRaised}`}
            >
              <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${clayRaised}`}>
                <item.icon className="text-xl text-indigo-500 transition-transform group-hover:scale-110" />
              </div>
              <p className="font-bold text-[#4a5568]">{item.label}</p>
              <p className="flex items-center justify-center gap-1 text-xs font-semibold text-[#718096]">
                Learn more <FaArrowRight className="text-[10px]" />
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className={`rounded-[2rem] p-6 ${clayRaised}`}>
          <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-extrabold text-[#4a5568]">
            <FaQuestionCircle className="text-indigo-500" />
            Frequently Asked <span className="text-indigo-500">Questions</span>
          </h2>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isOpen = expandedFaq === index
                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-2xl transition-all duration-150 ${
                      isOpen
                        ? 'bg-[#e0e5ec] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]'
                        : `${clayRaised} hover:shadow-[7px_7px_16px_#b8bec7,-7px_-7px_16px_#ffffff]`
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm font-bold text-[#4a5568]">{faq.question}</span>
                      <FaChevronDown
                        className={`text-indigo-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-sm font-medium text-[#718096]">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-8 text-center">
              <FaSearch className="mx-auto mb-3 text-4xl text-[#c3cad5]" />
              <p className="font-bold text-[#718096]">No results found for "{searchQuery}"</p>
              <p className="mt-1 text-xs font-medium text-[#a0aec0]">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Still need help */}
        <div className={`mt-12 rounded-[2rem] p-8 text-center ${clayRaised}`}>
          <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full ${clayRaised}`}>
            <FaHeadset className="text-2xl text-indigo-500" />
          </div>
          <h3 className="mb-2 text-xl font-extrabold text-[#4a5568]">Still Need Help?</h3>
          <p className="mb-5 font-medium text-[#718096]">Our support team is available 24/7 to assist you.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border-none py-3 px-8 font-bold text-white
              bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa]
              shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]
              transition-all duration-150
              hover:from-[#6b8cf4] hover:to-[#9d7cf8]
              hover:shadow-[10px_10px_24px_#b8bec7,-10px_-10px_24px_#ffffff]
              active:shadow-[inset_5px_5px_12px_rgba(90,70,200,0.4),inset_-5px_-5px_12px_rgba(255,255,255,0.5)]">
              <FaHeadset /> Contact Support
            </button>
            <button className={`inline-flex items-center justify-center gap-2 rounded-2xl py-3 px-8 font-bold text-[#4a5568] ${clayRaised} hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]`}>
              <FaUsers /> Community Forum
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage