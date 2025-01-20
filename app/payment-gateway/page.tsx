import PaymentGatewaySelection from "@/src/components/PaymentGateway";
import SideNav from "@/src/components/SideNav";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex flex-col bg-gray-50 md:flex-row">
      <Suspense fallback={<div>Loading navigation...</div>}>
        <SideNav />
      </Suspense>
      <Suspense fallback={<div>Loading payment gateway...</div>}>
        <main className="flex flex-col w-full">
          <PaymentGatewaySelection />
        </main>
      </Suspense>
    </div>
  );
};

export default Page;
