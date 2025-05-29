import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="text-center">
      <h1 className="font-bold py-6 text-center">Welcome to Scamvisor</h1>
      <Button variant={"outline"}>
        Click here to learn more about our work
      </Button>
    </div>
  );
}
