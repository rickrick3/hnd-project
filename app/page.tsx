import Barchart from "@/components/barchart";
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import Image from "next/image";




const cardData: CardProps[] = [
  {
    label: "Total Revenue",
    amount: "545,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Subscription",
    amount: "+2350",
    discription: "+188.1% from last month",
    icon: Users,
  },
  {
    label: "Sales",
    amount: "12,234",
    discription: "+12.1% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+281 from last month",
    icon: Activity,
  },
];

const UserSalesData: SalesProps [] = [
  {
    name: "Oliviia Martin",
    email: "olivia.marting@gmail.com",
    saleAmount: "$1,999.0"
  },
  {
    name: "Ricky Farel",
    email: "ricky.farel@gmail.com",
    saleAmount: "$3,999.0"
  },
  {
    name: "William kit",
    email: "wiliam.kit@gmail.com",
    saleAmount: "$299.0"
  },
  {
    name: "Jackson luc",
    email: "jackson.luc@gmail.com",
    saleAmount: "$799.0"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <section
        className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all 
      sm:grid-cols-2 xl: grid-cols-4"
      >
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className=" grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>


          <Barchart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent sales</p>
            <p className="text-sm text-gray-400">
            you made 26 sales in one months
            </p>
 

          </section>
          {UserSalesData.map((d,i)=>(
<SalesCard
key={i}
name={d.name}
email={d.email}
saleAmount={d.saleAmount}
/>
          ))}
          
        </CardContent>


        {/**/}
      </section>
    </div>
  );
}
