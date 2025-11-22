import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum AIModel {
  FLASH = 'gemini-2.5-flash'
}