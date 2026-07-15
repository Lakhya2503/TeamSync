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
  FaArrowRight
} from 'react-icons/fa'
import { MdHelpOutline } from 'react-icons/md'

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How do I get started with TeamSync?',
      answer: 'Getting started is easy! Simply create an account, invite your team members, and start creating projects. Our onboarding guide will walk you through the entire process.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes! TeamSync offers native mobile apps for both iOS and Android. You can download them from the App Store or Google Play Store.'
    },
    {
      question: 'How secure is my data?',
      answer: 'We take security seriously. TeamSync uses enterprise-grade encryption, regular security audits, and complies with GDPR and CCPA regulations.'
    },
    {
      question: 'Can I integrate TeamSync with other tools?',
      answer: 'Absolutely! TeamSync integrates with popular tools like Slack, GitHub, Jira, Google Workspace, and many more through our extensive API.'
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'We\'ll notify you when you\'re approaching your limits. You can upgrade your plan at any time to accommodate your team\'s growth.'
    },
    {
      question: 'Do you offer enterprise support?',
      answer: 'Yes, we offer dedicated enterprise support with 24/7 assistance, custom SLAs, and a dedicated account manager for our Enterprise plan.'
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How Can We <span className="text-indigo-600">Help You?</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions, or reach out to our support team.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-12 border-2 border-indigo-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-lg"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 text-xl" />
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: FaBook, label: 'Documentation', color: 'indigo' },
            { icon: FaVideo, label: 'Video Tutorials', color: 'indigo' },
            { icon: FaComments, label: 'Live Chat', color: 'indigo' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 text-center cursor-pointer group"
            >
              <item.icon className="text-4xl text-indigo-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-gray-800">{item.label}</p>
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                Learn more
                <FaArrowRight className="text-xs" />
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border-2 border-indigo-100 p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h2>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-indigo-100 rounded-xl overflow-hidden hover:border-indigo-300 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-indigo-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <FaChevronDown className={`text-indigo-600 transition-transform duration-200 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-indigo-50 border-t border-indigo-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaSearch className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-12 text-center bg-gradient-to-r from-indigo-50 to-white rounded-2xl p-8 border-2 border-indigo-100">
          <FaHeadset className="text-4xl text-indigo-500 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Still Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is available 24/7 to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-300/50 transition-all duration-200">
              <FaHeadset />
              Contact Support
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-indigo-300 hover:border-indigo-400 text-gray-700 font-semibold rounded-lg transition-all duration-200">
              <FaUsers />
              Community Forum
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage