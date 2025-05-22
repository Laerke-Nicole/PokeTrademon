import { ref } from 'vue';
import type { AboutUs, newAboutUs } from '../interfaces/aboutUs';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';
const ABOUTUS_URL = `${BASE_URL}/aboutUs`;

export const useAboutUs = () => {
  const aboutUs = ref<AboutUs[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // fetch all about us data
  const fetchAboutUs = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    // fetch the data from the API
    try {
      const res = await fetch(ABOUTUS_URL);
      if (!res.ok) throw new Error('Failed to fetch AboutUs');
      aboutUs.value = await res.json();
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  // get token and user id for authentication
  const getTokenAndUserId = (): { token: string, userId: string } => {
    // get the localstorage token and user ID
    const token = localStorage.getItem('isToken');
    const userId = localStorage.getItem('userIDToken');

    if (!token) {
        throw new Error('No token available');
    }
    if (!userId) {
        throw new Error('No user ID available');
    }
    return { token, userId };
  }

  // adding a new about us
  const addAboutUs = async (aboutUsData: newAboutUs): Promise<void> => {
    try {
      const { token, userId } = getTokenAndUserId();
      if (!aboutUsData.aboutUsTitle) throw new Error('About us title is required');

      // check if the about us or default to the default values
      const payload = {
        aboutUsTitle: aboutUsData.aboutUsTitle,
        aboutUsText: aboutUsData.aboutUsText || 'Default text',
        mission: aboutUsData.mission || 'Default mission',
        vision: aboutUsData.vision || 'Default vision',
        valuesSubTitle: aboutUsData.valuesSubTitle || 'Default values subtitle',
        valueOneTitle: aboutUsData.valueOneTitle || 'Default value one title',
        valueOne: aboutUsData.valueOne || 'Default value one',
        valueTwoTitle: aboutUsData.valueTwoTitle || 'Default value two title',
        valueTwo: aboutUsData.valueTwo || 'Default value two',
        valueThreeTitle: aboutUsData.valueThreeTitle || 'Default value three title',
        valueThree: aboutUsData.valueThree || 'Default value three',
        imageURL: aboutUsData.imageURL || 'https://picsum.photos/500',
        openingHours: aboutUsData.openingHours || 'Default opening hours',
        phoneNumber: aboutUsData.phoneNumber || '1234567890',
        email: aboutUsData.email || 'mail@mail.com',
        userId,
      };

      // the post method in headers
      const res = await fetch(ABOUTUS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to add about us');
      }

      const added = await res.json();
      
      aboutUs.value.push(added);

      await fetchAboutUs();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  // delete about us
  const deleteAboutUs = async (id: string): Promise<void> => {
    try {
      // get the token and user ID for authentication
      const { token } = getTokenAndUserId();

      // delete method in headers
      const res = await fetch(`${ABOUTUS_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token,
        },
      });

      if (!res.ok) throw new Error('Failed to delete about us');
      aboutUs.value = aboutUs.value.filter(a => a._id !== id);
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  // update about us
  const updateAboutUs = async (id: string, updatedFields: Partial<AboutUs>): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();

      // put method in headers
      const res = await fetch(`${ABOUTUS_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        // get body from the updated fields
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) throw new Error('Failed to update about us');
        const updated = await res.json();
        const index = aboutUs.value.findIndex(a => a._id === id);
      if (index !== -1) aboutUs.value[index] = updated;
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  // fetch about us by ID
  const fetchAboutUsById = async (id: string): Promise<AboutUs | null> => {
    try {
      // fetch the data from the API with the ID
      const res = await fetch(`${ABOUTUS_URL}/${id}`);

      if (!res.ok) throw new Error('Failed to fetch about us by ID');
      return await res.json();
    } catch (err) {
      error.value = (err as Error).message;
      return null;
    } finally {
      loading.value = false; 
    }
  };


  return {
    aboutUs,
    loading,
    error,
    fetchAboutUs,
    fetchAboutUsById,
    addAboutUs,
    deleteAboutUs,
    updateAboutUs,
    getTokenAndUserId,
  };
};