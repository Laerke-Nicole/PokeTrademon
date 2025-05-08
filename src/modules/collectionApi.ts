export const getUserCollection = async (userId: string) => {
    const res = await fetch(`/api/collections/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch collection');
    return res.json();
  };