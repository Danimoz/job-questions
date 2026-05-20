"use client";

import { SubmitEvent, useState } from "react";
import { AlertCircle, Briefcase, ChevronRight, Loader2 } from "lucide-react";

import { QuestionList } from "@/components/question-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type GenerateQuestionsSuccess = {
  jobTitle: string;
  questions: string[];
};

type GenerateQuestionsFailure = {
  error: string;
};

export function QuestionGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [submittedJobTitle, setSubmittedJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextJobTitle = jobTitle.trim();

    if (!nextJobTitle) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setSubmittedJobTitle("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle: nextJobTitle }),
      });

      const data = (await response.json()) as GenerateQuestionsSuccess | GenerateQuestionsFailure;

      if (!response.ok) {
        throw new Error("error" in data ? data.error : "Failed to generate questions");
      }

      const successData = data as GenerateQuestionsSuccess;

      setQuestions(successData.questions);
      setSubmittedJobTitle(successData.jobTitle);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate questions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-zinc-200 dark:border-zinc-800 p-5 sm:p-8 animate-enter delay-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="jobTitle" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
              Job Title
            </Label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ease-[ease] group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 text-zinc-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <Input
                id="jobTitle"
                name="jobTitle"
                type="text"
                placeholder="e.g. Senior Frontend Engineer"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                disabled={isLoading}
                className="w-full h-auto rounded-xl pl-12 pr-4 py-3.5 bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-900/10 dark:focus-visible:ring-zinc-100/10 focus-visible:border-zinc-900 dark:focus-visible:border-zinc-100 transition-all duration-200 ease-[ease]"
                required
                autoFocus
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !jobTitle.trim()}
            className="w-full sm:w-auto sm:self-end h-auto gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3.5 rounded-xl font-medium transition-all duration-200 ease-[ease] hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.97] shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Questions
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </div>

      {error && (
        <div className="w-full mt-6 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 sm:p-5 rounded-2xl border border-red-200 dark:border-red-900 flex items-start gap-3 animate-enter">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium leading-relaxed">{error}</p>
        </div>
      )}

      {questions.length > 0 && (
        <QuestionList jobTitle={submittedJobTitle} questions={questions} />
      )}

      {!isLoading && !error && questions.length === 0 && (
        <div className="mt-16 sm:mt-20 text-center animate-enter delay-200">
          <p className="text-sm sm:text-base text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-sm mx-auto">
            Enter a job title to get started. Try something specific like <br className="hidden sm:block" />
            <span className="font-medium text-zinc-500 dark:text-zinc-400">&quot;Senior React Native Developer&quot;</span> or <span className="font-medium text-zinc-500 dark:text-zinc-400">&quot;Director of Engineering&quot;</span>.
          </p>
        </div>
      )}
    </>
  );
}