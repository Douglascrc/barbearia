import { db } from "@/app/lib/prisma";
import BarbershopInfo from "./components/barbershop-info";
import ServiceItem from "./components/service-item";

interface BarbershopDetailsPageProps {
    params: {
       id?: string
    }
}

const BarbershopDetailsPage = async ({params}: BarbershopDetailsPageProps) => {
    if (!params) {
        return null
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
          },
    })

    if (!barbershop) {
        return null
    } 

    return (
        <div className="">
             <BarbershopInfo barbershop={barbershop}/>
            {barbershop.services.map((service) => (
                <ServiceItem key={service.id} service={service}/>
            ))}
        </div>
    )
}
 
export default BarbershopDetailsPage;