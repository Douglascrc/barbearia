"use client"

import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { Card, CardContent } from "@/app/components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { generateDayTimeList } from "../helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../actions/save-booking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


interface serviceItemProps {
    service: Service
    isAuthenticator : boolean
    barbershop : Barbershop
}

const ServiceItem = ({service, barbershop, isAuthenticator}: serviceItemProps) => {
    const router = useRouter()

    const {data} = useSession()

    const [hour, setHour] = React.useState<string | undefined>()

    const [date, setDate] = React.useState<Date | undefined>(undefined)

    const [submitLoading, setSubmitLoading] = useState(false)

    const [sheetIsOpen, setSheetIsOpen] = useState(false)

    const handleBookingSubmit = async () => {
        setSubmitLoading(true)
        try{
            if(!hour || !date || !data?.user) {
                return
            }

            const dateHour = Number(hour.split(":")[0])
            const dateMinutes = Number(hour.split(":")[0])

            const newDate = setMinutes(setHours(date,dateHour), dateMinutes)

            await saveBooking({
                serviceId: service.id,
                barbershopId: barbershop.id,
                date: newDate,
                userId: (data.user as any).id
            })

            setSheetIsOpen(false)
            setHour(undefined);
            setDate(undefined);
            toast("Reserva realizada com sucesso!",{
                description: format(newDate,"'Para' dd 'de' MMMM 'às' HH ':' mm'.'",{ 
                locale:ptBR
                }),
                action:{ 
                    label:"Visualizar",
                onClick: () => router.push("/bookings"), 
                },
            })
        }
        catch(error) {
            console.error(error)
        } 
        finally {
            setSubmitLoading(false)
        }
    }

    const handleBookingClick = () => {
        if (!isAuthenticator) 
        return signIn("google")
    }

    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined)
    }

    const handleHourClick = (time: string) => {
        setHour(time)

    }

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date):[]
    },[date]) 

    return ( 
        <Card>
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative  min-h-[110px] min-w-[110px]  max-h-[110px] max-w-[110px]">
                      <Image className="rounded-lg"
                      src={service.imageUrl} 
                      fill style={{objectFit: "cover"}} alt={service.name}/>
                    </div> 

                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="flex items-center justify-between mt-3">
                            <p className="text-primary text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            }).format(Number(service.price))}
                            </p>                           

                            <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="secondary" onClick={handleBookingClick}>
                                        Reservar
                                    </Button>            
                                </SheetTrigger>

                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-3 mb-5 border-b border-secondary">
                                        <SheetTitle>Fazer reserva</SheetTitle>
                                    </SheetHeader>

                                    <Calendar mode="single"
                                    selected={date} onSelect={handleDateClick} locale={ptBR} fromDate={new Date()} styles={{
                                        head_cell: {
                                            width: "100%",
                                            textTransform: "capitalize",
                                        },
                                        cell: {
                                            width: "100%",
                                        },
                                        nav_button_previous: {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        nav_button_next: {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        button: {
                                            width: "100%",
                                        },
                                        caption: {
                                            textTransform: "capitalize"
                                        }
                                    }}     
                                    />
                                    {/*Mostrar horário apenas se a data estive selecionad */} 
                                    {date && (
                                        <div className=" flex gap-3 overflow-x-auto py-6 px-5 border-y border-secondary  [&::-webkit-scrollbar]:hidden">
                                            {timeList.map((time) => (
                                                <Button onClick={() => handleHourClick(time)}variant={hour === time ? "default" : "outline"}className="rounded-full" key={time}> {time} </Button>
                                            ))}
                                            
                                        </div>
                                    )} 
                                  
                                    <Card className="my-2 mx-2 pb-4">
                                        <CardContent className="p-2 gap-3 flex flex-col">                                       
                                            <div className="flex pt-5 justify-between">
                                                <h2 className="font-bold">{service.name}</h2>
                                                <h2 className="font-bold text-sm">{Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                    }).format(Number(service.price))}</h2>
                                            </div>
                                          
                                          {date && (
                                            <div className="flex justify-between">
                                                <h3 className="text-sm text-gray-400">Data</h3>
                                                <h4 className="text-sm capitalize">{format(new Date(), "dd 'de' MMMM",{locale: ptBR})}</h4>
                                            </div>
                                          )}

                                          {hour && (
                                            <div className="flex justify-between">
                                                <h3 className="text-sm text-gray-400">Horário</h3>
                                                <h4 className="text-sm capitalize">{hour}</h4>
                                            </div>
                                          )}

                                            <div className="flex justify-between">
                                                <h3 className="text-sm text-gray-400">Barbearia</h3>
                                                <h4 className="text-sm capitalize">{barbershop.name}</h4>
                                            </div>
                                         
                                        </CardContent>
                                    </Card>
                                   <SheetFooter className="px-5">
                                   <Button onClick={handleBookingSubmit} disabled={!hour || !date || submitLoading}>
                                            {submitLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Confirmar Reserva                                           
                                        </Button>
                                   </SheetFooter>
                                    
                                </SheetContent>
                            </Sheet>

                        </div>
                        
                  </div>
                </div>
            </CardContent>
        </Card>        
     );
}
 
export default ServiceItem;