"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find the right plan that
            <br />
            <span className="italic">suits your needs</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Transform your conversations with AI-powered assistance. Create
            meaningful interactions faster, generate better responses, and make
            smarter decisions in minutes.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Monthly</span>
            <Switch
              id="billing"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className="text-sm text-gray-300">Annually</span>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="rounded-2xl border border-gray-800 bg-black/50 p-8">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold leading-8">Standard</h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                Perfect for individuals and small teams looking to enhance their
                chat experience with AI.
              </p>
              <div className="mt-6 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight">
                  {isAnnual ? "$300" : "$30"}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-300">
                  {isAnnual ? "/year" : "/month"}
                </span>
              </div>
              <Button variant="outline" className="mt-6">
                Get Standard
              </Button>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                {[
                  "1,000 messages per month",
                  "Basic AI responses",
                  "3 chat contexts",
                  "Email support",
                ].map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="relative rounded-2xl border border-blue-600 bg-black/50 p-8">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold leading-8">Premium</h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                Ideal for businesses and power users who need advanced AI
                capabilities and automation.
              </p>
              <div className="mt-6 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight">
                  {isAnnual ? "$400" : "$40"}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-300">
                  {isAnnual ? "/year" : "/month"}
                </span>
              </div>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                Get Premium
              </Button>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                {[
                  "Unlimited messages",
                  "Advanced AI with GPT-4",
                  "Unlimited chat contexts",
                  "Priority support",
                  "Custom AI training",
                  "API access",
                ].map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
