import type { Request } from "express";

export function validateAuthToken(req: Request) {
  const authHeader = req.headers.authorization;
  const expectedToken = "12345-this-is-secret-token";

  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  // Check if the token matches
  if (authHeader !== `Bearer ${expectedToken}`) {
    throw new Error("Invalid authorization token");
  }

  return true;
}
