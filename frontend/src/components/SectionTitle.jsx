export default function SectionTitle({ text1, text2, text3 }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {text2 || text1}
      </h2>
      {text3 && (
        <p className="mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {text3}
        </p>
      )}
    </div>
  );
}