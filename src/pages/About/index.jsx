import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-[#0C2A43] text-white pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Hero */}
        <section className="text-center space-y-5">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-cyan-400 drop-shadow-lg">
            About Cryptionary
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Your modern, real‑time cryptocurrency dashboard. Built to be fast,
            reliable, and packed with features – even when the internet doesn’t
            cooperate.
          </p>
        </section>

        {/* Core Features */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-cyan-300 border-b border-cyan-700 pb-2">
            Current Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🔍"
              title="Smart Search"
              desc="Find any coin by name or symbol, with instant filtering and quick navigation to detailed views."
            />
            <FeatureCard
              icon="📊"
              title="Interactive Charts"
              desc="Multi‑timeframe price, volume, and market cap charts with custom crosshairs and compact sparklines."
            />
            <FeatureCard
              icon="💱"
              title="Currency Converter"
              desc="Convert between 2000+ cryptos and all major fiat currencies, all powered by live exchange rates."
            />
            <FeatureCard
              icon="⭐"
              title="Persistent Watchlist"
              desc="Save your favorite coins locally. Your watchlist stays even after you close the browser."
            />
            <FeatureCard
              icon="📈"
              title="Top Gainers & Losers"
              desc="Instantly see which coins are moving the most over any timeframe, from 15 minutes to 1 year."
            />
            <FeatureCard
              icon="📡"
              title="Offline Resilience"
              desc="Self‑hosted coin icons and automatic fallback data keep the app running when external APIs are unreachable."
            />
          </div>
        </section>

        {/* Future Plans */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-cyan-300 border-b border-cyan-700 pb-2">
            On the Roadmap
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🖼️",
                text: "NFT Explorer – browse trending NFT collections",
              },
              {
                icon: "🏦",
                text: "Exchange Integration – compare prices across exchanges",
              },
              {
                icon: "⚖️",
                text: "Coin Comparison – side‑by‑side analysis of multiple coins",
              },
              { icon: "📰", text: "News Feed – real‑time crypto headlines" },
              {
                icon: "🎓",
                text: "Learning Center – guides, glossary, and tutorials",
              },
              { icon: "📝", text: "Blog – articles and project updates" },
              {
                icon: "🔐",
                text: "User Accounts – sync your watchlist and preferences",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-3 bg-cyan-900/20 backdrop-blur-sm rounded-xl p-4 shadow-md shadow-black/30 hover:bg-cyan-800/30 hover:shadow-black/70 hover:-translate-y-0.5 cursor-default transition"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-200">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-cyan-300 border-b border-cyan-700 pb-2">
            Under the Hood
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "React 19",
              "Vite",
              "Tailwind CSS 4",
              "Chart.js",
              "CoinGecko API",
              "CoinPaprika API",
              "React Router",
              "localStorage",
              "SVG Sparklines",
              "Shadcn UI",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-cyan-800 text-cyan-200 px-4 py-2 rounded-full text-sm font-medium shadow-md shadow-black/30 hover:shadow-black/70 hover:-translate-y-0.5 cursor-default transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Why Cryptionary */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold text-cyan-300 border-b border-cyan-700 pb-2">
            Why Cryptionary?
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Cryptionary was born from a desire to push front‑end development
            skills to their limits while creating a genuinely useful tool for
            the crypto community. Every feature is hand‑crafted with modern
            React, responsive APIs, and a focus on performance and usability.
            It’s a project that demonstrates real‑world problem solving – from
            handling live market data to building custom charts and
            offline‑ready fallbacks.
          </p>
        </section>

        {/* About the Developer */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-cyan-300 border-b border-cyan-700 pb-2">
            Behind the Code
          </h2>
          <div className="bg-cyan-900/30 backdrop-blur-sm rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
              👨‍💻
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold">Hosein.dev</h3>
              <p className="text-gray-300 mt-1">
                Front‑end web developer crafting modern, performant web
                experiences. Check out my work and social links below. Feel free
                to share a message :)
              </p>
              <div className="mt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
                <SocialLink
                  href="https://Hosein.dev"
                  label="Portfolio"
                  icon="🌐"
                />
                <SocialLink
                  href="https://github.com/hosein-rad"
                  label="GitHub"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                    </svg>
                  }
                />
                <SocialLink
                  href="https://www.linkedin.com/in/hosein-dev/"
                  label="LinkedIn"
                  icon="💼"
                />
                <SocialLink
                  href="mailto:contact@hosein.dev"
                  label="Email"
                  icon={
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="style=linear">
                        <g id="email">
                          <path
                            id="vector"
                            d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            id="vector_2"
                            d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </g>
                      </g>
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm pt-8 border-t border-cyan-900">
          Cryptionary is an independent project and is not affiliated with
          CoinGecko or CoinPaprika. Market data is provided by their free public
          APIs.
        </div>
      </div>
    </div>
  );
}

// Reusable feature card
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-cyan-900/30 backdrop-blur-sm rounded-xl p-5 hover:bg-cyan-800/40 transition duration-300 shadow-md shadow-black/30 hover:shadow-black/70 hover:-translate-y-1 cursor-default group">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-cyan-300 mb-1">{title}</h3>
        <div className="justify-between text-3xl mb-2 group-hover:scale-110 group-hover:-translate-x-3 transition-transform">
          {icon}
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// Social link button
function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-800/50 hover:bg-cyan-700/70 rounded-full text-sm text-white transition hover:scale-105"
    >
      <span className="text-lg">{icon}</span>
      {label}
    </a>
  );
}
