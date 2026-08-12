import CartPageContent from "@/components/CartPageContent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/cart",
  "Cart",
  "Review your selected rental inventory and request a quote.",
  { noIndex: true }
);

export default function CartPage() {
  return (
    <div className="bg-[#0D0D0C] pt-8">
      <CartPageContent />
    </div>
  );
}
