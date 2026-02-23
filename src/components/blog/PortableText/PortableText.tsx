import Link from "next/link";
import Image from "next/image";

export const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref}`;
      return (
        <figure className="my-8">
          <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={value.alt || "Image"}
              layout="responsive"
              width={700}
              height={450}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          {value.caption && (
            <figcaption className="text-slate-200 text-sm text-center mt-4">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    video: ({ value }: any) => (
      <div className="my-8">
        <video controls className="w-full rounded-lg shadow-lg">
          <source src={value.url} type="video/mp4" />
          Tu navegador no soporta la reproducción de este video.
        </video>
      </div>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-jojanes-white text-lg leading-relaxed my-6">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-extrabold text-jojanes-green my-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-jojanes-green my-6 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold text-slate-200 my-5 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-medium text-slate-200 my-4 leading-snug">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-jojanes-green pl-6 italic my-8 text-slate-200">
        {children}
      </blockquote>
    ),
    code: ({ children }: any) => (
      <pre className="bg-jojanes-black text-jojanes-white rounded-lg p-6 my-8 overflow-auto shadow-lg">
        <code className="text-sm font-mono">{children}</code>
      </pre>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc pl-6 text-jojanes-white my-6 space-y-3">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal pl-6 text-jojanes-white my-6 space-y-3">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    hr: () => <hr className="border-t border-jojanes-border my-10" />,
  },
  marks: {
    link: ({ children, value }: any) => (
      <Link
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-jojanes-green underline hover:text-slate-200 transition-colors duration-200"
      >
        {children}
      </Link>
    ),
    bold: ({ children }: any) => (
      <strong className="font-bold text-jojanes-green">{children}</strong>
    ),
    italic: ({ children }: any) => (
      <em className="italic text-slate-200">{children}</em>
    ),
    underline: ({ children }: any) => (
      <span className="underline decoration-jojanes-green">{children}</span>
    ),
    code: ({ children }: any) => (
      <code className="bg-jojanes-black text-jojanes-white px-2 py-1 rounded">
        {children}
      </code>
    ),
  },
};
