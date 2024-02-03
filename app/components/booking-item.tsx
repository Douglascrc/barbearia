import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
    return ( 
        <Card>
            <CardContent className="flex py-0 px-0">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                    <Badge className="text-white bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit"> Confirmado </Badge>
                    <h2> Corte de Cabelo </h2>

                    <div className="flex items-center gap-2">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"/>
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>

                        <h2 className="text-sm">Vintage Barber</h2>
                    </div>
                </div>

                <div className="flex flex-col justify-center px-3 items-center border-l ">
                    <p className="text-sm">Mês</p>
                    <p className="text-xl">dia</p>
                    <p className="text-sm">Horário</p>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BookingItem;