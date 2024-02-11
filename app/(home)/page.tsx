import { ptBR } from "date-fns/locale";
import  Header  from "../components/header";
import { format } from "date-fns";
import Search from "./components/search";
import BookingItem from "../components/booking-item";
import BarbershopItem from "./components/barbershop-item";
import { db } from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/app/api/auth/[...nextauth]/route";


export default async function Home() {
  
  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany({})

  const confirmedBookings =
   session?.user
    ? db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: true,
          barbershop: true,
        },
      })
    : Promise.resolve([])
  

  return (
    <div>
        <Header/>
        <div className="px-5 pt-5">
          <h2 className="text-xl font-bold">Olá, </h2>
          <p className="capitalaze text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale:ptBR,
            })}
          </p>

        </div>
        <div className="px-5 mt-6 ">
          <Search/>
        </div>

        <h2 className="text-sm  mb-3 pl-5 uppercase">Agendamentos</h2>
          <div className="mt-6 px-5">
            <BookingItem /> 
        </div>

        <div className="mt-5">
          <h2 className="px-5 text-xs font-bold uppercase text-white">Recomendados</h2>
          <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
           
          </div>   
        </div>
    </div>
   
  );
}
