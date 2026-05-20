import { Sparkles } from "lucide-react";

import { QuestionGenerator } from "@/components/question-generator";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 flex flex-col transition-colors duration-300 ease-[ease]">
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pb-12 sm:pb-24 pt-6 flex flex-col">
        <div className="flex flex-col items-center text-center space-y-4 mb-10 sm:mb-12 animate-enter">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgb(0,0,0,0.2)] border border-zinc-200 dark:border-zinc-800 mb-2 sm:mb-4">
            <Sparkles className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-balance">
            Interview Question Generator
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-balance">
            Generate role-specific interview questions for any job title using AI.
          </p>
        </div>

        <QuestionGenerator />
      </main>
    </div>
  );
}
