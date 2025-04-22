"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import initialData from "@/lib/initialData";

export default function Home() {
  const [currentSelect, setCurrentSelect] = React.useState("");
  const [listOfClasses, setListOfClasses] = React.useState<string[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    if (!localStorage.getItem("Klasy")) {
      localStorage.setItem("Klasy", JSON.stringify(initialData));
    }

    const storedClasses = JSON.parse(localStorage.getItem("Klasy") || "{}");
    setListOfClasses(Object.keys(storedClasses));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSelect) {
      router.push(`/klasy/${currentSelect}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-screen">
      
      <h1 className="font-bold">Wybierz Klase do sprawdzenia</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
        <Select value={currentSelect} onValueChange={setCurrentSelect}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Którą klasę chcesz sprawdzić?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Klasy</SelectLabel>
              {listOfClasses.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full max-w-[300px] " variant={"ghost"}>
          Dalej
        </Button>
      </form>
    </div>
  );
}