import Marquee from "react-fast-marquee";
import { companiesLogo } from "../../data/companiesLogo";
import { useThemeContext } from "../../context/ThemeContext";

export default function MarqueeSection() {
  const { theme } = useThemeContext();

  return (
    <section className="px-6 py-16 mt-10">
      <p className="text-center text-[11px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-8">
        Integrates seamlessly with modern tech stacks
      </p>
      <Marquee gradient={true} speed={30} gradientColor={theme === "dark" ? "#020617" : "#f8fafc"}>
        <div className="flex items-center">
          {[...companiesLogo, ...companiesLogo].map((company, index) => (
            <img
              key={index}
              className="mx-10 opacity-50 grayscale transition hover:opacity-100 hover:grayscale-0 h-7"
              src={company.logo}
              alt={company.name}
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
}
