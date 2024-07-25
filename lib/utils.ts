import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 원화로 변경하는 함수
export const formatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
});
