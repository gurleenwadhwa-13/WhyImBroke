"use client"

import Link from "next/link"

const Footer = () => {
  const footerSections = [
    {
      title: "Features",
      links: [
        { name: "Expense Tracking", href: "#" },
        { name: "Budget Planning", href: "#" },
        { name: "Financial Analytics", href: "#" },
        { name: "Goal Setting", href: "#" },
      ],
    },
    {
      title: "Product",
      links: [
        { name: "Pricing", href: "#pricing" },
        { name: "Mobile App", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "API", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ]

  return (
    <footer className="py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">$</span>
              </div>
              <span className="text-xl font-bold text-white">WhyImBroke.tech</span>
            </div>
            <p className="text-gray-400 mb-4">Take control, make smart decisions, achieve financial freedom.</p>
            {/* <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">$</span>
            </div> */}
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2025 WhyImBroke. Take control of your financial future.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
