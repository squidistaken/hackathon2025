import { Check } from "lucide-react";

interface ToastNotificationProps {
  message: string;
}

export function ToastNotification({ message }: ToastNotificationProps) {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-down">
      <Check className="h-5 w-5 text-green-400 dark:text-green-600" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
