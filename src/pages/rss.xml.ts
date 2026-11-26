export const prerender = false;
import type { APIRoute } from "astro";
import { renderNewsRss } from "../seo/rss";

export const GET: APIRoute = ({ site }) => renderNewsRss("en", site);
