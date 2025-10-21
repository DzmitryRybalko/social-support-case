/**
 * Zod validation schemas for form data
 */

import { z } from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  idNumber: z.string().min(5, 'ID number must be at least 5 characters'),
  address: z.object({
    street: z.string().min(5, 'Street address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
  }),
});

// Family Information Schema
export const familyInfoSchema = z.object({
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], {
    required_error: 'Marital status is required',
  }),
  numberOfChildren: z.number().min(0, 'Number of children cannot be negative'),
  dependents: z.array(
    z.object({
      name: z.string().min(2, 'Dependent name must be at least 2 characters'),
      relationship: z.string().min(2, 'Relationship must be at least 2 characters'),
      age: z.number().min(0, 'Age cannot be negative').max(120, 'Age cannot exceed 120'),
    })
  ),
  householdIncome: z.number().min(0, 'Household income cannot be negative'),
  monthlyExpenses: z.number().min(0, 'Monthly expenses cannot be negative'),
});

// Financial Information Schema
export const financialInfoSchema = z.object({
  employmentStatus: z.enum(['employed', 'unemployed', 'self-employed', 'retired', 'student'], {
    required_error: 'Employment status is required',
  }),
  monthlyIncome: z.number().min(0, 'Monthly income cannot be negative'),
  savings: z.number().min(0, 'Savings cannot be negative'),
  debts: z.array(
    z.object({
      creditor: z.string().min(2, 'Creditor name must be at least 2 characters'),
      amount: z.number().min(0, 'Debt amount cannot be negative'),
      monthlyPayment: z.number().min(0, 'Monthly payment cannot be negative'),
    })
  ),
  assets: z.array(
    z.object({
      type: z.string().min(2, 'Asset type must be at least 2 characters'),
      value: z.number().min(0, 'Asset value cannot be negative'),
    })
  ),
});

// Situation Description Schema
export const situationDescriptionSchema = z.object({
  currentSituation: z.string().min(50, 'Please provide at least 50 characters describing your current situation'),
  financialHardship: z.string().min(50, 'Please provide at least 50 characters describing your financial hardship'),
  requestedAssistance: z.string().min(30, 'Please provide at least 30 characters describing the assistance you need'),
  supportingDocuments: z.array(z.string()).min(1, 'At least one supporting document is required'),
  additionalInfo: z.string().optional(),
});

// Complete Form Schema
export const formDataSchema = z.object({
  personalInfo: personalInfoSchema,
  familyInfo: familyInfoSchema,
  financialInfo: financialInfoSchema,
  situationDescription: situationDescriptionSchema,
});

// Type inference from schemas
export type PersonalInfoType = z.infer<typeof personalInfoSchema>;
export type FamilyInfoType = z.infer<typeof familyInfoSchema>;
export type FinancialInfoType = z.infer<typeof financialInfoSchema>;
export type SituationDescriptionType = z.infer<typeof situationDescriptionSchema>;
export type FormDataType = z.infer<typeof formDataSchema>;
