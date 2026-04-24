"use client";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper pt-[60px] pb-6 border-t-4 border-red">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-[360px]">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 grid place-items-center bg-red text-white rounded-[2px] font-[Orbitron] font-extrabold text-base tracking-tight">
                P/
              </div>
              <span className="font-[Orbitron] font-extrabold text-lg tracking-[0.04em] text-white">
                PORTO<span className="text-red">/</span>FLUX
              </span>
            </a>
            <p className="text-white/[0.55] text-[13px] leading-[1.7] mt-4">
              Personal portfolio of Ayla Nakamura — website &amp; mobile developer based in Jakarta,
              available worldwide.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h5 className="m-0 mb-3.5 font-mono text-[11px] text-red tracking-[0.2em] uppercase">
              Sitemap
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {["Home", "Skills", "Work", "Reviews", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                    className="text-white/70 text-[13px] transition-colors duration-200 hover:text-cyan"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="m-0 mb-3.5 font-mono text-[11px] text-red tracking-[0.2em] uppercase">
              Social
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {["GitHub ↗", "LinkedIn ↗", "Twitter / X ↗", "Dribbble ↗"].map((item) => (
                <li key={item}>
                  <a className="text-white/70 text-[13px] transition-colors duration-200 hover:text-cyan cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="m-0 mb-3.5 font-mono text-[11px] text-red tracking-[0.2em] uppercase">
              Contact
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li>
                <a className="text-white/70 text-[13px] transition-colors duration-200 hover:text-cyan cursor-pointer">
                  hello@portoflux.dev
                </a>
              </li>
              <li>
                <a className="text-white/70 text-[13px] transition-colors duration-200 hover:text-cyan cursor-pointer">
                  +62 811 4242 042
                </a>
              </li>
              <li>
                <a className="text-white/70 text-[13px] transition-colors duration-200 hover:text-cyan cursor-pointer">
                  Jakarta · UTC+7
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-white/10 font-mono text-[11px] text-white/40 tracking-[0.08em] gap-3">
          <span>© 2026 PortoFlux · built with coffee &amp; electricity</span>
          <div className="flex gap-[18px]">
            <span>v2.0.26</span>
            <span>EN · ID</span>
            <a
              href="#"
              className="text-cyan hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ↑ back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
