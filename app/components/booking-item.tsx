import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
    return ( 
        <Card>
            <CardContent className="flex py-0 px-0">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                       
                    <div className="flex items-center gap-2">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"/>
                        </Avatar>
                    </div>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BookingItem;