// User related query keys
export const USER_QUERY_KEY = (userId: string): string[] => ['user', userId];
export const USERS_QUERY_KEY = ['users'];

// Diving cylinder set related query keys
export const CYLINDER_SET_QUERY_KEY = (setId: string): string[] => [
  'divingCylinderSet',
  setId,
];

// Storage cylinder query keys
export const STORAGE_CYLINDERS_QUERY_KEY = ['storageCylinder'];
