export default function Homepage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-inter">
      {/* Navigation Bar */}


      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl text-center">
          <div className="animate-fadeInScale">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight text-gray-900 font-syne">
              Building Africa's Next Generation of Scalable Digital Products
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              A technology studio building world-class software for ambitious teams.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
              Book A Call
            </button>
          </div>
        </div>

        {/* Hero Images Display */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 flex justify-around items-end px-10 opacity-70">
          <div className="w-20 h-32 md:w-32 md:h-48 rounded-lg overflow-hidden shadow-xl animate-float">
            <img src="https://framerusercontent.com/images/Ryo4JaLObfaEyNx9ZInFl4YtVM.png" alt="Project" className="w-full h-full object-cover" />
          </div>
          <div className="w-20 h-32 md:w-32 md:h-48 rounded-lg overflow-hidden shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
            <img src="https://framerusercontent.com/images/sWSbzxm8z3IWTVlRlYV6cI2rg.png" alt="Project" className="w-full h-full object-cover" />
          </div>
          <div className="w-20 h-32 md:w-32 md:h-48 rounded-lg overflow-hidden shadow-xl animate-float" style={{ animationDelay: '1s' }}>
            <img src="https://framerusercontent.com/images/x0qO5TJPYvbIx3dNcR897Yt3Y.png" alt="Project" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Latest Work Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Latest Work Title and Description */}
            <div>
              <div className="flex flex-col gap-4">
                <p className="text-blue-600 font-semibold text-lg font-syne">Latest</p>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 font-syne leading-tight">
                  work
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                  Join 40+ companies already growing with our innovative digital solutions.
                </p>
              </div>
              
              <div className="mt-12 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Proven Track Record</h3>
                    <p className="text-gray-600 mt-1">Successful projects across industries</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Expert Team</h3>
                    <p className="text-gray-600 mt-1">Dedicated professionals with deep expertise</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Spinning Carousel Background */}
            <div className="relative h-96 lg:h-full min-h-96 flex items-center justify-center">
              {/* Animated Spinning Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer Spinning Ring */}
                <div className="absolute w-80 h-80 border-2 border-transparent border-t-blue-400 border-r-purple-400 rounded-full animate-spin-slow"></div>
                
                {/* Middle Ring */}
                <div className="absolute w-64 h-64 border-2 border-transparent border-b-blue-300 border-l-purple-300 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>
                
                {/* Inner Ring with Glow */}
                <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse-glow shadow-2xl"></div>

                {/* Center Content */}
                <div className="absolute w-40 h-40 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center z-10">
                  <p className="text-center">
                    <span className="text-4xl font-bold text-blue-600 font-syne">40+</span>
                    <br />
                    <span className="text-gray-600 text-sm">Companies</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center text-gray-900 font-syne">
              Apps, websites, logos and more
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
              Discover all your essentials in one convenient location.
            </p>
          </div>

          {/* 3x3 Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Row 1 */}
            <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <img 
                src="https://framerusercontent.com/images/IQc6LCgHy6DiMY2U33ZTTbzPmA.jpg" 
                alt="Mobile App" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/60 transition-all duration-300 flex items-end">
                <p className="text-white font-bold p-6 text-lg font-syne">Mobile App</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <img 
                src="https://framerusercontent.com/images/FcltPQKF2o59IqCfVBoA34aPI1M.jpg" 
                alt="UI/UX" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/60 transition-all duration-300 flex items-end">
                <p className="text-white font-bold p-6 text-lg font-syne">UI/UX</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <img 
                src="https://framerusercontent.com/images/nkdc0GZXfH0Fx1SmnwsXtDpE8.jpg" 
                alt="Logo Design" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/60 transition-all duration-300 flex items-end">
                <p className="text-white font-bold p-6 text-lg font-syne">Logo Design</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <img 
                src="https://framerusercontent.com/images/VCbF3Wc09w9DQrxygCIxb8ewwM.jpg" 
                alt="Web Design" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/60 transition-all duration-300 flex items-end">
                <p className="text-white font-bold p-6 text-lg font-syne">Web Design</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <img 
                src="https://framerusercontent.com/images/albPZgc8p8l89NTLa6LasY2y3Q.jpg" 
                alt="Platform" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/60 transition-all duration-300 flex items-end">
                <p className="text-white font-bold p-6 text-lg font-syne">Platform</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <img 
                src="https://framerusercontent.com/images/1gyIEROvsPRK0pguIyhvLa4dA.jpg" 
                alt="Brand Identity" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/60 transition-all duration-300 flex items-end">
                <p className="text-white font-bold p-6 text-lg font-syne">Brand Identity</p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <img 
                src="https://framerusercontent.com/images/o8TH1l3EJ38byXmIQb6yPx54A0.jpg" 
                alt="Dashboard" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/60 transition-all duration-300 flex items-end">
                <p className="text-white font-bold p-6 text-lg font-syne">Dashboard</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <img 
                src="https://framerusercontent.com/images/wnfv9hM8JxoEzLrQyQAC5Iw0J0.jpg" 
                alt="Website" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/60 transition-all duration-300 flex items-end">
                <p className="text-white font-bold p-6 text-lg font-syne">Website</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <img 
                src="https://framerusercontent.com/images/7YqRDx7sHd9Fy8L69HwVZj2iT4.jpg" 
                alt="Illustration" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/60 transition-all duration-300 flex items-end">
                <p className="text-white font-bold p-6 text-lg font-syne">Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 font-syne mb-6">
              From Concept to Code
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our founder-led process ensures your product is built on time, on budget, and ready to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                number: '01',
                icon: '🔍', 
                title: 'Discovery & Strategy', 
                desc: 'We analyze your requirements and business goals to architect a roadmap that works.' 
              },
              { 
                number: '02',
                icon: '⚙️', 
                title: 'Agile Development', 
                desc: 'Our full-stack team builds your solution using scalable code, running rigorous tests at every sprint.' 
              },
              { 
                number: '03',
                icon: '🚀', 
                title: 'Launch & Scale', 
                desc: 'We handle deployment and provide ongoing support to help you grow your user base.' 
              },
            ].map((service, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white p-10 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 h-full">
                  <div className="text-5xl font-bold text-gray-100 font-syne mb-4">{service.number}</div>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 font-syne mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 font-syne mb-6">
              How We Deliver Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine technical expertise with structured execution to build software that performs and scales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '✓', title: 'Structured Process', desc: 'Clear discovery, architecture, and execution from idea to deployment.' },
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Efficient workflows that move projects forward without compromising quality.' },
              { icon: '🎨', title: 'Product-Focused Design', desc: 'Thoughtful UI/UX that balances usability and performance.' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'Flexible models including project-based, retainer, or partnership structures.' },
              { icon: '🔧', title: 'Scalable Architecture', desc: 'Systems designed to integrate, expand, and evolve.' },
              { icon: '🛡️', title: 'Reliable Delivery', desc: 'Tested, optimized, and maintained for long-term stability.' },
            ].map((feature, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white border-2 border-blue-400 text-blue-600 font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-syne mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 font-syne mb-6">
              View Our Current Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our latest projects showcasing our most recent and innovative work.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
              {[
                { name: 'GreenLeaf', year: '2024', color: 'from-green-400 to-emerald-600' },
                { name: 'Artificial Intelligence (AI)', year: '2024', color: 'from-blue-400 to-blue-600' },
                { name: 'Natural Networks', year: '2024', color: 'from-purple-400 to-pink-600' },
                { name: 'Future Networks', year: '2024', color: 'from-orange-400 to-red-600' },
              ].map((project, idx) => (
                <div key={idx} className="group flex-shrink-0 w-full md:w-auto">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer">
                    {/* Project Card */}
                    <div className={`aspect-square bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                      {/* Animated background elements */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl group-hover:blur-2xl transition-all"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl group-hover:blur-2xl transition-all"></div>
                      </div>

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                        <div className="text-5xl mb-4 group-hover:scale-150 transition-transform">
                          {idx === 0 ? '🌿' : idx === 1 ? '🤖' : idx === 2 ? '🧠' : '🚀'}
                        </div>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="bg-white p-6 group-hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-bold text-gray-900 font-syne">{project.name}</h3>
                      <p className="text-gray-500 mt-2">{project.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 bg-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 font-syne mb-6">
              Our Perspective is One of Many
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers think of our work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Working with Pixelta was an eye-opening experience. They transformed our complex vision into a simple, beautiful reality.",
                author: 'Erlicha',
                role: 'Creative Director at Flowify',
                rating: 5
              },
              {
                text: "Pixelta exceeded all expectations. Their team went above and beyond to deliver a design that felt both modern and timeless.",
                author: 'Eliana',
                role: 'CEO of BrightPath',
                rating: 5
              },
              {
                text: "Pixelta turned our disjointed ideas into a sleek, cohesive vision—like a design maestro on a creative high.",
                author: 'Mardicha',
                role: 'Founder of Ordi',
                rating: 5
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>

                  <p className="text-gray-700 italic flex-grow leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 font-syne">{testimonial.author}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative bg-white border-2 border-blue-200 rounded-3xl p-16 md:p-20 text-center shadow-xl hover:shadow-2xl transition-all duration-500">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 font-syne mb-6 leading-tight">
                Are you ready to embark on this journey?
              </h2>
              <p className="text-xl text-gray-700 mb-12 leading-relaxed">
                This could be the beginning of something great.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-syne">
                  Contact Us
                </button>
                <button className="border-2 border-blue-600 bg-transparent text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-syne">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 border-t border-gray-800 py-16 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold text-lg mb-4 font-syne">Gidev Innovations</h3>
              <p className="text-gray-400 text-sm">Building world-class digital products for ambitious teams.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 font-syne">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 font-syne">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 font-syne">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© Gidev Innovations 2026. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400 text-sm mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
