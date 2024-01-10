import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from "@angular/material/core";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideAnimations(), importProvidersFrom(MatNativeDateModule), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-8ccf6","appId":"1:1049539797599:web:b95365ab1223430603b1ea","storageBucket":"simple-crm-8ccf6.appspot.com","apiKey":"AIzaSyC25TRWO83FaQnT7SkL2y6fJWd52lkZ-lU","authDomain":"simple-crm-8ccf6.firebaseapp.com","messagingSenderId":"1049539797599"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase()))]
};
