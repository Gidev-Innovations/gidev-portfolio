import Blog from "../blog/Blog";
import { buildMeta } from "../seo/meta";

export const meta = () => buildMeta("/blog");

export default Blog;
