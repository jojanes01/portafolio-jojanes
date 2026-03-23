import Link from "next/link";
import Image from "next/image";

const CODE_THEME = {
  keyword: "text-purple-400",
  string: "text-green-400",
  function: "text-blue-400",
  comment: "text-gray-500 italic",
  number: "text-orange-400",
  operator: "text-red-400",
  className: "text-yellow-400",
  variable: "text-cyan-400",
};

const highlightCode = (code: string, language: string) => {
  if (typeof code !== "string") return code;

  let highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const patterns: Record<string, { pattern: RegExp; className: string }[]> = {
    javascript: [
      { pattern: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, className: CODE_THEME.comment },
      { pattern: /\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|from|default|async|await|try|catch|throw|new|this|super|static|get|set|typeof|instanceof|in|of)\b/g, className: CODE_THEME.keyword },
      { pattern: /(".*?"|'.*?'|`.*?`)/g, className: CODE_THEME.string },
      { pattern: /\b(\d+)\b/g, className: CODE_THEME.number },
      { pattern: /\b([A-Z][a-zA-Z0-9]*)\b/g, className: CODE_THEME.className },
    ],
    typescript: [
      { pattern: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, className: CODE_THEME.comment },
      { pattern: /\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|from|default|async|await|try|catch|throw|new|this|super|static|get|set|typeof|instanceof|in|of|interface|type|enum|implements|abstract|private|public|protected|readonly)\b/g, className: CODE_THEME.keyword },
      { pattern: /(".*?"|'.*?'|`.*?`)/g, className: CODE_THEME.string },
      { pattern: /\b(\d+)\b/g, className: CODE_THEME.number },
      { pattern: /\b([A-Z][a-zA-Z0-9]*)\b/g, className: CODE_THEME.className },
      { pattern: /:\s*(string|number|boolean|any|void|never|unknown|object|Array|Map|Set|Promise|Record)\b/g, className: "text-teal-400" },
    ],
    python: [
      { pattern: /(#.*$)/gm, className: CODE_THEME.comment },
      { pattern: /\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|raise|with|lambda|yield|global|nonlocal|pass|break|continue|and|or|not|in|is|True|False|None|self|async|await)\b/g, className: CODE_THEME.keyword },
      { pattern: /(".*?"|'.*?'|""".*?"""|'''.*?''')/g, className: CODE_THEME.string },
      { pattern: /\b(\d+\.?\d*)\b/g, className: CODE_THEME.number },
      { pattern: /\b([A-Z][a-zA-Z0-9]*)\b/g, className: CODE_THEME.className },
    ],
    sql: [
      { pattern: /(--.*$)/gm, className: CODE_THEME.comment },
      { pattern: /\b(SELECT|FROM|WHERE|AND|OR|NOT|IN|LIKE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|VIEW|DROP|ALTER|ADD|COLUMN|PRIMARY|KEY|FOREIGN|REFERENCES|NULL|DEFAULT|UNIQUE|CONSTRAINT)\b/gi, className: CODE_THEME.keyword },
      { pattern: /('.*?'|".*?")/g, className: CODE_THEME.string },
      { pattern: /\b(\d+)\b/g, className: CODE_THEME.number },
    ],
  };

  const languagePatterns = patterns[language] || patterns.javascript;

  let tokens: { text: string; className: string | null }[] = [{ text: highlighted, className: null }];

  languagePatterns.forEach(({ pattern, className }) => {
    const newTokens: { text: string; className: string | null }[] = [];
    tokens.forEach((token) => {
      if (token.className !== null) {
        newTokens.push(token);
        return;
      }
      
      let lastIndex = 0;
      const regex = new RegExp(pattern.source, "gm");
      let match;
      while ((match = regex.exec(token.text)) !== null) {
        if (match[0].length === 0) {
          regex.lastIndex++;
          continue;
        }
        const offset = match.index;
        if (offset > lastIndex) {
          newTokens.push({ text: token.text.substring(lastIndex, offset), className: null });
        }
        newTokens.push({ text: match[0], className });
        lastIndex = offset + match[0].length;
      }
      if (lastIndex < token.text.length) {
        newTokens.push({ text: token.text.substring(lastIndex), className: null });
      }
    });
    tokens = newTokens;
  });

  return tokens.map(t => t.className ? `<span class="${t.className}">${t.text}</span>` : t.text).join("");
};

