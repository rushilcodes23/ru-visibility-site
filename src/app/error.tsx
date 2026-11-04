"use client";

// Route-level error boundary. Without it, any runtime error showed Next's
// blank "Application error" screen with no way out.
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="page-surface w-full py-24 lg:py-32">
      <div className="container mx-auto px-4 flex flex-col items-center text-center gap-5 max-w-xl">
        <h1 className="text-3xl md:text-5xl tracking-tighter">Something went wrong.</h1>
        <p className="text-muted-foreground leading-relaxed">
          This page hit an error. Try again, or reach Rushil directly at{" "}
          <a href="mailto:rushil@ruvisibility.com" className="underline underline-offset-4 text-foreground">
            rushil@ruvisibility.com
          </a>{" "}
          or{" "}
          <a href="tel:+917222999365" className="underline underline-offset-4 text-foreground">
            +91 72229 99365
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="h-11 rounded-full px-6 bg-primary text-primary-foreground font-medium"
          >
            Try again
          </button>
          <a href="/" className="h-11 rounded-full px-6 border inline-flex items-center font-medium">
            Go to the homepage
          </a>
        </div>
      </div>
    </div>
  );
}
