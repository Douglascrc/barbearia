"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
    return (
        <div className="flex">
            <Input placeholder="Busque uma barbearia"/>
            <Button variant={"default"} size={"icon"}  >
                <SearchIcon size={18}/>
            </Button>
        </div>
      );
}
 
export default Search;