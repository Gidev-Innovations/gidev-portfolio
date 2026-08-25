import Homepage from "../home/Homepage";
import OrganizationSchema from "../seo/OrganizationSchema";
import { buildMeta } from "../seo/meta";

export const meta = () => buildMeta("/");

export default function HomeRoute() {
  return (
    <>
      <OrganizationSchema />
      <Homepage />
    </>
  );
}
