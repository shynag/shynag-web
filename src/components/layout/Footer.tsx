export function Footer() {
  return (
    // Keep the top border on the inner container; this wrapper only provides spacing.
    <footer className="w-full mt-16">
      <div className="mx-auto w-full px-6 sm:px-0 border-t border-border py-4">
        {/* Copyright and location */}
        <div className="flex mx-auto  max-w-2xl flex-row justify-between items-start sm:items-center gap-2">
          <span className="text-muted-foreground/40 text-sm">
            © {new Date().getFullYear()} Shynag.
          </span>
          <span className="text-muted-foreground/40 text-sm">
            Yogyakarta, Indonesia
          </span>
        </div>
      </div>
    </footer>
  );
}
