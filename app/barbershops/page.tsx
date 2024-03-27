import { redirect } from "next/navigation";
import { db } from "../lib/prisma"
import Header from "../components/header";
import Search from "../(home)/components/search";
import BarbershopItem from "../(home)/components/barbershop-item";

interface BarbershopsPageProps {
    searchParams: {
        search?: string
    }
}

const BarbershopsPage = async ({searchParams}: BarbershopsPageProps) => {

    if (!searchParams.search) {
        return redirect("/");
    }

    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
              contains: searchParams.search,
              mode: "insensitive",
            },
          },
    })
    return  (<>
        <Header/>

        <div className="px5 py-6 flex flex-col gap-6">
            <Search 
                defaultValues={{
                    search: searchParams.search,
                }}/>

            <h1 className="text-gray-400 font-bold uppercase text-xs">Resultados para &quot;{searchParams.search}&quot;</h1>

            <div className="grid grid-cols-2 mt-3">
                {barbershops.map((barbershop) => (
                    <div key={barbershop.id}>
                        <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
                    </div>
                ))}
            </div>
        </div>

    </>) 
}
 
export default BarbershopsPage;