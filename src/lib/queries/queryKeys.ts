// User related query keys
export const USER_QUERY_KEY = (userId: string): string[] => ['user', userId];
export const USERS_QUERY_KEY = 'users';

// Diving cylinder set related query keys
export const CYLINDER_SETS_QUERY_KEY = (userId: string): string[] => [
  'divingCylinderSets',
  userId,
];

// ...
