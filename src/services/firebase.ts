import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type {
  UserDocument,
  ProjectDocument,
  ChatMessageDocument,
  MeetingDocument
} from '../lib/firebase';

export class FirebaseService {
  // User operations
  async createUser(userData: Omit<UserDocument, 'id' | 'createdAt' | 'updatedAt'>) {
    const docRef = doc(collection(db, 'users'));
    await setDoc(docRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  }

  async getUser(userId: string): Promise<UserDocument | null> {
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
  }

  async getUserByAuthId(authId: string): Promise<UserDocument | null> {
    const q = query(collection(db, 'users'), where('githubId', '==', authId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as UserDocument;
    }
    return null;
  }

  async updateUser(userId: string, updates: Partial<UserDocument>) {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  }

  // Project operations
  async createProject(projectData: Omit<ProjectDocument, 'id' | 'createdAt'>) {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  }

  async getProjects(userId: string): Promise<ProjectDocument[]> {
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
  }

  async getProject(projectId: string): Promise<ProjectDocument | null> {
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
  }

  async deleteProject(projectId: string) {
    const docRef = doc(db, 'projects', projectId);
    await deleteDoc(docRef);
  }

  // Chat message operations
  async saveChatMessage(messageData: Omit<ChatMessageDocument, 'id'>) {
    const docRef = await addDoc(collection(db, 'chatMessages'), {
      ...messageData,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  }

  async getChatMessages(projectId: string): Promise<ChatMessageDocument[]> {
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
  }

  // Meeting operations
  async createMeeting(meetingData: Omit<MeetingDocument, 'id' | 'createdAt'>) {
    const docRef = await addDoc(collection(db, 'meetings'), {
      ...meetingData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  }

  async getMeetings(userId: string, projectId?: string): Promise<MeetingDocument[]> {
    let q;
    if (projectId) {
      q = query(
        collection(db, 'meetings'),
        where('userId', '==', userId),
        where('projectId', '==', projectId),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'meetings'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
    }
    
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
  }

  async getMeeting(meetingId: string): Promise<MeetingDocument | null> {
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
  }

  async updateMeeting(meetingId: string, updates: Partial<MeetingDocument>) {
    const docRef = doc(db, 'meetings', meetingId);
    await updateDoc(docRef, updates);
  }

  async deleteMeeting(meetingId: string) {
    const docRef = doc(db, 'meetings', meetingId);
    await deleteDoc(docRef);
  }
}

export const firebaseService = new FirebaseService();