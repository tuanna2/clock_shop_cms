// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.memberType === 1,
    canOwnerOrAdmin: currentUser && (currentUser.memberType === 1 || currentUser.memberType === 2), 
  };
}
