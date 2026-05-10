"use client";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
  query,
  where,
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
  setFilterDate: (date: Date | undefined) => void;
  setFilterStatus: (status: TasksStoreData["status"] | "all") => void; // Add setFilterStatus
  deleteItem: (taskId: string, collectionName: "user") => Promise<void>;
  addData: (title: string, deadline?: Date) => Promise<void>;
  editData: (id: string, updates: Partial<TasksStoreData>) => Promise<void>;
  fetchData: () => Promise<void>;
  fetchTasksByDate: (date: Date) => Promise<void>;
  setUser: (user: any) => void;
  logout: () => Promise<void>;
  checkNotifications: () => void;
  removeNotification: (id: string) => void; // Add removeNotification
  clearNotifications: () => void; // Add clearNotifications
}
interface GlobalStoreData {
  theme: AppTheme;
  user: any | null;
  tasks: TasksStoreData[];
  loading: boolean;
  filterDate: Date | undefined;
  filterStatus: TasksStoreData["status"] | "all";
  notifications: AppNotification[];
}


interface AppNotification {
  id: string;
  taskId: string;
  message: string;
  type: "near" | "missed";
  timestamp: Date;
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
  uid: string; // Added uid
  title: string;
  description: string;
  status: "active" | "snoozed" | "completed" | "archived" | "deleted";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: Timestamp;
  deadline?: null | Timestamp;
  edited: boolean;
  editedAt?: string;
  deadlineChanged: boolean;
}

// ... (Your types remain the same)

export const useGlobalStore = create<GlobalStoreActions & GlobalStoreData>((set) => ({
  theme: "dark",
  tasks: [],
  loading: false,
  user: null,
  filterStatus: "active",
  filterDate: undefined,
  notifications: [],
  setFilterDate: (date) => set({ filterDate: date }),


  setFilterStatus: (status) => set({ filterStatus: status }),
  fetchData: async () => {

    const user = useGlobalStore.getState().user;
    if (!user) return; // Don't fetch if no user

    set({ loading: true });
    try {
      console.log("Fetching tasks for user:", user.uid);
      // Query tasks where uid matches current user
      const q = query(collection(db, "user"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      
      console.log("Snapshot size:", snapshot.size);
      const tasks = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          taskId: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt : Timestamp.now(),
          deadline: data.deadline ? data.deadline : null,
        };
      }) as TasksStoreData[];
      set({ loading: false, tasks });
    } catch (error) {
      console.error("Fetch error:", error);
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

      toast.success("Task deleted permanently");
    } catch (error) {
      set({ loading: false });
      toast.error("Could not delete task");
    }
  },

  //   ADD DATA
  addData: async (title, deadline) => {
    const user = useGlobalStore.getState().user;
    if (!user) {
      toast.error("You must be logged in to add tasks.");
      return;
    }

    set({ loading: true });
    try {
      const newTaskData = {
        uid: user.uid, // Store user's ID
        title,
        description: "testing",
        status: "active" as const,
        priority: "low" as const,
        createdAt: Timestamp.now(),
        edited: false,
        deadlineChanged: false,
        deadline: deadline ? Timestamp.fromDate(deadline) : null,
      };
      const docRef = await addDoc(collection(db, "user"), newTaskData);

      set((state) => ({
        tasks: [...state.tasks, { ...newTaskData, taskId: docRef.id }],
        loading: false,
      }));
      toast.success("Task added to your list");
    } catch (error) {
      console.error("Add error:", error);
      set({ loading: false });
      toast.error("Failed to save task");
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

  fetchTasksByDate: async (date: Date) => {},

  setUser: (user) => set({ user }),
  logout: async () => {
    try {
      await auth.signOut();
      set({ user: null, tasks: [] });
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error("Error signing out");
    }
  },

  checkNotifications: () => {
    const { tasks } = useGlobalStore.getState();
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    
    const newNotifications: AppNotification[] = [];

    tasks.forEach(task => {
      if (task.status === "completed" || !task.deadline) return;

      const deadline = task.deadline.toDate();
      
      if (deadline < now) {
        newNotifications.push({
          id: `missed-${task.taskId}`,
          taskId: task.taskId,
          message: `You missed: ${task.title}`,
          type: "missed",
          timestamp: new Date()
        });
      } else if (deadline <= threeDaysFromNow) {
        const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        newNotifications.push({
          id: `near-${task.taskId}`,
          taskId: task.taskId,
          message: `${task.title} is due in ${daysLeft} day(s)`,
          type: "near",
          timestamp: new Date()
        });
      }
    });

    set({ notifications: newNotifications });
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },
}));



