import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export default function AboutFooter() {
  const footerSections = [
    {
      title: "COMPANY",
      links: ["About", "Features", "Works", "Career"],
    },
    {
      title: "HELP",
      links: [
        "Customer Support",
        "Delivery Details",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
    {
      title: "FAQ",
      links: ["Account", "Manage Deliveries", "Orders", "Payments"],
    },
  ];

  return (
    <footer className="bg-white mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-primary">GreenGoods</h3>
            <div className="flex space-x-4">
              <Twitter className="text-gray-400" />
              <Facebook className="text-gray-400" />
              <Instagram className="text-gray-400" />
              <Youtube className="text-gray-400" />
            </div>
          </div>
          
        </div>

        <div className="mt-5 pt-8 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            GreenGoods © 2000-2023. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
