import type { V2_MetaFunction } from "@remix-run/react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "~/components/ui/button";
import 'react-toastify/dist/ReactToastify.css';


export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {


  return (
    <>
      <Button variant={'outline'} className="bg-primary">1</Button>
      <Button variant={'outline'} className="bg-accent">2</Button>
      <Button variant={'outline'} className="bg-secondary ">3</Button>
      <Button variant={'outline'} className="bg-background ">4</Button>
      <Button variant={'outline'} className="bg-muted ">5</Button>
      <Button variant={'outline'} className="bg-card ">6</Button>
      <Button variant={'outline'} className="bg-border ">7</Button>
      <Button variant={'outline'} className="bg-destructive ">8</Button>
      <Button variant={'outline'} className="bg-ring ">9</Button>

      {/* <pre>{JSON.stringify(loaderData1, null, 1)}</pre> */}
    </>
  );
}
