import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownMessageProps {
  content: string
  isUser: boolean
}

export function MarkdownMessage({ content, isUser }: MarkdownMessageProps) {
  const linkClass = isUser
    ? "underline underline-offset-2 hover:opacity-80"
    : "text-primary underline underline-offset-2 hover:opacity-80"

  const codeClass = isUser
    ? "rounded bg-primary-foreground/15 px-1 py-0.5 font-mono text-[0.8em]"
    : "rounded bg-muted px-1 py-0.5 font-mono text-[0.8em]"

  const preClass = isUser
    ? "my-2 overflow-x-auto rounded-lg bg-primary-foreground/10 p-3 font-mono text-xs"
    : "my-2 overflow-x-auto rounded-lg border bg-muted p-3 font-mono text-xs"

  const blockquoteClass = isUser
    ? "my-2 border-l-2 border-primary-foreground/40 pl-3 italic opacity-90"
    : "my-2 border-l-2 border-border pl-3 italic text-muted-foreground"

  const hrClass = isUser
    ? "my-3 border-primary-foreground/20"
    : "my-3 border-border"

  return (
    <div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1 className="mt-3 mb-2 text-base font-bold tracking-tight" {...props} />
          ),
          h2: (props) => (
            <h2 className="mt-3 mb-1.5 text-sm font-semibold tracking-tight" {...props} />
          ),
          h3: (props) => (
            <h3 className="mt-2 mb-1 text-sm font-semibold" {...props} />
          ),
          h4: (props) => (
            <h4 className="mt-2 mb-1 text-sm font-medium" {...props} />
          ),
          p: (props) => <p className="my-1.5 whitespace-pre-wrap" {...props} />,
          ul: (props) => <ul className="my-1.5 ml-4 list-disc space-y-0.5" {...props} />,
          ol: (props) => <ol className="my-1.5 ml-4 list-decimal space-y-0.5" {...props} />,
          li: (props) => <li className="leading-relaxed" {...props} />,
          strong: (props) => <strong className="font-semibold" {...props} />,
          em: (props) => <em className="italic" {...props} />,
          a: (props) => (
            <a
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          code: ({ className, children, ...rest }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className={codeClass} {...rest}>
                  {children}
                </code>
              )
            }
            return (
              <code className={className} {...rest}>
                {children}
              </code>
            )
          },
          pre: (props) => <pre className={preClass} {...props} />,
          blockquote: (props) => <blockquote className={blockquoteClass} {...props} />,
          hr: (props) => <hr className={hrClass} {...props} />,
          table: (props) => (
            <div className="my-2 overflow-x-auto">
              <table className="w-full border-collapse text-xs" {...props} />
            </div>
          ),
          thead: (props) => <thead className="border-b" {...props} />,
          th: (props) => (
            <th className="px-2 py-1 text-left font-semibold" {...props} />
          ),
          td: (props) => <td className="border-t border-border/50 px-2 py-1" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
