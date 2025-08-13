import Link from "next/link"
import { footerData } from "@/data/landing"

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">{footerData.company.name}</h3>
            <p className="text-gray-400 mb-4">{footerData.company.description}</p>
          </div>

          {/* 링크 섹션들 */}
          {footerData.sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">{footerData.copyright.text}</p>
          <p className="text-gray-500 text-sm mt-2">{footerData.copyright.tagline}</p>
        </div>
      </div>
    </footer>
  )
}

// Both named and default exports for compatibility
export { Footer }
export default Footer
