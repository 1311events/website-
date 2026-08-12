import { pageMetadata } from "@/lib/seo";
import JournalListing from "@/components/JournalListing";

export const metadata = pageMetadata(
  "/journal",
  "The 13 Eleven Event Journal",
  "Monthly insights, inspiration, and stories behind elevated events and hospitality in Hawaiʻi."
);

export default function JournalPage() {
  return <JournalListing />;
}
