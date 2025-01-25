import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-bold">ChatGenie</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              AI-powered chat assistant that transforms your conversations into
              meaningful interactions.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Product</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#features"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#testimonials"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Testimonials
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Support</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#documentation"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#guides"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#api"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      API Status
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Company</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#about"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#blog"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#careers"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Legal</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#privacy"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#terms"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} ChatGenie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
