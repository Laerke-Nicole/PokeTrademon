export const getCurrentUser = async () => {
  const token = localStorage.getItem('isToken'); 
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'auth-token': token || '',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};


export const updateUser = async (data: { username: string; email: string; password?: string }) => {
  const token = localStorage.getItem('isToken'); // match the stored key
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || '',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  };
  
  export const deleteUser = async () => {
    const token = localStorage.getItem('isToken'); // match the stored key
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/delete`, {
      method: 'DELETE',
      headers: {
        'auth-token': token || '',
      },
    });
    if (!res.ok) throw new Error('Failed to delete user');
  };
  