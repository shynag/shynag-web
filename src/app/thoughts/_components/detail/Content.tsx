import {
  DocumentRenderer,
  DocumentRendererProps,
} from "@keystatic/core/renderer";
import { CodeBlock } from "./CodeBlock"; // Import komponen baru tadi

interface ContentProps {
  document: DocumentRendererProps["document"];
}

export function Content({ document }: ContentProps) {
  return (
    <article
      className="
        prose prose-invert max-w-none pt-8 pb-20
        /* Override prose defaults */
        prose-headings:font-medium 
        prose-headings:tracking-tight
        prose-p:leading-7
        prose-blockquote:not-italic
        prose-code:before:content-none 
        prose-code:after:content-none
        prose-code:font-normal
      "
    >
      <DocumentRenderer
        document={document}
        renderers={{
          block: {
            // Panggil Server Component CodeBlock
            // Karena ini di dalam Server Component parent, kita bisa pass component async langsung
            code: ({ children, language }) => (
              <CodeBlock language={language}>{children}</CodeBlock>
            ),

            // ... renderer lainnya (blockquote, image, dll) biarkan sama ...
            blockquote: ({ children }) => (
              <blockquote className="my-8 border-l-4 border-primary bg-muted/20 py-1 pl-6 pr-4 italic text-muted-foreground rounded-r-lg">
                {children}
              </blockquote>
            ),
            image: (props) => (
              <figure className="my-8 flex flex-col items-center">
                <div className="relative overflow-hidden rounded-xl border border-border bg-muted w-full">
                  <img
                    src={props.src}
                    alt={props.alt || "Blog Image"}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {props.title && (
                  <figcaption className="mt-3 text-center text-sm font-medium text-muted-foreground">
                    {props.title}
                  </figcaption>
                )}
              </figure>
            ),
            divider: () => <hr className="my-12 border-border" />,
          },
          inline: {
            // Fix inline code juga agar tidak bold dan lebih rapi
            code: ({ children }) => (
              <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-[0.9em] font-normal text-foreground border border-border/50">
                {children}
              </code>
            ),
            bold: ({ children }) => (
              <strong className="font-semibold text-foreground decoration-primary/30 decoration-2 underline-offset-2">
                {children}
              </strong>
            ),
          },
        }}
      />
    </article>
  );
}
