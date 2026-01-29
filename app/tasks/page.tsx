// "use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import  {AddData}  from "@/global/addData";
import FetchData from "@/global/fetchData";
import  { Toaster } from "react-hot-toast";

export default function TestFirebase() {

  return (

    <div className="min-h-screen p-10 bg-base-100 text-base-content ">
      
      <div className=" mx-auto  ">
<h1 className="text-4xl  text-center font-bold mb-6 text-primary ">
To Do List
        </h1>
        <section className="flex items-start gap-[calc(1.5rem+1vw)]  justify-between">
          <div className="flex-3/4">
        <AddData/>
        <FetchData />
          </div>
          <div className="flex-1/4 border h-screen">
            hello
          </div>
        </section>

        <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 3000,
    style: { backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.8)" },
  }}
/>
        <div className="divider mt-10">Change Theme </div>
        <div className="flex justify-center">
            <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}