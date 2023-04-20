import type { V2_MetaFunction } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <>
    <Button variant={"destructive"}>New</Button>
    <Button variant={"outline"}>New</Button>
    <Button variant={"secondary"}>New</Button>
    <Button variant={"ghost"}>New</Button>
    </>
  );
}
