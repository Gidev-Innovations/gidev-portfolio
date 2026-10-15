/**
 * Inline JSON-LD. React does not hoist inline <script> blocks, so this stays
 * where it is rendered; search engines accept JSON-LD anywhere in the page.
 * `<` is escaped so content can never close the script tag early.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
