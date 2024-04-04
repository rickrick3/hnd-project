

import { AvatarDemo } from "@/components/Member";
import Navigation from "@/components/Navigation";
import PageTitle from "@/components/PageTitle";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Button } from "@/components/ui/button";
import Card2, { CardProps } from "@/components/ui/Card2";
import { Activity, Utensils , Hospital, Users } from "lucide-react";

import Image from "next/image";
import Link from "next/link";




const cardData: CardProps[] = [
  {
    label: "Project 1",
    members: "545,231.89",
    project: "School management system",
    icon: Hospital ,
  },
  {
    label: "Project 2",
    members: "+2350",
    project: "Employee management system",
    icon: Users,
  },
  {
    label: "Project 3",
    members: "12,234",
    project: "Food delivery app",
    icon: Utensils ,
  },
  {
    label: "Project 4",
    members: "+573",
    project: "E-commerce",
    icon: Activity,
    
  },
];



export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full">
     <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
  <div className="col-span-1"><PageTitle title="Projects" /></div>
  <div className="col-span-1"><Navigation/></div>
</section>
<Button className="inline-block">
  <Link href="/createProject" className="text-sm px-2 py-1 bg-black-500 hover:bg-black-700 text-white font-semibold rounded">
    Add Project
  </Link>
</Button>



      <section
        className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all 
      sm:grid-cols-3 xl: grid-cols-4"
      >
        
        {cardData.map((d, i) => (
          <Card2
            key={i}
            members={d.members}
            project={d.project}
            icon={d.icon}
            label={d.label}
          />
        ))},
        <AvatarDemo />
      </section>
    </div>
    
  );
}
