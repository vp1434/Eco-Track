import React from 'react'
import AboutMeCard from '../components/AboutMeCard'
import kailashImage from '../image/kks.png'
import bikkiImage from '../image/bbb.jpg'
import shubhamImage from '../image/shubham.png'
import mukeshImage from '../image/mukesh.png'
import vikashImage from '../image/vikash.avif'

const About = () => {
  const teamMembers = [
    {
      name: 'Kailash Kumar',
      role: 'Lead Developer',
      bio: 'Full-stack wizard with a passion for sustainable tech.',
      avatar: kailashImage,
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Mukesh Pandit',
      role: 'UI/UX Designer',
      bio: 'Crafting intuitive and beautiful digital experiences.',
      avatar: mukeshImage,
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Shubham Kumar',
      role: 'Data Scientist',
      bio: 'Turning complex data into actionable insights.',
      avatar: shubhamImage,
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Vikash Kumar',
      role: 'Backend Engineer',
      bio: 'Architecting robust and scalable server solutions.',
      avatar: vikashImage,
      social: { linkedin: '#', github: '#', twitter: '#' }
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Sustainable Campuses</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Our mission is to empower educational institutions with AI-driven insights to minimize waste and optimize energy consumption for a greener future.
        </p>
      </div>

      {/* Stats/Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-leaf text-2xl text-emerald-500"></i>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Eco-Friendly</h3>
          <p className="text-slate-400 text-sm">Reducing carbon footprints through smart monitoring.</p>
        </div>
        <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-chart-line text-2xl text-blue-500"></i>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Data-Driven</h3>
          <p className="text-slate-400 text-sm">Real-time analytics for informed decision making.</p>
        </div>
        <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-brain text-2xl text-purple-500"></i>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
          <p className="text-slate-400 text-sm">Predictive modeling for future resource planning.</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 mt-4">The brilliant minds behind EcoTrack.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="glass-card p-6 text-center group">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-full border-4 border-slate-800 shadow-xl relative z-10"
                />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
              <p className="text-cyan-400 text-sm font-medium mb-3">{member.role}</p>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2">{member.bio}</p>

              <div className="flex justify-center space-x-4">
                <a href={member.social.github} className="text-slate-500 hover:text-white transition-colors">
                  <i className="fa-brands fa-github text-lg"></i>
                </a>
                <a href={member.social.linkedin} className="text-slate-500 hover:text-blue-400 transition-colors">
                  <i className="fa-brands fa-linkedin text-lg"></i>
                </a>
                <a href={member.social.twitter} className="text-slate-500 hover:text-cyan-400 transition-colors">
                  <i className="fa-brands fa-twitter text-lg"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Developer Section */}
      <div className="mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">About The Developer</h2>
          <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
        </div>
        <AboutMeCard
          name="Bikki Kumar Pandit"
          role="Full Stack Developer"
          bio="Passionate developer building sustainable solutions with AI and modern web technologies. Dedicated to creating impactful applications that solve real-world problems."
          image={bikkiImage}
          socialLinks={{
            github: "https://github.com/vp1434",
            linkedin: "https://in.linkedin.com/in/bikki-kumar-pandit-b98b34259",
            portfolio: "https://bikkitech-x.vercel.app/"
          }}
        />
      </div>
    </div>
  )
}

export default About
