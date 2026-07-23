import CartPageContent from "@/components/CartPageContent";

export const metadata = {
  title: "Cart — 1311 Events",
  description: "Review your selected rental inventory and request a quote.",
};

export default function CartPage() {
  return (
    <div className="bg-[#0D0D0C] pt-8">
      <CartPageContent />
    </div>
  );
}
