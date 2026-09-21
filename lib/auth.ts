export type CurrentUser = { id: string; name: string; role: "USER" | "BUSINESS_OWNER" | "ADMIN" };
export async function getCurrentUser(): Promise<CurrentUser | null> {
  return null; // Auth provider will be connected in the authentication phase.
}
export function requireAdmin(user: CurrentUser | null) {
  return Boolean(user && user.role === "ADMIN");
}