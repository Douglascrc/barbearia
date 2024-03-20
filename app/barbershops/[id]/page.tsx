import { db } from "@/app/lib/prisma";
import BarbershopInfo from "./components/barbershop-info";
import ServiceItem from "./components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

interface BarbershopDetailsPageProps {
    params: {
       id?: string
    }
}

const BarbershopDetailsPage = async ({params}: BarbershopDetailsPageProps) => {
    const session = await getServerSession(authOptions)

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
        <div className="px-5 flex flex-col gap-4 py-6">
             <BarbershopInfo barbershop={barbershop}/>
            {barbershop.services.map((service) => (
                <ServiceItem  barbershop={barbershop} key={service.id} service={service} isAuthenticated={!!session?.user}/>
            ))}
        </div>
    )
}
 
export default BarbershopDetailsPage;