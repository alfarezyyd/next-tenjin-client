import React from "react";
import {
  Card,
  CardBody,
  Accordion,
  AccordionItem, Divider
} from "@nextui-org/react";
import { FaUserGraduate, FaTools, FaBriefcase } from 'react-icons/fa';

export default function MentorProfileCard() {
  return (
    <>
      <Card className="max-w-full mb-4">
        <CardBody>
          <p className="text-2xl font-bold text-center">Informasi Mentor</p>
        </CardBody>
      </Card>

      <Card className="max-w-full mb-4">
        <CardBody className="p-5">
          <h1 className="text-xl font-semibold">Biodata</h1>
          <Divider className="my-4"/>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, adipisci commodi consequatur corporis dolore dolorem est et, ipsa iure nemo obcaecati pariatur qui quia quibusdam, rerum tempore tenetur voluptatibus. A, aliquam aliquid asperiores at, autem consequuntur culpa debitis doloremque ea eius est ex facere ipsa magnam maiores, nemo neque non nulla numquam perspiciatis quas quisquam quos ratione recusandae repellat suscipit tenetur voluptas!
          </p>
          <p className="mb-4">
            Architecto eligendi error et. Adipisci consectetur consequatur distinctio dolorem, eum illo incidunt maxime nemo nostrum numquam odio optio quae qui quia rerum ut vero. Ad animi corporis eius facilis itaque, labore nam, necessitatibus neque odit reprehenderit velit vero?
          </p>
        </CardBody>
      </Card>

      <Accordion variant="splitted" className="font-medium p-0 m-0">
        <AccordionItem key="1" aria-label="Accordion 1" title={
          <div className="flex items-center">
            <FaUserGraduate className="mr-2"/>
            <span>Pendidikan</span>
          </div>
        }>
          <p className="p-4">
            Detil pendidikan mentor akan ditampilkan di sini.
          </p>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title={
          <div className="flex items-center">
            <FaTools className="mr-2"/>
            <span>Keahlian</span>
          </div>
        }>
          <p className="p-4">
            Detil keahlian mentor akan ditampilkan di sini.
          </p>
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title={
          <div className="flex items-center">
            <FaBriefcase className="mr-2"/>
            <span>Pengalaman</span>
          </div>
        }>
          <p className="p-4">
            Detil pengalaman mentor akan ditampilkan di sini.
          </p>
        </AccordionItem>
      </Accordion>
    </>
  );
}
