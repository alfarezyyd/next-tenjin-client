import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export default function App() {
  return (
    <Card className="mr-24 bg-pattern">
      <CardBody className="overflow-visible w-fit mx-auto ">
        <Image
          isBlurred
          alt="Card background"
          className="object-cover w-full"
          src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
        />
      </CardBody>
    </Card>
  );
}