const CALLOUT_STYLES = {
  info: { bg: "bg-blue-500/10", border: "border-blue-500/50", icon: "🔵", text: "text-blue-400" },
  warning: { bg: "bg-yellow-500/10", border: "border-yellow-500/50", icon: "⚠️", text: "text-yellow-400" },
  success: { bg: "bg-green-500/10", border: "border-green-500/50", icon: "✅", text: "text-green-400" },
  error: { bg: "bg-red-500/10", border: "border-red-500/50", icon: "❌", text: "text-red-400" },
  tip: { bg: "bg-jojanes-green/10", border: "border-jojanes-green/50", icon: "💡", text: "text-jojanes-green" },
};

export const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref}`;
      const layoutClass = value.layout === "full" ? "w-full" : value.layout === "wide" ? "w-full max-w-5xl mx-auto" : "max-w-2xl";

      return (
        <figure className={`my-10 ${layoutClass}`}>
          <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-jojanes-green/5">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={value.alt || "Image"}
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="text-jojanes-white-muted text-sm text-center mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }: any) => {
      // Forzamos showLineNumbers a false para que se vea limpio como en el Studio, 
      // y arreglamos los estilos para que si el usuario lo prende explícitamente se vea como un IDE moderno.
      const { language = "text", code = "", filename, showLineNumbers = false, highlightLines = [] } = value;
      const lines = code.split("\n");

      // Si el JSON viene con showLineNumbers en true por defecto del esquema, 
      // lo validamos. Pero para limpiar el problema lo ignoramos a menos que se desee.
      // (Aquí lo deshabilitamos forzosamente para limpiar el bloque, puedes quitar el '&& false' si quieres que el toggle de Sanity mande)
      const renderNumbers = showLineNumbers && false; 

      return (
        <div className="my-8 rounded-xl overflow-hidden border border-jojanes-border bg-[#0d1117]">
          {filename && (
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-jojanes-border">
              <span className="text-sm text-jojanes-white-muted">{filename}</span>
              <span className="text-xs text-jojanes-green uppercase">{language}</span>
            </div>
          )}
          <div className="relative overflow-x-auto">
            <pre className="p-4 text-sm font-mono leading-relaxed">
              <code className="block w-full">
                {lines.map((line: string, index: number) => {
                  const isHighlighted = highlightLines?.includes(index + 1);
                  const lineNumber = String(index + 1).padStart(2, "0");

                  return (
                    <div
                      key={index}
                      className={`${isHighlighted ? "bg-jojanes-green/10 before:content-[' '] before:absolute before:left-0 before:w-0.5 before:h-full before:bg-jojanes-green" : ""} ${renderNumbers ? "pl-12" : ""} relative pr-4 min-h-[1.5em]`}
                    >
                      {renderNumbers && (
                        <span className="absolute left-0 text-jojanes-white-muted/40 select-none w-8 text-right pr-3 border-r border-jojanes-border/30 text-xs inline-block h-full pt-0.5">
                          {lineNumber}
                        </span>
                      )}
                      <span
                        dangerouslySetInnerHTML={{ __html: highlightCode(line, language) || "&nbsp;" }}
                        className={isHighlighted ? "text-jojanes-white ml-2" : "text-gray-300 ml-2"}
                      />
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </div>
      );
    },
    callout: ({ value }: any) => {
      const style = CALLOUT_STYLES[value.type as keyof typeof CALLOUT_STYLES] || CALLOUT_STYLES.info;

      return (
        <div className={`my-8 rounded-xl p-5 ${style.bg} border ${style.border} backdrop-blur-sm`}>
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">{style.icon}</span>
            <div className="flex-1">
              {value.title && (
                <h4 className={`font-bold ${style.text} mb-2`}>{value.title}</h4>
              )}
              <div className="text-jojanes-white prose prose-invert prose-sm max-w-none">
                {value.content?.map((block: any, i: number) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {block.children?.map((child: any) => child.text).join("")}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    },
    youtube: ({ value }: any) => {
      const videoId = value.url?.includes("youtube.com")
        ? value.url.split("v=")[1]?.split("&")[0]
        : value.url?.includes("youtu.be")
          ? value.url.split("/").pop()
          : null;

      if (!videoId) return null;

      return (
        <figure className="my-10">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          {value.caption && (
            <figcaption className="text-jojanes-white-muted text-sm text-center mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    table: ({ value }: any) => {
      if (!value?.rows?.length) return null;
      return (
        <div className="my-10 overflow-x-auto rounded-xl border border-jojanes-border shadow-2xl">
          <table className="w-full text-left text-sm text-jojanes-white-muted border-collapse">
            <tbody className="divide-y divide-jojanes-border bg-jojanes-surface">
              {value.rows.map((row: any, i: number) => (
                <tr key={row._key || i} className="hover:bg-jojanes-white/5 transition-colors">
                  {row.cells?.map((cell: string, j: number) =>
                    i === 0 ? (
                      <th key={j} className="px-6 py-4 font-bold text-jojanes-white bg-jojanes-white/5 uppercase tracking-wider text-xs">
                        {cell}
                      </th>
                    ) : (
                      <td key={j} className="px-6 py-4 whitespace-nowrap">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-jojanes-white/90 text-lg leading-8 my-6">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl sm:text-5xl font-extrabold text-jojanes-white mt-12 mb-6 leading-tight" id={String(children).toLowerCase().replace(/\s+/g, "-")}>
        {children}
      </h1>
    ),
    h2: ({ children }: any) => {
      const id = String(children).toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
      return (
        <h2 className="text-3xl font-bold text-jojanes-white mt-10 mb-4 pb-2 border-b border-jojanes-border group" id={id}>
          <a href={`#${id}`} className="hover:text-jojanes-green transition-colors">
            {children}
          </a>
        </h2>
      );
    },
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold text-jojanes-white mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-medium text-jojanes-white mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-jojanes-green pl-6 py-2 my-8 text-xl text-jojanes-white-muted italic bg-jojanes-green/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
    callout: ({ children }: any) => (
      <div className="my-8 rounded-xl p-5 bg-jojanes-green/10 border border-jojanes-green/30">
        {children}
      </div>
    ),
    hr: () => (
      <hr className="border-t border-jojanes-border my-12 relative">
        <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-3 bg-jojanes-black text-jojanes-green">
          <span className="icon-[tabler--dots] text-xl" />
        </span>
      </hr>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 text-jojanes-white/90 my-6 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 text-jojanes-white/90 my-6 space-y-2">
        {children}
      </ol>
    ),
    checklist: ({ children }: any) => (
      <ul className="list-none ml-6 text-jojanes-white/90 my-6 space-y-2">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-lg leading-relaxed pl-2 text-jojanes-white/90">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-lg leading-relaxed pl-2 text-jojanes-white/90">{children}</li>
    ),
    checklist: ({ children }: any) => (
      <li className="text-lg leading-relaxed pl-2 text-jojanes-white/90 flex items-start gap-2">
        <span className="text-jojanes-green mt-1">✓</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const isInternal = value?.href?.startsWith("/") || value?.href?.startsWith("#");
      const isAnchor = value?.href?.startsWith("#");

      if (isInternal && !isAnchor) {
        return (
          <Link href={value.href} className="text-jojanes-green hover:text-jojanes-green-light underline underline-offset-4 decoration-jojanes-green/50 hover:decoration-jojanes-green transition-all">
            {children}
          </Link>
        );
      }

      return (
        <a
          href={value?.href}
          target={value?.blank ? "_blank" : undefined}
          rel={value?.blank ? "noopener noreferrer" : undefined}
          className="text-jojanes-green hover:text-jojanes-green-light underline underline-offset-4 decoration-jojanes-green/50 hover:decoration-jojanes-green transition-all"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold text-jojanes-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-jojanes-white/80">{children}</em>
    ),
    underline: ({ children }: any) => (
      <span className="underline decoration-jojanes-green/50 underline-offset-4">{children}</span>
    ),
    "strike-through": ({ children }: any) => (
      <span className="line-through text-jojanes-white-muted">{children}</span>
    ),
    code: ({ children }: any) => (
      <code className="bg-[#1a1f26] text-jojanes-green px-2 py-1 rounded text-sm font-mono border border-jojanes-border/50">
        {children}
      </code>
    ),
  },
};
