export default function About() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      bio: 'Former transit planner with 10+ years experience in urban mobility.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-founder',
      bio: 'Full-stack engineer passionate about data-driven transportation solutions.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of Data Science',
      bio: 'PhD in Urban Planning, specializing in transit optimization algorithms.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ]

  const values = [
    {
      title: 'Accessibility First',
      description: 'We believe public transportation should be accessible to everyone, everywhere.',
      icon: '♿'
    },
    {
      title: 'Data-Driven',
      description: 'Every decision is backed by real-time data and comprehensive analytics.',
      icon: '📊'
    },
    {
      title: 'Sustainability',
      description: 'Promoting eco-friendly transportation options for a greener future.',
      icon: '🌱'
    },
    {
      title: 'Innovation',
      description: 'Constantly evolving our technology to improve the transit experience.',
      icon: '🚀'
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container-px mx-auto max-w-6xl section-y">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            About BusLens
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            We're building the future of public transportation through smart technology, 
            real-time data, and user-centered design.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              To make public transportation more efficient, accessible, and enjoyable for everyone. 
              We combine cutting-edge technology with deep understanding of urban mobility challenges 
              to create solutions that work for riders, operators, and cities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-600 mb-2">50K+</div>
                <div className="text-zinc-600 dark:text-zinc-400">Daily Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-600 mb-2">24</div>
                <div className="text-zinc-600 dark:text-zinc-400">Cities Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-600 mb-2">95%</div>
                <div className="text-zinc-600 dark:text-zinc-400">User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {value.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  {member.name}
                </h3>
                <p className="text-brand-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Our Story
            </h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                BusLens was born from a simple observation: public transportation systems 
                around the world are struggling to keep up with the demands of modern urban life. 
                While cities are growing rapidly, transit infrastructure often lags behind, 
                leading to overcrowded buses, unpredictable wait times, and frustrated riders.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                Our founders, Sarah and Marcus, met while working on a city planning project 
                in San Francisco. They realized that the solution wasn't just building more 
                infrastructure, but making existing systems smarter and more responsive to 
                real-time conditions.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Today, BusLens serves over 50,000 daily users across 24 cities, helping 
                them navigate their daily commutes with confidence and ease. We're proud 
                to be part of the solution for sustainable, efficient urban mobility.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Have questions about BusLens or want to partner with us? 
            We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@buslens.com"
              className="inline-flex items-center px-6 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              View Careers
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
