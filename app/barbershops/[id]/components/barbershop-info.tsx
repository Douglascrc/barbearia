"use client"

import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react";
import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import SideMenu from "@/app/components/side-menu";

interface BarbershopInfoProps {
    barbershop: Barbershop
}

const BarbershopInfo = ({barbershop}: BarbershopInfoProps) => {
    const router = useRouter()

    const handleBackClick = () => {
        router.replace("/")
    }

    return (  
        <div>
            <div className="h-[250px] w-full relative">
                <Button onClick={handleBackClick} size="icon" variant="outline" className="absolute z-50 top-4 left-4">
                    <ChevronLeftIcon/>
                </Button>

                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="absolute z-50 top-4 right-4">
                        <MenuIcon/>
                    </Button>

                    </SheetTrigger>

                    <SheetContent >
                       <SideMenu/>
                    </SheetContent>
                </Sheet>

                <Image src={barbershop.imageUrl} fill alt={barbershop.name} style={{
                    objectFit:"cover",
                }} className="opacity-85"/>
            </div>

            <div className="px-5 pt-3 pb-6 border-b border-secondary border-solid">
                <h1 className="text-xl font-bold">{barbershop.name}</h1>

                <div className="flex items-center gap-1 mt-2">
                    <MapPinIcon className="text-primary" size={18} />
                    <p className="text-sm">{barbershop.address}</p>
                </div>

                <div className="flex items-center gap-1 mt-2">
                    <StarIcon className="text-primary" size={18}/>
                    <p className="text-sm">5,0 (899 avaliações)</p>
                </div>
            </div>
        </div>
    );
}
 
export default BarbershopInfo;