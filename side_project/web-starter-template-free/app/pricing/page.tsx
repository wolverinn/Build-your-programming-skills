
import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  "title": 'Pricing | ZLAI',
  "description": 'Pricing',
}

export default function PricingPage() {
  return (
    <>
      <Breadcrumb pageName="Pricing" description="Recharge your credits" />
      <Pricing />
    </>
  )
}
