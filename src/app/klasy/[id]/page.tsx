"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import React, { useEffect, useState } from "react";
import initialData from "@/lib/initialData"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Student {
  lp: number;
  imie: string;
  nazwisko: string;
  srednia: number;
}

export default function KlasaPage({ params }: { params: Promise<{ id: string }> }) {
    const rout = useRouter();
    const [students, setStudents] = useState<Student[]>([]);
    const [teacher, setTeacher] = useState<string | null>(null);
    const [classId, setClassId] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("Klasy")) {
      localStorage.setItem("Klasy", JSON.stringify(initialData.classes));
    }

    params.then((resolvedParams) => {
      setClassId(resolvedParams.id);

      const storedClasses = JSON.parse(localStorage.getItem("Klasy") || "{}");
      const classData = storedClasses[resolvedParams.id];

      if (classData && Array.isArray(classData.students)) {
        setStudents(classData.students);
        setTeacher(classData.teacher || "Brak danych");
      } else {
        setStudents([]);
        setTeacher("Brak danych");
      }
      console.log("classData:", classData);
      console.log("students:", classData?.students);
      console.log("teacher:", classData?.teacher);
    });
    
  }, []);

  const handleButton = () => {
    rout.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl font-bold">Klasa {classId}</h1>
      <p>Wychowawca: {teacher}</p>
      <Table>
          <TableHeader className="text-gray-400">
            <TableRow >
              <TableHead className="w-[100px]">Lp</TableHead>
              <TableHead>Imię</TableHead>
              <TableHead>Nazwisko</TableHead>
              <TableHead className="text-right">Średnia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.lp}>
                <TableCell className="font-medium">{student.lp}</TableCell>
                <TableCell>{student.imie}</TableCell>
                <TableCell>{student.nazwisko}</TableCell>
                <TableCell className="text-right">{student.srednia}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Liczba uczniów</TableCell>
              <TableCell className="text-right">{students.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Button onClick={handleButton} variant={"ghost"}>Powrot</Button>
    </div>
  );
}