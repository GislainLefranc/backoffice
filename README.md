# Backoffice

## Présentation du projet

Ce projet est une inspiration d'idée pour le **back-office d'Odaptos**, une plateforme permettant la gestion des clients, des projets et des utilisateurs via une interface moderne et intuitive.

L'application frontend est construite avec **React**, **Vite**, **React Router**, **Tailwind CSS**, **Headless UI** et **Heroicons**, et communique avec une API backend via **Fetch API**.

Le backend (API Rest) est développé avec **Express**, **Prisma**, **PostgreSQL** et la base de donnée est hébergée sur **Supabase** et les fichiers sur **Cloudinary**.

## **Installation et démarrage**

### **1️ - Prérequis**

Assurez-vous d’avoir installé **Node.js (version 16 ou supérieure)** et **npm**.

- Installer **Node.js** : [Télécharger ici](https://nodejs.org/)

---

### **2️ - Cloner le projet**

```sh
git clone git@github.com:GislainLefranc/backoffice.git
cd backoffice
```

---

### **3 - Installation des dépendances**

Un script a été mis en place afin d'installer les dépendances du backend et du frontend en une seule commande :

```sh
npm run install:all
```

---

### **4 - Configuration des variables d'environnement**

#### Pour le frontend :

```sh
cp frontend/.env.example frontend/.env
```

Puis mettre dans le fichier .env :

```sh
VITE_API_URL=http://localhost:3000/api
```

#### Pour le backend :

```sh
cp backend/.env.example backend/.env
```

Pour des raisons de sécurité notamment pour les accès à Supabase et Cloudinary, toutes les valeurs vous seront fournies par mail.

---

### **5 - Lancer l'application**

```sh
npm run dev
```
