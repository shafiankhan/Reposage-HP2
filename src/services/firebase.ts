import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { UserDocument, ProjectDocument, ChatMessageDocument, MeetingDocument } from '../lib/firebase';

export const firebaseService = {
  // User operations
  async createUser(userData: Omit<UserDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getUser(userId: string): Promise<UserDocument | null> {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as UserDocument;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as UserDocument;
      }
      return null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },

  async updateUser(userId: string, updates: Partial<UserDocument>): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Project operations
  async createProject(projectData: Omit<ProjectDocument, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  async getProjects(userId: string): Promise<ProjectDocument[]> {
    try {
      const q = query(
        collection(db, 'projects'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lastUpdated: data.lastUpdated?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date()
        } as ProjectDocument;
      });
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  async getProject(projectId: string): Promise<ProjectDocument | null> {
    try {
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          lastUpdated: data.lastUpdated?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date()
        } as ProjectDocument;
      }
      return null;
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  },

  async updateProject(projectId: string, updates: Partial<ProjectDocument>): Promise<void> {
    try {
      const docRef = doc(db, 'projects', projectId);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async deleteProject(projectId: string): Promise<void> {
    try {
      const docRef = doc(db, 'projects', projectId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Chat message operations
  async createChatMessage(messageData: Omit<ChatMessageDocument, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'chatMessages'), {
        ...messageData,
        timestamp: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating chat message:', error);
      throw error;
    }
  },

  async getChatMessages(projectId: string): Promise<ChatMessageDocument[]> {
    try {
      const q = query(
        collection(db, 'chatMessages'),
        where('projectId', '==', projectId),
        orderBy('timestamp', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date()
        } as ChatMessageDocument;
      });
    } catch (error) {
      console.error('Error getting chat messages:', error);
      throw error;
    }
  },

  // Meeting operations
  async createMeeting(meetingData: Omit<MeetingDocument, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'meetings'), {
        ...meetingData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating meeting:', error);
      throw error;
    }
  },

  async getMeetings(userId: string): Promise<MeetingDocument[]> {
    try {
      const q = query(
        collection(db, 'meetings'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date()
        } as MeetingDocument;
      });
    } catch (error) {
      console.error('Error getting meetings:', error);
      throw error;
    }
  },

  async getMeeting(meetingId: string): Promise<MeetingDocument | null> {
    try {
      const docRef = doc(db, 'meetings', meetingId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          date: data.date?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date()
        } as MeetingDocument;
      }
      return null;
    } catch (error) {
      console.error('Error getting meeting:', error);
      throw error;
    }
  }
};