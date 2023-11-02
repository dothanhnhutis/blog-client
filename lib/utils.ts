import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosError, AxiosInstance } from "axios";
import slugify from "slugify";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (name: string) => {
  return slugify(name, { lower: true, locale: "vi" });
};

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:4000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const http = new Http().instance;
export const isAxiosError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error);
};
