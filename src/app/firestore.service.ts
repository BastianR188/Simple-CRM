import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {


  firestore: Firestore = inject(Firestore);
  allDataUsers: any[] = [];


  constructor() {
  }

  save(user: User) {
    return addDoc(collection(this.firestore, 'users'), user.toJSON())
  }

  async update(id: string, user: User) {
    await setDoc(doc(collection(this.firestore, 'users'), id), user.toJSON());
    const index = this.allDataUsers.findIndex(obj => obj.id === id);
    if (index !== -1) this.allDataUsers[index] = user;
  }

  async delete(id: string) {
    await deleteDoc(doc(this.firestore, "users", id));
  }

  load() {
    const query = collection(this.firestore, 'users');
    onSnapshot(query, (querySnapshot) => {
      this.allDataUsers = [];
      querySnapshot.forEach((doc) => {
        this.allDataUsers.push({ id: doc.id, ...doc.data() });
      });
    });
  }

  async getUser(userId: string) {
    const query = collection(this.firestore, 'users');
    const userDoc = doc(query, userId);
    const userSnap = await getDoc(userDoc);
    return userSnap.data();
  }

}