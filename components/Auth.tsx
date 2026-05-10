"use client";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { GoogleAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";
import { useGlobalStore } from "@/global/zustandStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Auth() {
  const { user, setUser, logout } = useGlobalStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleAuthError = (error: unknown) => {
    const code = (error as { code?: string })?.code;
    if (code === "auth/unauthorized-domain") {
      toast.error(
        "This domain is not authorized in Firebase. Add it to Firebase Console → Authentication → Settings → Authorized domains.",
        { duration: 8000 }
      );
    } else if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
      // user dismissed — no toast needed
    } else {
      toast.error("Sign-in failed. Please try again.");
    }
    console.error(error);
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      toast.error("Authentication is not configured. Please set Firebase environment variables.");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Welcome back! Signed in with Google");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signInWithApple = async () => {
    if (!isFirebaseConfigured) {
      toast.error("Authentication is not configured. Please set Firebase environment variables.");
      return;
    }
    const provider = new OAuthProvider("apple.com");
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Apple!");
    } catch (error) {
      handleAuthError(error);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4 p-4 bg-base-200/50 backdrop-blur-xl rounded-2xl border border-base-content/5 shadow-xl transition-all hover:shadow-2xl">
        <div className="avatar">
          <div className="w-12 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="avatar" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-black text-lg leading-tight">{user.displayName || "Explorer"}</h3>
          <p className="text-xs opacity-50 font-medium">{user.email}</p>
        </div>
        <button 
          onClick={logout} 
          className="btn btn-ghost btn-sm text-error hover:bg-error/10 font-bold"
        >
          Sign Out
        </button>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-3 mb-8">
      <h2 className="text-xl font-bold text-center mb-2">Sign in to manage your tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={signInWithGoogle} className="btn btn-outline gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button onClick={signInWithApple} className="btn btn-outline gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17.05 20.28c-.96.95-2.04 1.78-3.14 1.76-1.09-.02-1.5-.68-2.76-.68-1.26 0-1.71.66-2.75.68-1.04.03-2.12-.82-3.14-1.76C3.2 18.21 1.6 14.73 1.6 11.51c0-3.17 2.06-4.85 4.07-4.85 1.05 0 1.9.68 2.53.68.61 0 1.63-.73 2.85-.73 1.34 0 2.45.69 3.12 1.58-2.68 1.48-2.25 5.39.52 6.53-.78 2.06-1.84 4.14-3.14 5.56zM12.03 6.01c-.05-1.5 1.25-3 2.76-3.04.14 1.57-1.29 3.09-2.76 3.04z"
            />
          </svg>
          Apple
        </button>
      </div>
    </div>
  );
}
