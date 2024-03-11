export function convertUserFirebase(user: any): any {
  const newUser = {
    id: user.id || null,
    createdAt: user.createdAt || null,
    updatedAt: user.updatedAt || null,
    email: user.email || null,
    phoneNumber: user.phoneNumber || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    uid: user.uid || null,
    emailVerified: user.emailVerified || null,
    isAnonymous: user.isAnonymous || null,
    tokens: null,
  };
  return newUser;
}
