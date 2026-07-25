import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const formSchema = z.object({
  expectedName: z.string().min(1, 'Expected name is required'),
  successMessage: z.string().min(1, 'Success message is required'),
  failureRedirectUrl: z.string().url('Fallback link must be a valid URL'),
});

export const publicSubmitSchema = z.object({
  enteredName: z.string().min(1, 'Name is required'),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  accuracy: z.number().nullable().optional(),
});