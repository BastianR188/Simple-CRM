import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.class';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Account } from '../models/account.class';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  firestore: Firestore = inject(Firestore);
  allDataUsers: any[] = [];
  sortOrder: any[] = ['firstName', 'email', 'phone', 'city'];
  sortDirection: string = 'asc';
  isLoggedIn = '';
  constructor() {}

  save(user: User) {
    return addDoc(collection(this.firestore, 'users'), user.toJSON());
  }

  saveAccount(acc: Account) {
    return addDoc(collection(this.firestore, 'accounts'), acc.toJSON());
  }

  async saveOrder() {
    await setDoc(doc(this.firestore, 'sorting', 'sortDirection'), {
      direction: this.sortDirection,
    });

    await setDoc(doc(this.firestore, 'sorting', 'sortOrder'), {
      order: this.sortOrder,
    });
  }

  async update(id: string, user: User) {
    await setDoc(doc(this.getQueryRef('users'), id), user.toJSON());
    const index = this.allDataUsers.findIndex((obj) => obj.id === id);
    if (index !== -1) this.allDataUsers[index] = user;
  }

  async delete(id: string) {
    await deleteDoc(doc(this.firestore, 'users', id));
  }

  load() {
    onSnapshot(this.getQueryRef('users'), (querySnapshot) => {
      this.allDataUsers = [];
      querySnapshot.forEach((doc) => {
        this.allDataUsers.push({ id: doc.id, ...doc.data() });
      });
    });
  }

  loadSortOrder() {
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
  }

  loadSortDirection() {
    const unsubb = onSnapshot(
      doc(this.firestore, 'sorting', 'sortDirection'),
      (doc) => {
        this.sortDirection = JSON.stringify(doc.data());
      }
    );
  }

  getQueryRef(ref: string) {
    return collection(this.firestore, ref);
  }

  async getUser(userId: string) {
    const userDoc = doc(this.getQueryRef('users'), userId);
    const userSnap = await getDoc(userDoc);
    return userSnap.data();
  }

  checkUserExist = async (email: string, pw: string) => {
    const q = query(this.getQueryRef('accounts'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.find((doc) => doc.data()['pw'] === pw);
    let data = new Account(user?.data());
    if (user) {
      return data.name;
    } else {
      return null;
    }
  };
}
