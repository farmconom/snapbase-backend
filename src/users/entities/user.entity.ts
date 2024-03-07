export class User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  photoURL: string | null;
  // providerId: string;
  uid: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  // tenantId: string | null;
  // refreshToken: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    email: string | null,
    phoneNumber: string | null,
    displayName: string | null,
    photoURL: string | null,
    // providerId: string,
    uid: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    // tenantId: string | null,
    // refreshToken: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.displayName = displayName;
    this.photoURL = photoURL;
    // this.providerId = providerId;
    this.uid = uid;
    this.emailVerified = emailVerified;
    this.isAnonymous = isAnonymous;
    // this.tenantId = tenantId;
    // this.refreshToken = refreshToken;
  }
}
