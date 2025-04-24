"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { useRouter } from "next/navigation";
import React, { ChangeEventHandler } from "react";
import initialData from "@/lib/initialData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dodawanie(){

    const [listOfClasses, setListOfClasses] = React.useState<string[]>([]);
    const [currentSelect, setCurrentSelect] = React.useState("");
    const [imie, setImie] = React.useState("");
    const [nazwisko, setNazwisko] = React.useState("");
    const [srednia, setSrednia] = React.useState(1);
    const router = useRouter();

    React.useEffect(() => {
        if (!localStorage.getItem("Klasy")) {
          localStorage.setItem("Klasy", JSON.stringify(initialData));
        }
    
        const storedClasses = JSON.parse(localStorage.getItem("Klasy") || "{}");
        setListOfClasses(Object.keys(storedClasses));
    }, []);


    const handleAddStudent = () => {
        if (!currentSelect) return;
        const storedClasses = JSON.parse(localStorage.getItem("Klasy") || "{}");
        const classData = storedClasses[currentSelect];
    
        if (classData && Array.isArray(classData.students)) {
          const newStudent = {
            lp: classData.students.length + 1,
            imie,
            nazwisko,
            srednia,
          };
    
          classData.students.push(newStudent);
          localStorage.setItem("Klasy", JSON.stringify(storedClasses));
          router.push(`/klasy/${currentSelect}`);
          console.log("Dodano ucznia:", newStudent);
        }
      }

    return(
        <div className="flex flex-col items-center justify-center">
          <Card className="w-[400px] h-[450px] bg-[#1e1e2f] text-white mt-10 ml-10 flex flex-col  "> 
            <CardHeader className="text-center mt-[10%]">
              <CardTitle >Dodawanie ucznia</CardTitle>
              <CardDescription>Wybierz klasę do której chcesz dodać ucznia</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
            <form onSubmit={handleAddStudent}>
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
              <Input 
                  placeholder="Imię" 
                  value={imie} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setImie(e.target.value);
                  }} 
                  className="w-[300px] mt-4" 
              />
              <Input 
                placeholder="Nazwisko" 
                value={nazwisko}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNazwisko(e.target.value);
                }}
                className="w-[300px] mt-4" 
              />
              <Input 
                placeholder="Srednia"
                value={srednia}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSrednia(parseFloat(e.target.value));
                }}
                type="number"
                className="w-[300px] mt-4" 
              />
              <Button type="submit" className="w-[300px] mt-[15%] border-2 border-white hover:bg-white hover:text-black">
                Dodaj
              </Button>
            </form>
            </CardContent>
          </Card>
        </div>
    )
}