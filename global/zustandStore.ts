"use client";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { create } from "zustand";

type AppTheme =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "cmyk"
  | "autumn"
  | "business"
  | "acid"
  | "lemonade"
  | "night"
  | "coffee"
  | "winter"
  | "dim"
  | "nord"
  | "sunset";
interface GlobalStoreActions {
  deleteItem: (taskId: string, collectionName: "user") => Promise<void>;
  addData: (title: string) => Promise<void>;
  editData: (id: string, updates: Partial<TasksStoreData>) => Promise<void>;
  fetchData: () => Promise<void>;
}
interface GlobalStoreData {
  theme: AppTheme;
  user: UserStoreData | null;
  tasks: TasksStoreData[];
  loading: boolean;
}
interface UserStoreData {
  userId: string;
  username: string;
  email: string;
  location: string;
  registeredAt: string;
}
interface TasksStoreData {
  taskId: string;
  title: string;
  description: string;
  status: "active" | "snoozed" | "completed" | "archived" | "deleted";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: Timestamp;
  deadline?: string;
  edited: boolean;
  editedAt?: string;
  deadlineChanged: boolean;
}
// ... (Your types remain the same)

export const useGlobalStore = create<GlobalStoreActions & GlobalStoreData>(
  (set) => ({
    theme: "dark",
    tasks: [],
    loading: false,
    user: null,
    fetchData: async () => {
      set({ loading: true });
      try {
        const snapshot = await getDocs(collection(db, "user"));
        const tasks = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            taskId: doc.id,
            ...data,
            // This line converts the raw Firebase object into a real Timestamp class
            createdAt: data.createdAt
              ? new Timestamp(
                  data.createdAt.seconds,
                  data.createdAt.nanoseconds
                )
              : Timestamp.now(),
          };
        }) as TasksStoreData[];

        set({ loading: false, tasks });
      } catch (error) {
        set({ loading: false });
        toast.error("Failed to fetch tasks.");
      }
    },

    //  DELETE DATA
    deleteItem: async (id: string, collectionName: "user") => {
      set({ loading: true });
      try {
        await deleteDoc(doc(db, collectionName, id));

        set((state) => ({
          tasks: state.tasks.filter((item) => item.taskId !== id),
          loading: false,
        }));

        toast.success("Deleted successfully!");
      } catch (error) {
        set({ loading: false });
        toast.error("Failed to delete.");
      }
    },

    //   ADD DATA
    addData: async (title) => {
      set({ loading: true });
      try {
        const newTaskData = {
          title,
          description: "testing",
          status: "active" as const,
          priority: "low" as const,
          createdAt: Timestamp.now(),
          edited: false,
          deadlineChanged: false,
        };
        const docRef = await addDoc(collection(db, "user"), newTaskData);

        set((state) => ({
          tasks: [...state.tasks, { ...newTaskData, taskId: docRef.id }],
          loading: false,
        }));
        set({ loading: false });
        toast.success("Task added!");
      } catch (error) {
        set({ loading: false });
        toast.error("Failed to add.");
      }
    },
    //   EDIT DATA
    editData: async (id, updates) => {
      // set({ loading: true });
      try {
        // 1. Update Firebase with whatever fields are in 'updates'
        await updateDoc(doc(db, "user", id), {
          ...updates,
          edited: true,
          editedAt: new Date().toISOString(),
        });

        // 2. Update Local Zustand State
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.taskId === id ? { ...task, ...updates, edited: true } : task
          ),
          // loading: false,
        }));

        toast.success("Updated!");
      } catch {
        // set({ loading: false });
        toast.error("Failed to update.");
      }
    },
  })
);
