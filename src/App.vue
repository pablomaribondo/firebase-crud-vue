<template>
  <div id="app">
    <div>
      <label>Name:</label>
      <input type="text" v-model="name" />
      <button @click="submitName">Add</button>
    </div>

    <div>
      <ul>
        <li v-for="person in names" :key="person.id">
          <div v-if="!person.edit">
            <p>{{person.name}}</p>
            <button @click="removeName(person.id)">Remove</button>
            <button @click="setEditName(person.id)">Edit</button>
          </div>
          <div v-else>
            <input type="text" v-model="person.name" />
            <button @click="saveEdit(person)">Save</button>
            <button @click="cancelEdit(person.id)">Cancel</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { namesRef } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      name: null,
      names: []
    };
  },
  firestore: {
    names: namesRef
  },
  methods: {
    submitName() {
      namesRef.add({ name: this.name, edit: false });
      this.name = null;
    },
    removeName(key) {
      namesRef.doc(key).delete();
    },
    setEditName(key) {
      namesRef.doc(key).update({ edit: true });
    },
    cancelEdit(key) {
      namesRef.doc(key).update({ edit: false });
    },
    saveEdit(person) {
      namesRef.doc(person.id).set({ name: person.name, edit: false });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  background-color: transparent;
  border: 2px solid black;
}
</style>
