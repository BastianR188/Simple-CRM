import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.class';
import {
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  firestore: Firestore = inject(Firestore);
  allDataUsers: any[] = [];
  sortOrder: any[] = [];
  sortDirection: { [key: string]: string } = {};

  constructor() {}

  save(user: User) {
    return addDoc(collection(this.firestore, 'users'), user.toJSON());
  }

  async saveOder() {
    const data = this.sortDirection;
    await setDoc(
      doc(this.firestore, 'sorting', 'sortDirection'),
      this.sortDirection
    );

    let sortOrderObj: { [key: string]: number } = {};
    this.sortOrder.forEach((key, index) => {
      sortOrderObj[key] = index;
    });
    await setDoc(doc(this.firestore, 'sorting', 'sortOrder'), sortOrderObj);
  }

  async update(id: string, user: User) {
    await setDoc(doc(collection(this.firestore, 'users'), id), user.toJSON());
    const index = this.allDataUsers.findIndex((obj) => obj.id === id);
    if (index !== -1) this.allDataUsers[index] = user;
  }

  async delete(id: string) {
    await deleteDoc(doc(this.firestore, 'users', id));
  }

  load() {
    const query = collection(this.firestore, 'users');
    onSnapshot(query, (querySnapshot) => {
      this.allDataUsers = [];
      querySnapshot.forEach((doc) => {
        this.allDataUsers.push({ id: doc.id, ...doc.data() });
      });
    });

    const unsub = onSnapshot(
      doc(this.firestore, 'sorting', 'sortOrder'),
      (doc) => {
        let order = [];
        order.push(doc.data());
        if (order && order[0] && order[0]['sortOrder']) {
          this.sortOrder = order[0]['sortOrder'];
        }
      }
    );

    const unsubb = onSnapshot(
      doc(this.firestore, 'sorting', 'sortDirection'),
      (doc) => {
        this.sortDirection = {};
        this.sortDirection = doc.data()!;
      }
    );
  }

  async getUser(userId: string) {
    const query = collection(this.firestore, 'users');
    const userDoc = doc(query, userId);
    const userSnap = await getDoc(userDoc);
    return userSnap.data();
  }
}
