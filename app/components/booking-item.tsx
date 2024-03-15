import { format, isFuture, isPast } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";

interface BarbershopItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true,
        }
    }>
}

const BookingItem = ({booking}: BarbershopItemProps) => {
    const isBookingConfirmed = isFuture(booking.date)

    return ( 
        <Card>
            <CardContent className="flex py-0 px-0">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                    <Badge variant={isBookingConfirmed ?"secondary": "default"} className="w-fit"> {isBookingConfirmed ? "Confirmado" : "Finalizado" } </Badge>
                    <h2> Corte de Cabelo </h2>

                    <div className="flex items-center gap-2">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={booking.barbershop.imageUrl}/>
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>

                        <h2 className="text-sm">{booking.barbershop.name}</h2>
                    </div>
                </div>

                <div className="flex flex-col justify-center px-3 items-center border-l ">
                    <p className="text-sm capitalize"> {format(new Date(), "MMMM", {
            locale:ptBR,
            })} </p>
                    <p className="text-xl">{format(new Date(), "dd", {
            locale:ptBR,})}</p>
                    <p className="text-sm">{format( new Date(), "HH:mm")}</p>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BookingItem;