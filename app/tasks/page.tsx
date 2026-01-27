"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import  {AddData}  from "@/global/addData";
import FetchData from "@/global/fetchData";

export default function TestFirebase() {

  return (

    <div className="min-h-screen p-10 bg-base-100 text-base-content">
      
      <div className="max-w-md mx-auto">
<h1 className="text-4xl  text-center font-bold mb-6 text-primary ">
To Do List
</h1>
        <AddData/>
        <FetchData/>
        <div className="divider mt-10">Change Theme</div>
        <div className="flex justify-center">
            <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}