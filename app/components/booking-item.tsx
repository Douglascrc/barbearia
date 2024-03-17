import { format, isFuture, isPast } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import BookingInfo from "./booking-info";
import { Button } from "./ui/button";

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
        <Sheet>
            <SheetTrigger asChild>
             <Card>
                <CardContent className="flex py-0 px-0">
                    <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                        <Badge variant={isBookingConfirmed ?"default": "secondary"}     className="w-fit"> {isBookingConfirmed ? "Confirmado" : "Finalizado" } </Badge>
                        <h2> {booking.service.name} </h2>

                        <div className="flex items-center gap-2">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={booking.barbershop.imageUrl}/>
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>

                            <h2 className="text-sm">{booking.barbershop.name}</h2>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center px-3 items-center border-l ">
                        <p className="text-sm capitalize"> {format(booking.date, "MMMM", {
                locale:ptBR,
                })} </p>
                        <p className="text-xl">{format(booking.date, "dd", {
                locale:ptBR,})}</p>
                        <p className="text-sm">{format(booking.date, "HH:mm")}</p>
                    </div>
                    </CardContent>
                </Card>
            </SheetTrigger>

            <SheetContent className="px-0">
                <SheetHeader className="text-left py-6 px-5 border-b border-secondary">
                    <SheetTitle>Informações da Reserva </SheetTitle>
                </SheetHeader>
                
                <div className="px-5">
                    <div className="relative h-[180px] w-full mt-6">
                        <Image src={"/barbershop-map.png"} fill  alt={booking.barbershop.name}/>

                        <div className="w-full absolute bottom-4 px-5 left-0">
                            <Card>
                                <CardContent className="p-3 flex gap-3">
                                  <Avatar>
                                        <AvatarImage src={booking.barbershop.imageUrl}/>
                                  </Avatar>
                                  <div>
                                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                                    <h2 className="text-sm text-nowrap overflow-hidden text-ellipsis">{booking.barbershop.address}</h2>
                                  </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Badge variant={isBookingConfirmed ?"default": "secondary"} className="w-fit my-3"> {isBookingConfirmed ? "Confirmado" : "Finalizado" } </Badge>

                    <BookingInfo booking={booking}/>

                    <SheetFooter>
                            <SheetClose asChild >
                                <Button className="w-full" variant={"secondary"}>
                                    Voltar
                                </Button>
                            </SheetClose>
                            <Button disabled={!isBookingConfirmed} className="w-full" variant={"destructive"}>
                                Cancelar
                            </Button>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
     )
}
 
export default BookingItem;