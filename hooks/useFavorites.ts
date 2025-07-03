import { useAuth } from "@/components/AuthProvider";
import firestore from "@/lib/firestore";
import { useEffect, useState } from "react";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      const loadFavorites = async () => {
        setLoading(true);
        try {
          const favs = await firestore.getFavorites(user.uid);
          setFavorites(favs)
        } catch (error) {
          console.error('Error loading favorites:', error);
        } finally {
          setLoading(false);
        }
      };
      loadFavorites();
    }
  }, [user?.uid]);

  const toggleFavorite = async (postId: string) => {
    if (!user?.uid) return;

    try {
      if (favorites.includes(postId)) {
        // TODO: include remove favorite call here
        return;
      } else {
        await firestore.addFavorite(user.uid, postId);
        setFavorites(prev => [...prev, postId]);
        alert('Favorited!');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return { favorites, loading, toggleFavorite };
}
