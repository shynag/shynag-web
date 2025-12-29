import Link from "next/link";
import { Button } from "@presentation/components/ui/button";
import { env } from "@core/env"; // Mengambil status env dari Foundation Layer

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-foreground">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* --- Header Section --- */}
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow">
            v1.0.0
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
            Vectris Base Core
          </h1>
          <p className="text-muted-foreground">
            Sistem terinisialisasi dan siap digunakan.
          </p>
        </div>

        {/* --- Status Card --- */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">System Status</span>
            <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>

          <div className="grid gap-2 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Environment</span>
              <span className="font-mono font-medium">{env.NODE_ENV}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">CMS Engine</span>
              <span className="font-mono font-medium">Keystatic (Local)</span>
            </div>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="grid gap-4">
          <Button asChild size="lg" className="w-full font-semibold">
            <Link href="/dashboard">Buka CMS Dashboard &rarr;</Link>
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/docs/Base Core.md" target="_blank">
                Baca Dokumentasi
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="https://github.com/vectris" target="_blank">
                GitHub Repo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
