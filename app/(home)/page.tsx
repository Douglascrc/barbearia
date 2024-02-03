import { ptBR } from "date-fns/locale";
import  Header  from "../components/header";
import { format } from "date-fns";
import Search from "./componets/seach";
import BookingItem from "../components/booking-item";

export default function Home() {
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
        <div className="mt-4">
          <BookingItem/>
        </div>
    </div>
   
  );
}
