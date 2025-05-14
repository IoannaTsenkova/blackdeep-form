import { stepOneSchema } from './step-one-schema';
import { stepTwoSchema } from './step-two-schema';

// Extract the inner object before refinement
const stepOneBaseSchema = stepOneSchema._def.schema;

export const fullSchema = stepOneBaseSchema.merge(stepTwoSchema);