import type { V2_MetaFunction } from "@remix-run/react";
import { Button } from "~/components/ui/button";


export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <>
    <Button variant={'outline'} className="bg-primary">Primary</Button>
    {/* <Button variant={"outline"} >Primary</Button> */}
    <Button variant={'outline'} className="bg-accent">Primary</Button>
    <Button variant={'outline'} className="bg-secondary text-primary">Primary</Button>
    <Button variant={'outline'} className="bg-popover text-primary">Primary</Button>

    
    </>
  );
}
