import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/marketing/contact-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-bold text-gray-900">AI for Dance Studios</div>
        <div className="flex items-center gap-6">
          <Link href="#solutions" className="text-gray-600 hover:text-gray-900 hidden sm:block">
            Solutions
          </Link>
          <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 hidden sm:block">
            How It Works
          </Link>
          <Link href="#contact">
            <Button>Book a Call</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
            AI-Powered Automation for Dance Studios
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Stop Running Your Studio.
            <br />
            <span className="text-blue-600">Start Growing It.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
            Your front desk is drowning in scheduling conflicts, missed follow-ups, and parent emails.
            Our AI automation handles the busywork so you can focus on what you do best: teaching dance.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#contact">
              <Button size="lg" className="w-full sm:w-auto text-base px-8">
                Get Your Free Automation Assessment
              </Button>
            </Link>
            <Link href="#solutions">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8">
                See What We Automate
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Works with MindBody, WellnessLiving, Jackrabbit, and more
          </p>
        </div>

        {/* Pain Points Section */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sound Familiar?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Running a dance studio means juggling a hundred things at once.
              Most of them shouldn&apos;t need your attention.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-gray-800">
                &ldquo;I spend <span className="font-semibold text-red-700">3+ hours daily</span> just managing the schedule and fielding parent texts.&rdquo;
              </p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-gray-800">
                &ldquo;We lose students and <span className="font-semibold text-red-700">don&apos;t even know</span> they were thinking of leaving until they&apos;re gone.&rdquo;
              </p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-gray-800">
                &ldquo;I have no idea which classes are actually <span className="font-semibold text-red-700">making money</span> and which are dragging us down.&rdquo;
              </p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-gray-800">
                &ldquo;Social media and emails fall through the cracks because <span className="font-semibold text-red-700">who has time</span> for marketing?&rdquo;
              </p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-gray-800">
                &ldquo;When a teacher is out sick, the <span className="font-semibold text-red-700">scramble to find a sub</span> ruins my entire day.&rdquo;
              </p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-gray-800">
                &ldquo;Costume updates, recital info, tuition reminders... <span className="font-semibold text-red-700">parents never read them</span> anyway.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div id="solutions" className="mt-24 sm:mt-32 scroll-mt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              AI Automation Built for Dance Studios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We build custom AI systems that handle the repetitive work crushing your team.
              Here&apos;s what we can automate for you.
            </p>
          </div>

          <div className="space-y-8">
            {/* Solution 1: Scheduling */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Intelligent Scheduling Agent
                  </h3>
                  <p className="text-gray-600 mb-4">
                    An AI that handles class bookings, instructor availability conflicts, waitlist management,
                    and automated rescheduling when teachers call out. It integrates with your existing studio
                    software and handles the back-and-forth that currently eats up front desk time.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Class bookings</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Waitlist management</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Sub coordination</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Conflict resolution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 2: Student Retention */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Student Retention & Engagement System
                  </h3>
                  <p className="text-gray-600 mb-4">
                    AI that tracks attendance patterns, identifies students at risk of dropping out,
                    and triggers personalized outreach before they churn. Automated check-ins after missed classes,
                    progression milestone celebrations, and class recommendations based on history and goals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Churn prediction</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Automated outreach</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Milestone celebrations</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Class recommendations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 3: Revenue Intelligence */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Revenue Optimization Dashboard
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Data intelligence for studio owners operating on thin margins. Dashboards visualizing
                    class profitability by instructor, time slot, and style. Identify which class combinations
                    correlate with longer retention. Forecast seasonal enrollment dips to plan marketing pushes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Class profitability</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Retention analytics</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Seasonal forecasting</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Marketing insights</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 4: Content & Marketing */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Content & Marketing Automation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    AI that handles the content your studio constantly needs: social media posts,
                    email sequences for new student nurturing, and recital or event promotion.
                    Drafts class descriptions, creates instructor spotlights, and generates practice tip content.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Social content</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Email sequences</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Event promotion</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Instructor spotlights</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 5: Knowledge Management */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Instructor Knowledge Base
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A searchable AI system capturing choreography notes, music licensing details,
                    curriculum progressions, and substitute instructor guidelines. Essential for
                    multi-location studios where institutional knowledge often walks out the door.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Choreography notes</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Music licensing</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Curriculum tracking</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Sub guidelines</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 6: Parent Communication */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Parent Communication Hub
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Automated costume and recital updates, tuition reminders, and progress reports
                    for youth-focused studios. Reduce administrative burden with smart communication
                    that reaches parents at the right time, through the right channel.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Costume updates</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Recital info</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Tuition reminders</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Progress reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="mt-24 sm:mt-32 scroll-mt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it simple to get started. No technical expertise required on your end.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Discovery Call</h3>
              <p className="text-gray-600">
                We learn about your studio, your pain points, and which automations would have the biggest impact on your operations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Build</h3>
              <p className="text-gray-600">
                We build your AI automation system, integrating with your existing tools like MindBody, WellnessLiving, or Jackrabbit.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Launch & Support</h3>
              <p className="text-gray-600">
                We deploy your system and provide ongoing support. You get time back while your automation handles the busywork.
              </p>
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Integrates With Your Existing Tools
            </h2>
            <p className="text-gray-600">
              We connect with the studio management software you already use.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <div className="text-xl font-semibold text-gray-700">MindBody</div>
            <div className="text-xl font-semibold text-gray-700">WellnessLiving</div>
            <div className="text-xl font-semibold text-gray-700">Jackrabbit</div>
            <div className="text-xl font-semibold text-gray-700">Studio Director</div>
            <div className="text-xl font-semibold text-gray-700">DanceStudio-Pro</div>
          </div>
        </div>

        {/* Testimonial Section (Placeholder) */}
        <div className="mt-24 sm:mt-32 bg-gray-50 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl sm:text-2xl text-gray-700 mb-6">
              &ldquo;Before working with AI for Dance Studios, I was spending 20+ hours a week on scheduling
              and parent emails. Now I actually have time to teach and grow my business. The automation
              paid for itself in the first month.&rdquo;
            </p>
            <div>
              <p className="font-semibold text-gray-900">Studio Owner</p>
              <p className="text-gray-500">Multi-location Dance Studio</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-24 sm:mt-32 scroll-mt-16">
          <div className="bg-blue-600 rounded-3xl p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to Automate Your Studio?
                </h2>
                <p className="text-blue-100 text-lg mb-6">
                  Get a free automation assessment. We&apos;ll identify the biggest time-wasters
                  in your operations and show you exactly how AI can help.
                </p>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Free 30-minute consultation
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom automation roadmap
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No commitment required
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Book Your Free Assessment
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 sm:mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How long does implementation take?
              </h3>
              <p className="text-gray-600">
                Most automations are up and running within 2-4 weeks, depending on complexity
                and integrations required. We work around your schedule to minimize disruption.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Do you work with studios of all sizes?
              </h3>
              <p className="text-gray-600">
                Yes. Whether you&apos;re a single-location studio or have multiple facilities,
                we can tailor automation solutions to fit your specific needs and budget.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What if my software isn&apos;t listed?
              </h3>
              <p className="text-gray-600">
                We integrate with most modern studio management systems. If you use something
                different, let us know. We can usually find a way to connect.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What&apos;s the typical ROI?
              </h3>
              <p className="text-gray-600">
                Most studios see ROI within 2-3 months through time savings, reduced churn,
                and improved operational efficiency. We&apos;ll help you calculate potential savings during your assessment.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-32 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xl font-bold text-gray-900">AI for Dance Studios</div>
            <div className="flex gap-6 text-gray-600">
              <Link href="#solutions" className="hover:text-gray-900">Solutions</Link>
              <Link href="#how-it-works" className="hover:text-gray-900">How It Works</Link>
              <Link href="#contact" className="hover:text-gray-900">Contact</Link>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} AI for Dance Studios. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
