import React from "react";
import Marquee from "react-fast-marquee";
import { companiesLogo } from "../../data/companiesLogo";

export default function MarqueeSection() {
  return (
    <section className="relative w-full bg-black py-12 overflow-hidden select-none border-y border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <div className="flex-shrink-0 text-left">
          <p className="text-xs font-mono text-zinc-400 max-w-[130px] leading-tight">
            Trusted by 100+ top-tier brands
          </p>
        </div>

        <div className="flex-1 overflow-hidden">
          <Marquee gradient={true} speed={25} gradientColor="#000000" gradientWidth={60}>
            <div className="flex items-center gap-12 sm:gap-16">
              {[...companiesLogo, ...companiesLogo].map((company, index) => (
                <img
                  key={index}
                  className="opacity-40 grayscale contrast-125 transition-all duration-200 hover:opacity-100 hover:grayscale-0 h-6 brightness-125"
                  src={company.logo}
                  alt={company.name}
                />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
