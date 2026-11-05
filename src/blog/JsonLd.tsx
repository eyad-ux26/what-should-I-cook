/**
 * JSON-LD structured data, rendered as part of the page so it is in the
 * prerendered HTML too. Only ever describes what's actually visible on the
 * page — no invented ratings, authors, or images. "<" is escaped so the data
 * can never close the script tag early.
 */
export function JsonLd({ data }: { data: object[] }) {
  return (
    <>
      {data.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
