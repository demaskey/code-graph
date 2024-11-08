import { ref } from 'vue'
import { defineStore } from 'pinia'

export const parseFile = defineStore('parser', () => {
    const file = ref(0)
    function parse() {

    }

    return { file, parse }
})