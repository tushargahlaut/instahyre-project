interface payload {
  user_id: string;
  name: string;
  email?: string;
  phone_number: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JWTInterface {
  payload: payload;
  iat: number;
  exp: number;
}
