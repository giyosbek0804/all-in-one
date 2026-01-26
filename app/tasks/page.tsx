"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";


export default function TestFirebase() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [itemText, setItemText] = useState("");

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "test_connection"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(data);
  };

  useEffect(() => { fetchData(); }, []);

  const testConnection = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page refresh on form submit
    if (loading) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "test_connection"), {
        status: itemText,
        location: "Uzbekistan",
        timestamp: serverTimestamp(),
      });
      setMessage("Document added successfully!");
      setItemText(""); // Clear input
      fetchData();
    } catch (e) {
      setMessage("Error adding document");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "test_connection", id));
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    /* bg-base-100: Main background of the theme */
    /* text-base-content: Automatically switches black/white text based on theme */
    <div className="min-h-screen p-10 bg-base-100 text-base-content">
      
      <div className="max-w-md mx-auto">
<h1 className="text-2xl font-bold mb-6 text-primary ">
  Firebase + DaisyUI
</h1>

        <form onSubmit={testConnection} className="flex flex-col gap-4  ">
          <input 
            type="text" 
            required 
            placeholder="Type status..."
            className="input input-bordered w-full" 
            value={itemText} 
            onChange={(e) => setItemText(e.target.value)} 
          />
          
          {/* btn-primary: This will be Blue in light mode, but change automatically! */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Send Data"}
          </button>
        </form>

        {message && <div className="alert alert-info mt-4 py-2  " >{message}</div>}

        <ul className="mt-8 space-y-4">
          {items.map((item) => (
            /* card: provides nice styling; bg-base-200: slightly different from background */
            <li key={item.id} className="card bg-base-200 p-4 shadow-sm flex-row justify-between items-center">
              <div>
                <p className="font-bold">{item.status}</p>
                {/* opacity-70: Better than text-gray-500 because it works on any background color */}
                <p className="text-xs opacity-70">
                  {item.timestamp ? item.timestamp.toDate().toLocaleString() : "Just now"}
                </p>
              </div>

              {/* btn-error: Red-ish color that matches the current theme vibe */}
              <button onClick={() => deleteItem(item.id)} className="btn btn-ghost btn-sm text-error">
                Delete
              </button>
            </li>
          ))}
        </ul>
        
        <div className="divider mt-10">Change Theme</div>
        <div className="flex justify-center">
            <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}