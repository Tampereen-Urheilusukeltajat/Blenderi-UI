// User related query keys
export const USER_QUERY_KEY = (userId: string): string[] => ['user', userId];
export const USERS_QUERY_KEY = ['users'];

// Diving cylinder set related query keys
export const DIVING_CYLINDER_SETS_QUERY_KEY = (userId: string): string[] => [
  'divingCylinderSets',
  userId,
];

// Storage cylinder query keys
export const STORAGE_CYLINDERS_QUERY_KEY = ['storageCylinder'];

// Fill event related query keys
export const FILL_EVENT_QUERY_KEY = ['fillEvents'];
export const UNPAID_FILL_EVENTS_QUERY_KEY = ['fillEvents', 'unpaid'];

// Gas
export const GAS_QUERY = ['gas'];

// Payment
export const PAYMENT_EVENT_QUERY_KEY = (paymentEventId: string): string[] => [
  'paymentEvent',
  paymentEventId,
];

export const PAYMENT_EVENTS = ['paymentEvents'];

// Compressor
export const COMPRESSOR_QUERY_KEY = ['compressor'];
