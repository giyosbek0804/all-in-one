"use client";
import { create } from "zustand";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
// top is same no need to change it

interface UserData {
  id: string;
  status: string;
  completed: boolean;
  location: string;
  timestamp?: any;
}
// interface TaskData{
//   id: string;
//   status: string;
//   completed: boolean;
//   updatedAt?: string;
// }

interface DataStoreType {
  data: UserData[];
  // task: TaskData[];
  loading: boolean;
  fetchData: () => Promise<void>;
  addData: (status: string) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
  editData: (id: string, status: string) => Promise<void>;
  toggleComplete: (id: string, completed: boolean) => Promise<void>;
}

export const useDataStore = create<DataStoreType>((set, get) => ({
  data: [],
  // task:[],
  loading: false,
  fetchData: async () => {
    set({ loading: true });
    const snapshot = await getDocs(collection(db, "test_connection"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UserData[];
    set({ loading: false, data });
  },
  addData: async (status) => {
    await addDoc(collection(db, "test_connection"), {
      status,
      completed: false,
      location: "Uzbekistan",
      timestamp: serverTimestamp(),
    });

    // refresh after add
    await get().fetchData();
  },

  // DELETE
  deleteData: async (id) => {
    try {
      await deleteDoc(doc(db, "test_connection", id));
      set((state) => ({
        data: state.data.filter((item) => item.id !== id),
      }));
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  },
  // toggle
  toggleComplete: async (id: string, completed: boolean) => {
    await updateDoc(doc(db, "test_connection", id), {
      completed: !completed,
    });

    set((state) => ({
      data: state.data.map((item) =>
        item.id === id ? { ...item, completed: !completed } : item
      ),
    }));
  },
  // edit data
  editData: async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "test_connection", id), {
        status,
        updatedAt: serverTimestamp(),
      });

      // Optimistic UI update
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, status } : item
        ),
      }));

      toast.success("Updated successfully!");
    } catch (err) {
      toast.error("Update failed");
    }
  },
}));
