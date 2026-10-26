import React, { useState } from 'react'
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
  FaInfoCircle,
} from 'react-icons/fa'

const clayRaised = 'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const clayInput =
    'w-full rounded-2xl border-none bg-[#e0e5ec] px-4 py-3 text-[#4a5568] placeholder-[#a0aec0] ' +
    'shadow-[inset_5px_5px_12px_#b8bec7,inset_-5px_-5px_12px_#ffffff] transition-shadow duration-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:ring-offset-0 resize-none'

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e0e5ec] px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#a3b1c6]/40 blur-3xl" />
        <div className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-[#c4b5fd]/40 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-96 w-96 rounded-full bg-[#a5b4fc]/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-[#4a5568] md:text-5xl">
            Let's <span className="text-indigo-500">Connect</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium text-[#718096]">
            Have questions or need support? We're here to help. Reach out to us anytime.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Form */}
          <div className={`rounded-[2rem] p-8 ${clayRaised}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
                { id: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email' },
                { id: 'subject', label: 'Subject', placeholder: 'How can we help?', type: 'text' },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="mb-2 block text-sm font-bold text-[#4a5568]">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    id={f.id}
                    name={f.id}
                    value={(formData as any)[f.id]}
                    onChange={handleChange}
                    required
                    className={clayInput}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-bold text-[#4a5568]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={clayInput}
                  placeholder="Tell us what you need..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-none py-3 font-bold text-white
                  bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa]
                  shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]
                  transition-all duration-150
                  hover:from-[#6b8cf4] hover:to-[#9d7cf8]
                  hover:shadow-[10px_10px_24px_#b8bec7,-10px_-10px_24px_#ffffff]
                  active:shadow-[inset_5px_5px_12px_rgba(90,70,200,0.4),inset_-5px_-5px_12px_rgba(255,255,255,0.5)]"
              >
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className={`rounded-[2rem] p-8 ${clayRaised}`}>
              <h3 className="mb-6 text-xl font-extrabold text-[#4a5568]">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: FaEnvelope, label: 'Email', value: 'support@teamsync.com', href: 'mailto:support@teamsync.com' },
                  { icon: FaPhone, label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${clayRaised}`}>
                      <row.icon className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#718096]">{row.label}</p>
                      <a href={row.href} className="text-sm font-semibold text-indigo-500 hover:text-indigo-600">
                        {row.value}
                      </a>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${clayRaised}`}>
                    <FaMapMarkerAlt className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#718096]">Location</p>
                    <p className="text-sm font-medium text-[#4a5568]">123 Collaboration St, Suite 100</p>
                    <p className="text-sm font-medium text-[#4a5568]">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-[2rem] p-8 ${clayRaised}`}>
              <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-[#4a5568]">
                <FaClock className="text-indigo-500" /> Office Hours
              </h3>
              <div className="space-y-2 text-sm font-medium text-[#718096]">
                <div className="flex justify-between"><span>Monday – Friday</span><span className="font-bold text-[#4a5568]">9:00 AM – 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="font-bold text-[#4a5568]">10:00 AM – 4:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="font-bold text-rose-500">Closed</span></div>
              </div>
            </div>

            <div className={`flex items-center gap-3 rounded-[2rem] p-6 ${clayRaised}`}>
              <FaInfoCircle className="text-xl text-indigo-500" />
              <p className="text-sm font-medium text-[#718096]">
                Our team typically responds within <span className="font-bold text-indigo-500">24 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage