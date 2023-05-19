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
export const BARE_FILL_EVENT_QUERY_KEY = ['bareFillEvents'];

// Gas
export const GAS_QUERY = ['gas'];
