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
} from "firebase/firestore";

interface UserData {
  id: string;
  status: string;
  location: string;
  timestamp?: any;
}

interface DataStoreType {
  data: UserData[];
  loading: boolean;
  fetchData: () => Promise<void>;
  addData: (status: string) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
}

export const useDataStore = create<DataStoreType>((set, get) => ({
  data: [],
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
      location: "Uzbekistan",
      timestamp: serverTimestamp(),
    });

    // refresh after add
    await get().fetchData();
  },

  // DELETE
  deleteData: async (id) => {
    await deleteDoc(doc(db, "test_connection", id));

    // optimistic update (faster UI)
    set((state) => ({
      data: state.data.filter((item) => item.id !== id),
    }));
  },
}));
