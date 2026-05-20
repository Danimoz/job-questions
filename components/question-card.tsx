type QuestionCardProps = {
  index: number;
  question: string;
  animationDelayMs?: number;
};

export function QuestionCard({
  index,
  question,
  animationDelayMs = 0,
}: QuestionCardProps) {
  return (
    <div
      className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.1)] border border-zinc-200 dark:border-zinc-800 animate-enter group transition-colors duration-200 ease-[ease] hover:border-zinc-300 dark:hover:border-zinc-700"
      style={{ animationDelay: `${animationDelayMs}ms` }}
    >
      <div className="flex gap-4 sm:gap-5 items-start">
        <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors duration-200 ease-[ease]">
          {index}
        </div>
        <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed mt-1 sm:mt-1.5 text-[15px] sm:text-base">
          {question}
        </p>
      </div>
    </div>
  );
}