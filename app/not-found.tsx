import Link from "next/link";

// 404 boundary — shown for any unmatched route.
export default function NotFound() {
  return (
    <div className="min-h-[70svh] flex flex-col items-center justify-center gap-6 px-6 text-center bg-cream text-ink">
      <p className="text-6xl font-semibold text-gold-dark tracking-tight">404</p>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-gold-dark focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
      >
        Back to home
      </Link>
    </div>
  );
}
