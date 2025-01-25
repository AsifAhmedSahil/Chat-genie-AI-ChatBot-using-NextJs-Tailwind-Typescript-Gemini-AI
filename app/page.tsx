"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto">
          <Link
            href={"/"}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold cursor-pointer">ChatGenie</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {["Pricing", "Features", "Chat"].map((item) => (
              <Link
                key={item}
                href={item === "Chat" ? "/chat" : `#${item.toLowerCase()}`}
                onClick={(e) =>
                  item !== "Chat" && handleScroll(e, item.toLowerCase())
                }
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
          <Button
            asChild
            className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded hover:bg-blue-700 group"
          >
            <Link href="/chat">
              <span className=" w-48  h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                Get Started
              </span>
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow overflow-auto">
        <section className="relative isolate pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-blue-800 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-32 lg:px-8">
            <div className="text-center">
              <Badge
                variant="secondary"
                className="mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-gray-800/50 backdrop-blur-sm"
              >
                <span className="text-xs font-semibold text-blue-500 mr-1">
                  NEW
                </span>
                <span className="text-xs">Explore version 2.0</span>
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8">
                Transform your conversations
                <br />
                with <span className="text-blue-500">ChatGenie</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300 mb-8">
                AI-powered chat assistant that understands context, learns from
                conversations, and helps you communicate more effectively.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  asChild
                  className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-lg group"
                >
                  <Link href="/chat">
                    <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]" />
                    <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8" />
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900 flex items-center">
                      Start chatting free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                    <span className="absolute inset-0 border-2  rounded-lg" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gray-700"
                >
                  <Link href="#demo">Subscription</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
