"use client"

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOutIcon, UserIcon, LogInIcon, HomeIcon, CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SideMenu = () => {
    const {data,status} = useSession()

    const handleLogoutClick = () => signOut()

    const handleLoginClick = () => signIn("google") 

    return ( <div>
        <SheetHeader className="text-left border-secondary border-b border-solid">
        <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

    {data?.user ? (<div>
      <div className="flex gap-3 items-center">
        <Avatar>
            <AvatarImage src={data.user?.image ?? ""}/>
        </Avatar>

        <h2 className="font-bold">{data.user.name}</h2>
      </div>

      <Button>
        <LogOutIcon onClick={handleLogoutClick}/>
      </Button>

    </div>) : (<div className="flex flex-col gap-3 py-6 px-5">

        <div className="flex items-center gap-3">
            <UserIcon size={32}/>
            <h2>Olá, faça seu login!</h2>
        </div>

        <Button onClick={handleLoginClick} variant="secondary" className="w-full justify-start">
            <LogInIcon size={18} className="mr-2"/>
            Fazer Login
        </Button>

    </div>)}

    <div className="flex flex-col gap-3 px-5">
       
     <Button variant="outline" className="justify-start" asChild>
        <Link href="/">
            <HomeIcon size={18} className="inline mr-2"/>
            Início
        </Link>  
     </Button>                            
      {data?.user && (
        <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings">
                <CalendarIcon size={18} className="mr-2" />
                Agendamentos
            </Link>
        </Button>
       )} 
      </div>
    </div>
     );
}
 
export default SideMenu;