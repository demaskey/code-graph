<script setup lang="ts">
import { ref } from 'vue'
import fs from 'fs'
import Parser from 'tree-sitter'
import Java from 'tree-sitter-java'

const doc = ref()
const file = ref()
const tree = ref()

function parseFile() {
  file.value = doc.value.files[0]

  const fileContent = fs.readFileSync(file.value, 'utf8')

  const parser = new Parser()
  parser.setLanguage(Java)

  const tree = parser.parse(fileContent, undefined, { bufferSize: 1024 * 1024 })
}
</script>

<template>
  <main>
    <input type="file" ref="doc" @change="parseFile" />
    <h1>Tree</h1>
    <div>{{ tree }}</div>
  </main>
</template>
