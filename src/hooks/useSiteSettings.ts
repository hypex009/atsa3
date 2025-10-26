import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface SiteSettings {
  logoUrl: string;
  phone1?: string;
  phone2?: string;
  email?: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    logoUrl: 'https://i.postimg.cc/9F7TBQqY/dfefwe.png',
    phone1: '+961 71 981 996',
    phone2: '+225 01 50 19 11 62',
    email: 'atsa0009@gmail.com'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'site'), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as SiteSettings);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching site settings:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { settings, loading };
}
