import { db } from "@/app/lib/prisma";
import BarbershopInfo from "./components/barbershop-info";

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

    return <BarbershopInfo barbershop={barbershop}/>
}
 
export default BarbershopDetailsPage;