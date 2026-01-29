import { codeToHtml } from "shiki";

interface CodeBlockProps {
  children: string; // Kode mentah
  language?: string;
  filename?: string;
}

export async function CodeBlock({
  children,
  language = "text",
  filename,
}: CodeBlockProps) {
  // 1. Generate HTML berwarna pakai Shiki (Server-side only)
  const html = await codeToHtml(children, {
    lang: language,
    // Tema: 'min-dark', 'github-dark', 'poimandres', 'vesper' (pilih sesuai selera)
    // 'github-dark-dimmed' biasanya paling aman dan enak di mata untuk dark mode
    theme: "github-dark",
  });

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border bg-card">
      {/* Header: Filename / Language Label */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border bg-muted/20 px-4 py-2">
          {filename ? (
            <span className="text-xs font-medium text-muted-foreground">
              {filename}
            </span>
          ) : (
            <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>
      )}

      {/* Body: Render HTML dari Shiki */}
      <div className="overflow-x-auto text-sm">
        {/* - [&>pre]:!bg-transparent -> Hapus bg bawaan shiki biar ikut container
           - [&_code]:!font-normal -> PAKSA font tidak bold (solusi masalah font tebal)
           - [&_code]:!font-mono -> Pastikan pakai font coding
        */}
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="
            p-4 
            [&>pre]:!bg-transparent 
            [&>pre]:!m-0 
            [&_code]:!font-mono 
            [&_code]:!text-sm 
            [&_code]:!leading-relaxed 
            [&_code]:!font-normal
          "
        />
      </div>
    </div>
  );
}
