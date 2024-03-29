import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";



const Header = () => {

    return (
        <Card>
            <CardContent className="p-5 justify-between items-center flex flex-row ">
                <Link href={"/"}>
                    <Image src='/logo.png' alt="FSW Barber" height={22} width={120}/>
                </Link>               
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="h-6 w-6">
                            <MenuIcon size={28}/>
                        </Button>
                    </SheetTrigger>

                    <SheetContent >
                       <SideMenu/>
                    </SheetContent>
                </Sheet>
                
            </CardContent> 
        </Card>
    );
}



export default Header;