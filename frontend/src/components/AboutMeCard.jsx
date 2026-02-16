import React from 'react'

const AboutMeCard = ({ name, role, bio, image, socialLinks }) => {
  return (
    <div className="glass-card p-8 max-w-2xl mx-auto transform hover:-translate-y-2 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <img
            src={image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Developer"}
            alt={name}
            className="relative w-40 h-40 rounded-full border-4 border-slate-800 object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-cyan-400 font-medium mb-4">{role}</p>
          <p className="text-slate-300 mb-6 leading-relaxed">
            {bio}
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            {socialLinks && Object.entries(socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700 hover:text-cyan-400 transition-colors text-slate-400"
              >
                <span className="capitalize">{platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMeCard
