# 🌤️ Guide d'intégration des nuages "qui bugguent"

## 📋 Comment ajouter les nuages dans chaque composant

### 1. **Import du composant**
Ajoutez cet import en haut de chaque composant de section :
```tsx
import SectionCloud from "./AnimatedCloud";
```

### 2. **Intégration dans le JSX**
Ajoutez le composant `SectionCloud` juste après l'ouverture de votre conteneur principal (qui doit avoir `position: relative`) :

```tsx
<Section className="py-20 relative bg-votre-couleur">
  {/* Nuages qui "bugguent" dans cette section */}
  <SectionCloud cloudCount={2} />
  
  {/* Reste de votre contenu */}
  {/* ... */}
</Section>
```

### 3. **Options de configuration**

#### `cloudCount` (optionnel)
- **Par défaut** : 1 ou 2 nuages aléatoirement
- **Personnalisé** : Spécifiez le nombre exact
```tsx
<SectionCloud cloudCount={1} />  {/* 1 nuage */}
<SectionCloud cloudCount={3} />  {/* 3 nuages */}
<SectionCloud />                 {/* 1-2 nuages aléatoire */}
```

## 🎯 Composants à modifier

Voici la liste de vos composants principaux où ajouter les nuages :

### ✅ **Déjà fait :**
- [x] **Story** - 2 nuages ajoutés

### 📝 **À faire :**
- [ ] **Hero** - Recommandé : 1-2 nuages
- [ ] **Caracteristique** - Recommandé : 2 nuages  
- [ ] **Objectif** - Recommandé : 1-2 nuages
- [ ] **Quisuije** - Recommandé : 1 nuage
- [ ] **Footer** - Recommandé : 1 nuage

## 🔧 **Caractéristiques techniques**

### **Positionnement**
- Les nuages utilisent `position: absolute` avec des pourcentages
- Ils restent dans les limites de leur section parente
- Ils bougent avec le scroll (pas de position fixed)

### **Animations**
- **Glitch** : Disparition/réapparition toutes les 4-12 secondes
- **Flottement** : Mouvement continu subtil
- **Téléportation** : Nouvelle position aléatoire après chaque glitch

### **Performance**
- Nuages plus petits (60x45px)
- Z-index faible (10) pour ne pas masquer le contenu
- Pointer-events: none pour ne pas interférer avec les interactions

## 🎨 **Exemple complet**

```tsx
"use client";

import { Section } from "../components/Section";
import SectionCloud from "./AnimatedCloud";

const MonComposant = () => {
  return (
    <Section className="py-20 relative bg-ma-couleur">
      {/* Nuages qui "bugguent" dans cette section */}
      <SectionCloud cloudCount={2} />
      
      <div className="container mx-auto px-6">
        {/* Mon contenu */}
      </div>
    </Section>
  );
};

export default MonComposant;
```

## ⚠️ **Points importants**

1. **Position relative** : Le conteneur parent doit avoir `position: relative`
2. **Z-index** : Les nuages ont un z-index de 10, ajustez si nécessaire
3. **Performance** : Ne pas mettre trop de nuages (max 3 par section)
4. **Accessibilité** : Les nuages n'interfèrent pas avec la navigation

## 🚀 **Prochaines étapes**

1. Ajoutez `SectionCloud` dans chaque composant listé ci-dessus
2. Testez le scroll pour vérifier que les nuages bougent avec leur section
3. Ajustez le `cloudCount` selon vos préférences visuelles
4. Supprimez ce fichier une fois l'intégration terminée
