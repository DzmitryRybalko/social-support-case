import { z } from 'zod';

export const FORM_SCHEMAS = {
  PERSONAL_INFO: z.object({
    name: z.string().min(1, 'required'),
    nationalId: z.string().min(1, 'required'),
    dateOfBirth: z.string().min(1, 'required'),
    gender: z.enum(['male', 'female', 'other']),
    address: z.string().min(1, 'required'),
    city: z.string().min(1, 'required'),
    state: z.string().min(1, 'required'),
    country: z.string().min(1, 'required'),
    phone: z.string().min(1, 'required'),
    email: z.email('invalidEmail'),
  }),

  FAMILY_INFO: z.object({
    maritalStatus: z.enum([
      'single',
      'married',
      'divorced',
      'widowed',
      'separated',
    ]),
    dependents: z.number('required').min(0, 'minDependents'),
    employmentStatus: z.enum([
      'employed',
      'unemployed',
      'self-employed',
      'retired',
      'student',
      'disabled',
    ]),
    monthlyIncome: z.number('required').min(0, 'minIncome'),
    housingStatus: z.enum([
      'owned',
      'rented',
      'living-with-family',
      'homeless',
      'other',
    ]),
    housingDetails: z.string().optional(),
  }),

  SITUATION_DESCRIPTION: z.object({
    currentFinancialSituation: z
      .string()
      .min(50, 'minLength')
      .max(1000, 'maxLength'),
    employmentCircumstances: z
      .string()
      .min(20, 'minLength')
      .max(1000, 'maxLength'),
    reasonForApplying: z.string().min(30, 'minLength').max(1000, 'maxLength'),
    additionalDetails: z.string().max(1000, 'maxLength').optional(),
  }),
} as const;

export type PersonalInfoFormData = z.infer<typeof FORM_SCHEMAS.PERSONAL_INFO>;
export type FamilyInfoFormData = z.infer<typeof FORM_SCHEMAS.FAMILY_INFO>;
export type SituationDescriptionFormData = z.infer<
  typeof FORM_SCHEMAS.SITUATION_DESCRIPTION
>;
