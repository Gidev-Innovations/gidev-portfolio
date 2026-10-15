import Homepage from "../home/Homepage";
import JsonLd from "../seo/JsonLd";
import { businessSchema, websiteSchema } from "../seo/schema";
import { buildMeta } from "../seo/meta";

export const meta = () => buildMeta("/");

export default function HomeRoute() {
  return (
    <>
      <JsonLd data={[businessSchema(), websiteSchema()]} />
      <Homepage />
    </>
  );
}
