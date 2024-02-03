import { ptBR } from "date-fns/locale";
import  Header  from "../components/header";
import { format } from "date-fns";
import Search from "./componets/seach";
import BookingItem from "../components/booking-item";
import BarbershopItem from "./componets/barbershop-item";
import { db } from "../lib/prisma";

export default async function Home() {
  
  const barbershops = await db.barbershop.findMany({})

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
        <div className="mt-6 px-5">
          <h2 className="text-sm uppercase">Agendamentos</h2>
          <BookingItem/>
        </div>

        <div className="mt-5">
           <h2 className="px-5 text-xs font-bold uppercase text-white">Recomendados</h2>

            <div className="flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
              ))}
            </div>
           
        </div>
    </div>
   
  );
}
